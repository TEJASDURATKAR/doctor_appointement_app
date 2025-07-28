import Doctor from "../models/doctorsModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import AppointmentModel from "../models/appointementModel.js";

export const changeAvailablity = async (req, res) => {
  try {
    const { doctorId, available } = req.body;

    if (!doctorId || typeof available !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Doctor ID and availability status are required",
      });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { available },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.json({
      success: true,
      message: "Doctor availability updated successfully",
      data: updatedDoctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const doctorList = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select(["-password", "-email"]);
    res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      data: doctors,
    });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctors",
      error: error.message,
    });
  }
};

export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if doctor exists
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // ✅ Compare password
    const isMatch = await bcryptjs.compare(password, doctor.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { doctorId: doctor._id, email: doctor.email },
      process.env.JWT_SECRET || "your_jwt_secret_key", // fallback for dev
      { expiresIn: "7d" }
    );

    // ✅ Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      doctor: {
        _id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        specialization: doctor.specialization,
        // add more fields if needed
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const appointmentDoctor = async (req, res) => {
  try {
    const docId = req.docId; // ✅ Already attached in middleware

    console.log("Doctor ID from middleware:", docId); // ✅ Debug log

    const appointments = await AppointmentModel.find({ docId }).populate(
      "userId"
    );

    console.log("Appointments found:", appointments.length); // ✅ Debug log

    res.json({ success: true, data: appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ API to mark appointment as completed
export const appointmentCompleted = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Appointment ID is required" });
    }

    const appointment = await AppointmentModel.findById(appointmentId);

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    appointment.isCompleted = true;
    await appointment.save();

    res
      .status(200)
      .json({ success: true, message: "Appointment marked as completed" });
  } catch (error) {
    console.error("Error marking appointment completed:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ API to cancel appointment
export const appointmentCancle = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    // 1. Validate input
    if (!docId || !appointmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing docId or appointmentId" });
    }

    // 2. Fetch appointment
    const appointmentData = await AppointmentModel.findById(appointmentId);

    // 3. Validate ownership
    if (!appointmentData) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    if (appointmentData.docId.toString() !== docId) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized cancellation attempt" });
    }

    // 4. Cancel appointment
    await AppointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    return res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error while cancelling appointment",
      });
  }
};

export const doctorDashBoard = async (req, res) => {
  try {
    const docId = req.docId;

    const appointments = await AppointmentModel.find({ docId });
    let earning = 0;

    appointments.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earning += item.amount;
      }
    });

    let patients = [];
    appointments.forEach((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earning,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5), // ✅ Fixed
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const doctorProfile = async (req, res) => {
  try {
    const { docId } = req; // get from middleware

    if (!docId) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor ID is required" });
    }

    const profileData = await Doctor.findById(docId).select("-password");

    if (!profileData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res.json({ success: true, profileData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;

    if (!docId) {
      return res.status(400).json({ success: false, message: "Doctor ID is required" });
    }

    // Validate address object (optional but recommended)
    if (typeof address !== 'object' || !address.line1 || !address.line2) {
      return res.status(400).json({ success: false, message: "Incomplete address details" });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      docId,
      {
        fees,
        available,
        address: {
          ...address // ensures you're updating full address object
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    res.json({ success: true, message: "Profile updated", data: updatedDoctor });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

