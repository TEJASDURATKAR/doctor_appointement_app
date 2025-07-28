import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { handleRazorpayPayment } from "../utils/paymentHandler"; // ✅ Imported from utils

const MyAppointment = () => {
  const { backendUrl, token, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const getUsersAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        const sortedAppointments = [...data.appointments].sort(
          (a, b) => new Date(b.slotData) - new Date(a.slotData)
        );
        setAppointments(sortedAppointments);
      } else {
        toast.error("Failed to fetch appointments.");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
      toast.error("Something went wrong while loading appointments.");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const userId = userData?._id || localStorage.getItem("userId");

      const { data } = await axios.delete(
        `${backendUrl}/api/user/appointment/cancel`,
        {
          data: { appointmentId, userId },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        toast.success("Appointment cancelled successfully");
        getUsersAppointments();
      } else {
        toast.error(data.message || "Failed to cancel appointment");
      }
    } catch (error) {
      console.error("Error cancelling the appointment:", error.message);
      toast.error("Something went wrong while cancelling the appointment.");
    }
  };

  useEffect(() => {
    if (token) {
      getUsersAppointments();
    }
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto mt-5 p-4 bg-white shadow-lg border-2 border-gray-300 rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-4 border-b-2 pb-2">
        My Appointments
      </h1>

      <div className="space-y-4">
        {appointments.length === 0 ? (
          <p className="text-center text-gray-500">No appointments found.</p>
        ) : (
          appointments.map((appointment, index) => {
            const doc = appointment.docData;
            const appointmentDate = new Date(
              appointment.slotData
            ).toLocaleDateString();

            return (
              <div
                key={index}
                className="border-gray-300 rounded-lg p-4 shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="w-24 h-24 md:w-28 md:h-28 border border-gray-300 p-1 bg-violet-600 rounded-lg">
                    <img
                      src={doc?.image || "/placeholder.png"}
                      alt={doc?.name}
                      className="w-full h-full  rounded-lg object-cover"
                    />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <p className="text-lg font-semibold">{doc?.name}</p>
                    <p className="text-gray-600">{doc?.speciality}</p>
                    <p className="text-gray-700 font-medium mt-2">
                      <span className="text-blue-500">Date & Time:</span>{" "}
                      {appointmentDate} | {appointment.slotTime}
                    </p>
                    <p className="text-gray-700 mt-1">
                      <span className="font-semibold">Fees:</span> ₹
                      {doc?.fees}
                    </p>
                    {appointment.cancelled && (
                      <p className="text-red-500 font-semibold mt-2">
                        Cancelled
                      </p>
                    )}
                    {appointment.isCompleted && (
                      <p className="text-green-600 font-semibold mt-2">
                        Completed
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2 w-full md:w-auto">
  {/* ✅ Show only "Completed" if paid, completed, and not cancelled */}
  {appointment.payment && appointment.isCompleted && !appointment.cancelled ? (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-default"
      disabled
    >
      Completed
    </button>
  ) : (
    <>
      {/* 💳 Pay Online button */}
      <button
        onClick={() =>
          handleRazorpayPayment({
            amount: doc?.fees * 100,
            token,
            backendUrl,
            appointmentId: appointment._id,
            onSuccess: getUsersAppointments,
          })
        }
        className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white disabled:opacity-50"
        disabled={appointment.cancelled || appointment.payment}
      >
        {appointment.payment ? "Paid" : "Pay Online"}
      </button>

      {/* ❌ Cancel Appointment button */}
      <button
        onClick={() => cancelAppointment(appointment._id)}
        className="border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white disabled:opacity-50"
        disabled={appointment.cancelled || appointment.isCompleted}
      >
        {appointment.cancelled ? "Cancelled" : "Cancel Appointment"}
      </button>
    </>
  )}
</div>

                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyAppointment;
