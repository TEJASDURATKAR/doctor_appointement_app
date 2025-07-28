import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { format } from "date-fns";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const AllAppointments = () => {
  const { backendUrl, aToken } = useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    if (!backendUrl || !aToken) return;
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/admin/appointments`, {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      });
      setAppointments(res.data?.appointments || []);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

const handleCancelAppointment = async (appointmentId) => {
  try {
    const response = await axios.put(
      `${backendUrl}/api/admin/appointment/cancel/${appointmentId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${aToken}`,
        },
      }
    );

    if (
      response.status === 200 &&
      response.data?.message === "Appointment cancelled"
    ) {
      toast.success("Appointment cancelled successfully");
      fetchAppointments(); // ✅ Correct function
      return;
    }

    toast.error("Failed to cancel appointment");
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    toast.error("Failed to cancel appointment");
  }
};



  useEffect(() => {
    fetchAppointments();
  }, [backendUrl, aToken]);

  if (loading) return <p style={{ padding: "1rem" }}>Loading appointments...</p>;
  if (error) return <p style={{ padding: "1rem", color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "1rem", fontSize: "24px" }}>All Appointments</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "50px 1fr 60px 180px 1fr 80px 140px",
          fontWeight: "bold",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          padding: "12px 16px",
          marginBottom: "12px",
          textAlign: "center",
        }}
      >
        <p>#</p>
        <p>Patient</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Doctor</p>
        <p>Fees</p>
        <p>Action</p>
      </div>

      {appointments.map((item, index) => {
        const patient = item?.userData;
        const doctor = item?.docData;
        const age = patient?.dob ? calculateAge(patient.dob) : "--";
        

        const slotDate = item?.slotData || item?.slotTime;
        let formattedDate = "--";
        try {
          if (slotDate) {
            formattedDate = format(new Date(slotDate), "dd/MM/yyyy hh:mm a");
            
          }
        } catch {
          formattedDate = "--";
        }

        return (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "50px 1fr 60px 180px 1fr 80px 140px",
              alignItems: "center",
              padding: "10px 16px",
              borderBottom: "1px solid #eee",
              textAlign: "center",
              backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
              borderRadius: "4px",
            }}
          >
            <p>{index + 1}</p>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
              <img
                src={patient?.image || "/default-user.jpg"}
                alt={patient?.name || "Patient"}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid #ccc",
                }}
              />
              <span>{patient?.name || "--"}</span>
            </div>

            <p>{age}</p>
            <p>{formattedDate}</p>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
              <img
                src={doctor?.image || "/default-doc.jpg"}
                alt={doctor?.name || "Doctor"}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid #ccc",
                }}
              />
              <span>{doctor?.name || "--"}</span>
            </div>

            <p>₹{doctor?.fees || item.amount || "--"}</p>

            <div style={{ display: "flex", justifyContent: "center" }}>
              {item.cancelled ? (
                <span style={{ color: "red", fontWeight: "bold" }}>Cancelled</span>
              ) : (
                <img
                  src={assets.cancel_icon}
                  alt="Cancel"
                  onClick={() => handleCancelAppointment(item._id)}
                  style={{ width: "64px", height: "64px", cursor: "pointer" }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllAppointments;
