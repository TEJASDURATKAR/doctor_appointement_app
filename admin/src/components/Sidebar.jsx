import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  const navItems = [
    { to: "/dashboard", icon: assets.home_icon, label: "Dashboard" },
    {
      to: "/all-appointements",
      icon: assets.appointment_icon,
      label: "Appointments",
    },
    { to: "/add-doctor", icon: assets.add_icon, label: "Add Doctor" },
    { to: "/doctor-list", icon: assets.people_icon, label: "Doctor List" },
  ];

  return (
    <div className="w-64 min-h-screen mt-4 bg-white shadow-lg mt-1 p-4">
      {aToken && (
        <ul className="space-y-4">
          {navItems.map((item, index) => (
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
      )}
    </div>
  );
};

export default Sidebar;
