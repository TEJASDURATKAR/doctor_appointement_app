import React from "react";
import contact_image from "../assets/assets_frontend/contact_image.png";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const Contacts = () => {
  return (
    <div className="py-10 px-6">
      {/* Title */}
      <div className="text-center mb-8">
        <p className="text-3xl font-bold text-gray-800">
          Contact <span className="text-blue-600">US</span>
        </p>
        <p className="text-gray-600 mt-2">
          We'd love to hear from you! Reach out anytime.
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Contact Image */}
        <img
          src={contact_image}
          alt="Contact Us"
          className="w-full max-w-sm rounded-3xl border border-gray-300 shadow-lg"
        />

        {/* Contact Information */}
        <div className="border-2 border-gray-300 rounded-lg p-6 shadow-md max-w-md w-full">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            OUR OFFICE
          </h2>

          <div className="flex items-center gap-3 mb-3">
            <FaMapMarkerAlt className="text-blue-600" />
            <p className="text-gray-700">123 Street Name, City, Country</p>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <FaPhoneAlt className="text-blue-600" />
            <p className="text-gray-700">+123 456 7890</p>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <FaEnvelope className="text-blue-600" />
            <p className="text-gray-700">contact@example.com</p>
          </div>

          <div className="flex items-center gap-3">
            <FaGlobe className="text-blue-600" />
            <p className="text-gray-700">www.example.com</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2  bg-violet-600 text-white px-4 py-2 mt-5 rounded-md hover:bg-violet-800 transition duration-300">
              <CiSearch className="text-lg" /> Explore More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
