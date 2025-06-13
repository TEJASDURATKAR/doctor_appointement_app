import bcrypt from "bcryptjs";
import Doctor from "../models/doctorsModel.js"; // Ensure correct model path
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";


export const addDoctor = async (req, res) => {
  try {
    // Extract data from request
    const { name, email, password, speciality, experience, degree, about, fees, address } = req.body;
    const imageFile = req.file; // Uploaded file

    // Validate required fields
    if (!name || !email || !password || !speciality || !experience || !degree || !about || !fees || !address || !imageFile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if doctor with the same email already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor with this email already exists" });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10); // Generate salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash password

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url; // Get the URL of the uploaded image

    // Create new doctor object
    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword, // Save hashed password
      speciality,
      experience,
      degree,
      about,
      fees,
      address: JSON.parse(address), // Convert string to object
      image: imageUrl, // Save Cloudinary image URL
      available: true, // Default availability
    });

    // Save doctor to database
    const savedDoctor = await newDoctor.save();
    console.log("✅ Data Saved:", savedDoctor);
    res.status(201).json({ message: "Doctor added successfully", doctor: savedDoctor });
  } catch (error) {
    console.error("❌ Error from admin controller:", error);
    res.status(500).json({ error: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    console.log("🔹 Login Attempt:", email); // Debugging

    // Check if email and password match environment admin credentials
    if (email === process.env.ADMIN_EMAIL_ID && password === process.env.ADMIN_PASSWORD) {
      // Generate JWT token for env admin login
      if (!process.env.JWT_SECRET) {
        throw new Error("Missing JWT_SECRET in environment variables");
      }

      const token = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: "Login successful (env admin)",
        token,
        admin: { email, role: "admin" }
      });
    }

    // Check if admin exists in database
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });


    res.status(200).json({
      message: "Login successful",
      token,
      admin: { email, role: "admin" }
    });

  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};


// ALL DOCTORS LIST
export const allDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");
    res.status(200).json(doctors); // ✅ Send the list of doctors as response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};


