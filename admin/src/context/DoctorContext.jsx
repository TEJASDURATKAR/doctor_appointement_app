import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create context
export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKENDURL;

  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState([]);
  const [dashData,setDashData]= useState(false);
  const [profileData,setProfileData]= useState(false);

  // ✅ Fetch appointments for the logged-in doctor
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, {
        headers: {
          Authorization: `Bearer ${dToken}`,
        },
      });

      if (data.success && Array.isArray(data.data)) {
        setAppointments(data.data.reverse());
        console.log("✅ Appointments fetched:", data.data);
      } else {
        setAppointments([]);
        console.warn("⚠️ Invalid data structure or no appointments:", data);
      }
    } catch (error) {
      console.error("❌ Error fetching appointments:", error);
      toast.error(error.response?.data?.message || "Failed to fetch appointments.");
    }
  };
const completeAppointment = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/doctor/complete`,  // ✅ matches router
      { appointmentId },
      {
        headers: {
          Authorization: `Bearer ${dToken}`,
        },
      }
    );

    if (data.success) {
      toast.success(data.message || "Appointment marked as completed.");
      getAppointments(); // Refresh
    } else {
      toast.error(data.message || "Failed to complete appointment.");
    }
  } catch (error) {
    console.error("❌ Error completing appointment:", error);
    toast.error(error.response?.data?.message || "Something went wrong.");
  }
};

  // ✅ Cancel an appointment
  const cancelAppointment = async (appointmentId, docId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/cancel`, // Keep as-is unless route is changed to `cancel`
        { appointmentId, docId },
        {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message || "Appointment cancelled.");
        getAppointments(); // Refresh
      } else {
        toast.error(data.message || "Failed to cancel appointment.");
      }
    } catch (error) {
      console.error("❌ Error cancelling appointment:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const getDashboardData = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
      headers: {
        Authorization: `Bearer ${dToken}`,
      },
    });

    if (data.success) {
      console.log("dashData:",data.dashData)
      setDashData(data.dashData); // ✅ Save the dashboard data
    } else {
      toast.error(data.message || "Mark Failed");
    }
  } catch (error) {
    console.error("❌ Error :", error);
    toast.error(error.response?.data?.message || "Mark Failed");
  }
};

const getProfileData = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/doctor/doctor-profile`, {
      headers: {
        Authorization: `Bearer ${dToken}`,
      },
    });

    if (data.success) {
      setProfileData(data.profileData);
      console.log("✅ Profile Data:", data.profileData);
    }

  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    toast.error(error.response?.data?.message || "Failed to fetch profile data.");
  }
};


  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,setDashData,
    getDashboardData,
    profileData,setProfileData,
    getProfileData
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
