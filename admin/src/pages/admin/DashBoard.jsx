import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import {assets} from '../../assets/assets'
import { AppContext } from '../../context/AppContext';

const DashBoard = () => {
  const { aToken, dashData, getDashData } = useContext(AdminContext);

  const {slotDateFormate} = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
      console.log("getDashData",getDashData)
    }
  }, [aToken]);

  return (
   <div className="m-5">
  <div className="flex flex-wrap gap-6">
    {/* Doctors Card */}
    <div className="flex items-center gap-4 bg-white shadow-md p-4 rounded-lg w-64">
      <img src={assets.doctor_icon} alt="Doctor Icon" className="w-12 h-12" />
      <div>
        <p className="text-xl font-bold">{dashData?.doctors || 0}</p>
        <p className="text-gray-500">Doctors</p>
      </div>
    </div>

    {/* Appointments Card */}
    <div className="flex items-center gap-4 bg-white shadow-md p-4 rounded-lg w-64">
      <img src={assets.appointments_icon} alt="Appointments Icon" className="w-12 h-12" />
      <div>
        <p className="text-xl font-bold">{dashData?.appointments || 0}</p>
        <p className="text-gray-500">Appointments</p>
      </div>
    </div>

    {/* Patients Card */}
    <div className="flex items-center gap-4 bg-white shadow-md p-4 rounded-lg w-64">
      <img src={assets.patients_icon} alt="Patients Icon" className="w-12 h-12" />
      <div>
        <p className="text-xl font-bold">{dashData?.patients || 0}</p>
        <p className="text-gray-500">Patients</p>
      </div>
    </div>
  </div>
  <div className="bg-white rounded shadow-md mt-10">
  {/* Header */}
  <div className="flex items-center gap-2.5 px-4 py-4 border-b">
    <img src={assets.list_icon} alt="list icon" className="w-5 h-5" />
    <p className="font-semibold text-lg">Latest Bookings</p>
  </div>

  {/* Appointments List */}
<div className="p-4 space-y-4">
  {dashData?.latestAppointments?.length > 0 ? (
    dashData.latestAppointments.map((item, index) => (
      <div
        key={index}
        className="flex items-center justify-between gap-4 border p-3 rounded shadow-sm"
      >
        {/* Left: Image + Info */}
        <div className="flex items-center gap-4">
          <img
            src={item.docData?.image || assets.doctor_icon}
            alt="Doctor"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{item.docData?.name || "Dr. Unknown"}</p>
            <p className="text-sm text-gray-500">{slotDateFormate(item.slotData).toLocaleString()}</p>
          </div>
        </div>

        {/* Right: Cancel Status/Action */}
        <div>
          {item.cancelled ? (
            <span className="text-red-600 font-bold">Cancelled</span>
          ) : (
            <img
              src={assets.cancel_icon}
              alt="Cancel"
              onClick={() => handleCancelAppointment(item._id)}
              className="w-8 h-8 cursor-pointer"
              title="Cancel Appointment"
            />
          )}
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500">No recent bookings</p>
  )}
</div>

</div>

</div>
  )
};

export default DashBoard;
