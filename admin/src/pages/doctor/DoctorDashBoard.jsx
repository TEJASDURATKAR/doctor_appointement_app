import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';


const DoctorDashBoard = () => {
  const {
    dToken,
    dashData,
    getDashboardData,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);

  const {slotDateFormate} = useContext(AppContext)

  useEffect(() => {
    if (dToken) getDashboardData();
  }, [dToken]);

  return dashData && (
    <div className="m-4 sm:m-5">
      {/* Summary Cards */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
        {/* Earning Card */}
        <div className="flex items-center gap-4 bg-white shadow-md p-4 rounded-lg w-full sm:w-64">
          <img src={assets.earning_icon} alt="Earning Icon" className="w-10 h-10 sm:w-12 sm:h-12" />
          <div>
            <p className="text-lg sm:text-xl font-bold">₹{dashData?.earning || 0}</p>
            <p className="text-gray-500 text-sm">Earning</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="flex items-center gap-4 bg-white shadow-md p-4 rounded-lg w-full sm:w-64">
          <img src={assets.appointments_icon} alt="Appointments Icon" className="w-10 h-10 sm:w-12 sm:h-12" />
          <div>
            <p className="text-lg sm:text-xl font-bold">{dashData?.appointments || 0}</p>
            <p className="text-gray-500 text-sm">Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className="flex items-center gap-4 bg-white shadow-md p-4 rounded-lg w-full sm:w-64">
          <img src={assets.patients_icon} alt="Patients Icon" className="w-10 h-10 sm:w-12 sm:h-12" />
          <div>
            <p className="text-lg sm:text-xl font-bold">{dashData?.patients || 0}</p>
            <p className="text-gray-500 text-sm">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white rounded shadow-md mt-8">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b">
          <img src={assets.list_icon} alt="list icon" className="w-5 h-5" />
          <p className="font-semibold text-base sm:text-lg">Latest Bookings</p>
        </div>

        <div className="p-4 space-y-4">
          {dashData?.latestAppointments?.length > 0 ? (
            dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border p-3 rounded shadow-sm"
              >
                {/* Left: Image + Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.userData?.image || assets.doctor_icon}
                    alt="Patient"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm sm:text-base">{item.userData?.name || "Unknown"}</p>
                    <p className="text-xs text-gray-500">{slotDateFormate(item.slotData).toLocaleString()}</p>
                  </div>
                </div>

                {/* Right: Status or Cancel */}
                <div>
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
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm">No recent bookings</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashBoard;
