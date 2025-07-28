import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const DoctorAppointment = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <p className="text-xl font-semibold mb-4">Doctor Appointments</p>

      {/* Desktop Table Headers */}
      <div className="hidden md:grid grid-cols-7 font-bold border-b py-2">
        <p>#</p>
        <p>Patient</p>
        <p>Payment</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Fees</p>
        <p>Action</p>
      </div>

      {appointments?.length > 0 ? (
        appointments.map((item, index) => (
          <div
            key={item._id}
            className="border-b py-3 grid md:grid-cols-7 gap-2 items-center text-sm md:text-base"
          >
            <p className="hidden md:block">{index + 1}</p>

            <div className="hidden md:flex items-center gap-2">
              <img
                src={item.userData?.image}
                alt={item.userData?.name}
                className="w-10 h-10  rounded-full object-cover"
              />
              <p>{item.userData?.name || "N/A"}</p>
            </div>

            <p className="hidden md:block text-green-600">
              {item.payment ? "Cash" : "Online"}
            </p>
            <p className="hidden md:block">
              {calculateAge(item.userData?.dob) || "N/A"}
            </p>
            <p className="hidden md:block">
              {new Date(item.slotData).toLocaleDateString()} <br />
              <span className="text-sm text-gray-500">{item.slotTime}</span>
            </p>
            <p className="hidden md:block">₹{item.docData?.fees || 0}</p>
            {item.cancelled ? (
              <p className="text-red-500 font-semibold">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-600 font-semibold">Completed</p>
            ) : (
              <div className="flex gap-2 items-center">
                <img
                  src={assets.cancel_icon}
                  alt="Cancel"
                  className="w-10 h-10 cursor-pointer"
                  onClick={() => cancelAppointment(item._id, item.docId)}
                />
                <img
                  src={assets.tick_icon}
                  alt="Complete"
                  className="w-10 h-10 cursor-pointer"
                  onClick={() => completeAppointment(item._id)}
                />
              </div>
            )}

            {/* Mobile View */}
            <div className="block md:hidden col-span-7">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={item.userData?.image}
                  alt={item.userData?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">#{index + 1}</p>
                  <p className="font-medium">{item.userData?.name || "N/A"}</p>
                </div>
              </div>
              <p>
                <span className="font-medium">Payment:</span>{" "}
                <span className="text-green-600">
                  {item.payment ? "Cash" : "Online"}
                </span>
              </p>
              <p>
                <span className="font-medium">Age:</span>{" "}
                {calculateAge(item.userData?.dob) || "N/A"}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(item.slotData).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Time:</span> {item.slotTime}
              </p>
              <p>
                <span className="font-medium">Fees:</span> ₹
                {item.docData?.fees || 0}
              </p>
              <div className="mt-2">
                {item.cancelled ? (
                  <p className="text-red-500 font-semibold">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-600 font-semibold">Completed</p>
                ) : (
                  <div className="flex gap-3">
                    <img
                      src={assets.cancel_icon}
                      alt="Cancel"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => cancelAppointment(item._id, item.docId)}
                    />
                    <img
                      src={assets.tick_icon}
                      alt="Complete"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => completeAppointment(item._id)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="mt-5 text-gray-500">No appointments found.</p>
      )}
    </div>
  );
};

export default DoctorAppointment;
