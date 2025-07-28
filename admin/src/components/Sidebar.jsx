import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext"; // ✅ Import doctor context
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext); // ✅ Get doctor token

  const AdminNavItems = [
    { to: "/dashboard", icon: assets.home_icon, label: "Dashboard" },
    { to: "/all-appointements", icon: assets.appointment_icon, label: "Appointments" },
    { to: "/add-doctor", icon: assets.add_icon, label: "Add Doctor" },
    { to: "/doctor-list", icon: assets.people_icon, label: "Doctor List" },
  ];

  const DoctorNavItems = [
    { to: "/doctor-dashboard", icon: assets.home_icon, label: "Doctor Dashboard" },
    { to: "/doctor-appointments", icon: assets.appointment_icon, label: "Doctor Appointments" },
    { to: "/doctor-profile", icon: assets.people_icon, label: "Doctor Profile" },
  ];

  const navItemsToRender = aToken ? AdminNavItems : dToken ? DoctorNavItems : [];

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg mt-2 p-4">
      <ul className="space-y-4">
        {navItemsToRender.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-100 transition ${
                  isActive
                    ? "bg-blue-200 font-semibold text-blue-700"
                    : "text-gray-700"
                }`
              }
            >
              <img src={item.icon} alt={item.label} className="w-6 h-6" />
              <p>{item.label}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
