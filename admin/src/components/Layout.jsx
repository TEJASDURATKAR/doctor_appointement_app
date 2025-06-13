import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col">
      {/* Navbar at the top */}
      <Navbar />

      {/* Below Navbar: Sidebar + Main Content */}
      <div className="flex flex-1">
        {/* Sidebar on the left */}
        <div className="w-64">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
