import express from "express";
import {
  loginUser,
  register,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
import upload from "../middlewares/multer.js";
import authUser from "../middlewares/authUser.js";


const router = express.Router();

// Public Routes
router.post("/register", register);
router.post("/login", loginUser);

// Protected Routes
router.get("/profile", authUser, getProfile);
router.post("/profile", authUser, upload.single("image"), updateProfile);


export default router;

