import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const backendUrl = "http://localhost:8080";

  const loadUserProfileData = async () => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      console.warn("⛔ No token found. Skipping profile fetch.");
      return;
    }

    try {
      console.log("🔐 Using token:", storedToken);
      const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (data.success) {
        let parsedAddress = { line1: "", line2: "" };
        try {
          parsedAddress = data.user.address
            ? JSON.parse(data.user.address)
            : parsedAddress;
        } catch (err) {
          console.warn("⚠️ Failed to parse address:", err);
        }

        setUserData({ ...data.user, address: parsedAddress });
      } else {
        console.warn("⚠️ API responded with success: false");
        setUserData(null);
      }
    } catch (error) {
      console.error("❌ Failed to load profile data:", error);

      // OPTIONAL: fallback mock user for development only
      // setUserData({
      //   name: "Tejas Duratkar",
      //   email: "tejas@example.com",
      //   phone: "+91-9876543210",
      //   image: "https://randomuser.me/api/portraits/men/75.jpg",
      //   gender: "Male",
      //   dob: "2000-08-15",
      //   address: { line1: "Lane 5", line2: "Shivaji Nagar" },
      // });

      setUserData(null);
    }
  };

  useEffect(() => {
    if (token) loadUserProfileData();
  }, [token]);

  const updateToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        token,
        setToken: updateToken,
        loadUserProfileData,
        backendUrl,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
