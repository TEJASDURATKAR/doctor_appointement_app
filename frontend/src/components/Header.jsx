import React from 'react';
import { IoArrowForward } from "react-icons/io5"; // For right arrow icon
import header_img from '../assets/assets_frontend/header_img.png';
import group_profiles from '../assets/assets_frontend/group_profiles.png';

const Header = () => {
  return (
    <div className="flex mt-10 flex-col md:flex-row items-center px-6 pt-15 pb-20 md:px-10 lg:px-20 bg-violet-600 shadow-lg overflow-hidden h-full">
      {/* Left Side */}
      <div className="md:w-1/2 text-center md:text-left">
        <p className="text-4xl font-extrabold text-white mt-5 mb-6 leading-tight">
          Book Appointment <br />
          With Trusted Doctor
        </p>

        {/* Doctor Images */}
        <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
          <img
            src={group_profiles}
            alt="Doctor"
            className="w-34  hover:scale-110 transition duration-300"
          />
        </div>

        {/* Description */}
        <p className="text-white text-base leading-relaxed mb-6">
          Get professional consultations with experienced doctors anytime, anywhere.  
          We guarantee quality healthcare and personalized attention for you and your family.
        </p>

        {/* Book Appointment Button */}
        <div className="flex items-center gap-3">
          <a
            href="#speciality"
            
            className="bg-white text-blue font-semibold px-8 py-3 rounded-3xl shadow-mdtransition duration-300 flex items-center gap-2"
          >
            Book Appointment
            <IoArrowForward className="text-blue text-xl" />
          </a>
        </div>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 mt-6 md:mt-2 flex py-5 justify-center self-end">
        <img
          src={header_img}
          alt="Doctor Consultation"
          className="w-85 object-contain object-bottom transition duration-300"
        />
      </div>
    </div>
  );
};

export default Header;
