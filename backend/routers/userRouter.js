import express from "express";
import {
  loginUser,
  register,
  getProfile,
  updateProfile,
  bookAppointement,
  getAppointments,
  cancelAppointment,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controllers/userController.js";
import upload from "../middlewares/multer.js";
import authUser from "../middlewares/authUser.js";
import { protect } from "../middlewares/protectMiddelware.js";

const router = express.Router();

// Public Routes
router.post("/register", register);
router.post("/login", loginUser);

// Protected Routes
router.get("/profile", authUser, getProfile);
router.put("/profile", authUser, upload.single("image"), updateProfile);

// Book Appointment
router.post("/book-appointment", authUser, bookAppointement);

// My Appointments
router.get("/appointments", protect, getAppointments);
router.delete("/appointment/cancel", protect, cancelAppointment);

// Razorpay Payment
router.post("/payment/create-order", authUser, createRazorpayOrder);
router.post("/payment/verify", verifyRazorpayPayment);

export default router;
