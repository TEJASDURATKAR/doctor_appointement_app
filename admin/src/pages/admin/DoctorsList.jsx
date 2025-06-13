import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

const DoctorsList = () => {
  const { getAllDoctors, doctors, aToken, changeAvailability } = useContext(AdminContext); // ✅ fixed spelling

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Doctors</h1>

      {doctors.length === 0 ? (
        <p className="text-gray-500">No doctors found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-transform duration-300 hover:scale-105"
            >
              <div className="bg-gray-300">
                <img
                  src={doctor.image || "https://via.placeholder.com/300x200?text=Doctor"}
                  alt={doctor.fullName || "Doctor"}
                  className="w-full max-h-40 object-contain mx-auto bg-white"
                />
              </div>

              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {doctor.fullName}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Email:</span> {doctor.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Specialization:</span>{" "}
                  {doctor.speciality || "N/A"}
                </p>

                {/* Availability Checkbox */}
                <div className="mt-3 flex justify-center items-center gap-2">
                  <label className="text-sm text-gray-600 font-medium">Available:</label>
                  <input
                    type="checkbox"
                    checked={doctor.available}
                    onChange={() => changeAvailability(doctor._id, !doctor.available)}
                    className="w-4 h-4"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
