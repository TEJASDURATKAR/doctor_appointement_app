import express from "express";
import upload from "../middlewares/multer.js";
import { addDoctor,allDoctors,loginAdmin } from "../controllers/adminControllers.js"; // Import loginAdmin
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailablity } from "../controllers/doctorController.js";

const router = express.Router();

router.post("/add",authAdmin, upload.single("image"), addDoctor);
router.post("/login", loginAdmin); // Attach loginAdmin function
router.get('/all-doctors',authAdmin,allDoctors)
router.put('/change-availability', authAdmin, changeAvailablity);


export default router;
