import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row mb-10 items-center px-6 md:px-10 lg:px-20 py-10  bg-violet-600 rounded-2xl shadow-lg overflow-hidden">
      {/* Left Side */}
      <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
        <div>
          <p className="text-5xl font-extrabold mb-5 text-white ">
            Book Appointment
          </p>
          <p className="text-xl font-extrabold  text-white">
            With 100+ Trusted Doctors
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="bg-white text-blue mt-5 font-semibold px-8 py-3 rounded-3xl shadow-mdtransition duration-300 flex items-center gap-2"
          >
            Create Account
            <IoArrowForward className="text-blue text-xl" />
          </a>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative">
        <img
          src={assets.appointment_img}
          alt="Appointment"
          className="w-100  "
        />
      </div>
    </div>
  );
};

export default Banner;
