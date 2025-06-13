import React from 'react';
import { Link } from 'react-router-dom';
import { specialityData } from '../assets/assets_frontend/assets';

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="px-6 py-10">
      {/* Title */}
      <h1 className="text-3xl text-center font-bold text-blue-800 mb-4">
        Find by Speciality
      </h1>

      {/* Description */}
      <p className="text-gray-600 text-center text-base leading-relaxed mb-6">
        Get professional consultations with experienced doctors anytime, anywhere. <br /> 
        We guarantee quality healthcare and personalized attention for you and your family.
      </p>

     {/* Speciality Row */}
<div className="flex justify-center gap-x-6 overflow-x-auto">
  {specialityData.map((item, index) => (
    <Link 
      onClick={() => scrollTo(0, 0)}
      key={index} 
      to={`/doctors/${item.speciality}`}
      className="flex flex-col mt-5 items-center cursor-pointer flex-shrink-0 hover:translate-y-[10px] transition-all duration-500 min-w-[150px]"
    >
      {/* Image */}
      <img 
        src={item.image} 
        alt={item.speciality}
        className="w-40 h-40 object-cover transition duration-300 rounded-full shadow-md"
      />
      {/* Text */}
      <p className="text-lg font-medium text-gray-700 py-3">
        {item.speciality}
      </p>
    </Link>
  ))}
</div>

    </div>
  );
};

export default SpecialityMenu;
