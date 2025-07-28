import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { AdminContext } from "./context/AdminContext";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // ✅ make sure this is created
import DashBoard from "./pages/admin/DashBoard";
import AllAppointements from "./pages/admin/AllAppointements";
import AddDoctor from "./pages/admin/AddDoctor";
import DoctorsList from "./pages/admin/DoctorsList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorDashBoard from "./pages/doctor/DoctorDashBoard";
import DoctorAppointment from "./pages/doctor/DoctorAppointment";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <>
      {aToken || dToken ? (
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="add-doctor" element={<AddDoctor />} />
            <Route path="all-appointements" element={<AllAppointements />} />
            <Route path="doctor-list" element={<DoctorsList />} />

            {/* Doctor Routes */}

            <Route path="doctor-profile" element={<DoctorProfile />} />
            <Route path="doctor-dashboard" element={<DoctorDashBoard />} />
            <Route path="doctor-appointments" element={<DoctorAppointment />} />
          </Route>
        </Routes>
      ) : (
        <Login />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
