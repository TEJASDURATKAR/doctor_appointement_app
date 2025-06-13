import React, { useContext } from 'react';
import { AppContext } from '../context/Context';

const MyAppointment = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="max-w-6xl mx-auto mt-5 p-4 bg-white shadow-lg border-2 border-gray-300 rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-4 border-b-2 pb-2">
        My Appointments
      </h1>

      <div className="space-y-4">
        {doctors.slice(0, 5).map((item, index) => (
          <div key={index} className="border-gray-300 rounded-lg p-4 shadow-md">
            
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 border-1 pb-3 mb-3">
              {/* Doctor's Image */}
              <div className="w-24 h-24 md:w-28 md:h-28 border-1 border-gray-300 p-1 rounded-lg mx-auto md:mx-0">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full rounded-lg bg-purple-600 object-cover" 
                />
              </div>

              {/* Doctor's Info */}
              <div className="flex-1 text-center md:text-left border-r-0 md:border-r-2 pr-0 md:pr-4">
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-600">{item.speciality}</p>
                <p className="text-gray-600 font-medium">Address:</p>
                <p className="text-gray-500">{`${item.address.line1}, ${item.address.line2}`}</p>
                <p className="text-gray-700 font-semibold mt-1">
                  <span className="text-blue-500">Date & Time:</span> 20 March 2025 | 9:30 AM
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col space-y-2 w-full md:w-auto">
                <button className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white w-full md:w-auto">
                  Pay Online
                </button>
                <button className="border-2 border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white w-full md:w-auto">
                  Cancel Appointment
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
