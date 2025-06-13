import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/Context";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="px-6 py-10 bottom-0">
      {/* Title */}
      <h1 className="text-3xl text-center font-bold text-blue-800 mb-4">
        Top Doctors to Book
      </h1>

      {/* Description */}
      <p className="text-gray-600 text-center text-base leading-relaxed mb-6">
        Get professional consultations with experienced doctors anytime,
        anywhere.
      </p>

      {/* Doctors Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {doctors.slice(0, 10).map((item, index) => (
          <div
          onClick={() =>{ navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
            key={index}
            className="bg-white shadow-xl rounded-lg p-4 border hover:scale-105 transition duration-300"
          >
            {/* Doctor Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover  mx-auto mb-3"
            />

            {/* Availability */}
            <div className="flex justify-center items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <p className="text-sm text-gray-500">Available</p>
            </div>

            {/* Doctor Name & Speciality */}
            <p className="text-center text-lg font-medium mt-2">{item.name}</p>
            <p className="text-center text-gray-500 text-sm">
              {item.speciality}
            </p>
          </div>
        ))}
      </div>

      {/* More Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate("/doctors", scrollTo(0, 0))}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-3xl hover:bg-blue-700 transition duration-300"
        >
          More
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;
