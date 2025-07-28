import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";
import User from "../models/userModel.js";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import AppointmentModel from "../models/appointementModel.js";
import Doctor from "../models/doctorsModel.js";

import crypto from "crypto";
import Razorpay from "razorpay";




export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    if (!validator.isLength(password, { min: 8 })) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    // Hash password and create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during registration" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Basic validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 2. Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 4. Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your_jwt_secret_here",
      { expiresIn: "1d" }
    );

    // 5. Return response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user, // 🔥 send actual user data from DB
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!userId || !name || !dob || !gender || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "Required data missing" });
    }

    const updatedData = {
      name,
      phone,
      address: typeof address === "string" ? JSON.parse(address) : address,
      dob,
      gender,
    };

    // Upload image if provided
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updatedData.image = imageUpload.secure_url;
    }

    await User.findByIdAndUpdate(userId, updatedData);

    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.error("Error updating profile:", error.message, error.stack);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


//BOOK THE APPOINTMETNT

export const bookAppointement = async (req, res) => {
  try {
    const {
      userId,
      docId,
      slotData,
      slotTime,
    } = req.body;

    console.log("Incoming appointment request:", { userId, docId, slotData, slotTime });

    const docData = await Doctor.findById(docId).select("-password");

    if (!docData) {
      console.log("Doctor not found for ID:", docId);
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    if (!docData.available) {
      console.log("Doctor is not available:", docData.name);
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slot_booked = docData.slot_booked || {};

    // 🟡 Check if time slot is already booked
    if (slot_booked[slotData]) {
      if (slot_booked[slotData].includes(slotTime)) {
        console.log("Slot already booked:", slotData, slotTime);
        return res.json({ success: false, message: "Slot is not available" });
      } else {
        slot_booked[slotData].push(slotTime);
      }
    } else {
      slot_booked[slotData] = [slotTime];
    }

    // ✅ Save updated slot_booked
    await Doctor.findByIdAndUpdate(docId, { slot_booked });

    const userData = await User.findById(userId).select("-password");
    if (!userData) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 🟡 Remove unwanted data from doctor
    const docDataObject = docData.toObject();
    delete docDataObject.slot_booked;

    const appointment = await AppointmentModel.create({
      userId,
      docId,
      slotData,
      slotTime,
      userData,
      docData: docDataObject,
      amount: docData.fees || 0,
      date: new Date(),
    });

    console.log("Appointment booked:", appointment._id);

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
      
    });
  } catch (error) {
    console.error("Error booking appointment:", error.message, error.stack);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// API TO GET THE USER APPOINTEMENT FOR FROMNTEND MY-APPOINTEMENT PAGE

export const getAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentModel.find({ userId: req.user._id })
      .sort({ createdAt: -1 }); // 🔥 Recently booked first

    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    const appointmentData = await AppointmentModel.findById(appointmentId);
    if (!appointmentData) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Verify if the user is authorized
    if (appointmentData.userId.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Unauthorized action' });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    }

    // Delete the appointment
    await AppointmentModel.findByIdAndDelete(appointmentId);

    res.status(200).json({ success: true, message: 'Appointment cancelled successfully' });

  } catch (error) {
    console.error("Error deleting appointment:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};





export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount, // ✅ already in paise (e.g. 500 * 100 = 50000 sent from frontend)
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: err.message,
    });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    appointmentId,
  } = req.body;

  const secret = process.env.RAZORPAY_SECRET;

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generated_signature = hmac.digest("hex");

  if (generated_signature === razorpay_signature) {
    try {
      const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
        appointmentId,
        { payment: true },
        { new: true } // Return updated document
      );

      if (!updatedAppointment) {
        return res
          .status(404)
          .json({ success: false, message: "Appointment not found" });
      }

      return res.status(200).json({
        success: true,
        message: "Payment verified and appointment marked as paid",
        updatedAppointment,
      });
    } catch (err) {
      console.error("DB Update Error:", err); // Log the exact error
      return res.status(500).json({
        success: false,
        message: "Verified but failed to update DB",
        error: err.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};


// // PUT /api/appointment/:id/mark-paid
// app.put("/api/appointment/:id/mark-paid", authenticateUser, async (req, res) => {
//   try {
//     const { id } = req.params;

//     await Appointment.findByIdAndUpdate(id, {
//       payment: true,
//     });

//     res.status(200).json({ success: true, message: "Appointment marked as paid" });
//   } catch (error) {
//     console.error("Update payment error:", error);
//     res.status(500).json({ success: false, message: "Failed to update appointment" });
//   }
// });


// export const markPayment = async (req, res) => {
//   const { appointmentId, userId } = req.body;

//   try {
//     const appointment = await Appointment.findOne({ _id: appointmentId, userId });

//     if (!appointment) {
//       return res.status(404).json({ success: false, message: "Appointment not found" });
//     }

//     appointment.payment = true;
//     await appointment.save();

//     res.status(200).json({ success: true, message: "Payment marked as completed" });
//   } catch (err) {
//     console.error("Payment marking error:", err);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };




