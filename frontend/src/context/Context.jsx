import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  const [userData, setUserData] = useState(null); // Start with null

  const getDoctorsData = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      if (data.success && Array.isArray(data.data)) {
        setDoctors(data.data);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

 const loadUserProfileData = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      const user = data.user;

      // Parse the address string safely
      let parsedAddress = { line1: "", line2: "" };
      try {
        parsedAddress = user.address ? JSON.parse(user.address) : parsedAddress;
      } catch (parseError) {
        console.warn("Failed to parse address JSON:", parseError);
      }

      console.log(parsedAddress.line1, parsedAddress.line2);

      setUserData({
        ...user,
        address: parsedAddress,
      });
    } else {
      setUserData(null);
    }
  } catch (error) {
    console.error("Error loading user profile data:", error);
    setUserData(null);
  }
};


  useEffect(() => {
    if (token) {
      getDoctorsData();
      loadUserProfileData();
    } else {
      setUserData(null);
    }
  }, [token]);

  // Updated setter for token to keep in sync with localStorage
  const updateToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setToken(newToken);
  };

  const value = {
    doctors,
    getDoctorsData,
    token,
    setToken: updateToken,
    backendUrl,
    userData,
    setUserData,          // ✅ Provide setter to update userData
    loadUserProfileData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
