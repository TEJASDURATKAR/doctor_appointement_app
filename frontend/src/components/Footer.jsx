import React from 'react';
import { FaHome, FaInfoCircle, FaPhoneAlt, FaUser } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-white text-gray-700 py-10 px-6 md:px-16 lg:px-24">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* 1️⃣ Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            {/* Logo */}
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.UaylOLPMn1PSNOnOEU_VdgHaHa&pid=Api&P=0&h=220"
              alt="Logo"
              className="h-14 w-14 rounded-full mb-3"
            />
            {/* Brand Info */}
            <h2 className="text-2xl font-bold text-blue-800 mb-1">
              Priscripto
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Priscripto is your trusted platform for booking medical consultations with experienced doctors. 
              We provide reliable and fast services to ensure your health is always a priority.
            </p>
          </div>

          {/* 2️⃣ Links Section */}
          <div className="md:ml-40">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Company</h3>
            <ul className="space-y-2">
              {['Home', 'About Us', 'Contact Us', 'Privacy Policy'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-blue-600 transition duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3️⃣ Contact Section */}
          <div className="md:ml-20">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Get in Touch</h3>
            <p className="text-gray-600 text-sm">📞 +91 123 456 7890</p>
            <p className="text-gray-600 text-sm">✉️ priscripto@gmail.com</p>
            <p className="text-gray-600 text-sm">📍 Nagpur, Maharashtra, India</p>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-300 mt-6 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Priscripto. All Rights Reserved.
        </div>
      </footer>

      {/* 📱 Mobile Navigation Bar (Fixed at Bottom) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md md:hidden flex justify-around py-3">
        <a href="#" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <FaHome className="text-xl" />
          <span className="text-xs">Home</span>
        </a>
        <a href="#" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <FaInfoCircle className="text-xl" />
          <span className="text-xs">About</span>
        </a>
        <a href="#" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <FaPhoneAlt className="text-xl" />
          <span className="text-xs">Contact</span>
        </a>
        <a href="#" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <FaUser className="text-xl" />
          <span className="text-xs">Profile</span>
        </a>
      </div>
    </>
  );
};

export default Footer;
