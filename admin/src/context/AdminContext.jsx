import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken")?localStorage.getItem('aToken'):'');
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  const [dashData,setDashData]= useState(false);

  // Fetch all doctors
  const getAllDoctors = async () => {
    if (!aToken) {
      toast.warn("Token missing. Please login again.");
      return;
    }

    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-doctors`, {
        headers: { Authorization: `Bearer ${aToken}` },
      });

      if (Array.isArray(data)) {
        setDoctors(data);
        toast.success("Doctors loaded successfully");
      } else {
        toast.error("Unexpected response format");
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Failed to fetch doctors";
      toast.error(errMsg);
    }
  };

  // Update doctor availability
  const changeAvailability = async (doctorId, available) => {
    if (!aToken) {
      toast.warn("Token missing. Please login again.");
      return;
    }

    try {
      const { data } = await axios.put(
        `${backendUrl}/api/admin/change-availability`,
        { doctorId, available },
        {
          headers: { Authorization: `Bearer ${aToken}` },
        }
      );

      if (data.success) {
        toast.success("Doctor availability updated");
        getAllDoctors(); // Refresh list
      } else {
        toast.error(data.message || "Failed to update availability");
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Update failed";
      toast.error(errMsg);
    }
  };

const getAllAppointments = async () => {
  if (!aToken) {
    toast.warn("Token missing. Please login again.");
    return [];
  }

  try {
    const res = await axios.get(`${backendUrl}/api/admin/appointments`, {
      headers: { Authorization: `Bearer ${aToken}` },
    });

    return res.data?.appointments || [];
  } catch (error) {
    console.error("Error fetching appointments:", error);
    const errMsg = error.response?.data?.message || error.message || "Failed to fetch appointments";
    toast.error(errMsg);
    return [];
  }
};

const getDashData = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${aToken}`,
      },
    });

    if (data.success) {
      console.log("getDashData",data.dashData)
      setDashData(data.dashData);
    } else {
      toast.error(data.message || "Failed to load dashboard data");
    }
  } catch (error) {
    console.error("Dashboard Fetch Error:", error);
    toast.error(error.response?.data?.message || error.message);
  }
};

  // Sync token with localStorage
  useEffect(() => {
    if (aToken) {
      localStorage.setItem("aToken", aToken);
    } else {
      localStorage.removeItem("aToken");
    }
  }, [aToken]);

  const value = {
    aToken,
    setAToken,
    backendUrl,
    getAllDoctors,
    doctors,
    changeAvailability, // ✅ Fixed spelling
    getAllAppointments, 
    dashData,
    getDashData
  };

  return <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>;
};

export default AdminContextProvider;
