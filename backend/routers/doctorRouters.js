import express from 'express';
import {
  appointmentCancle,
  appointmentCompleted,
  appointmentDoctor,
  doctorDashBoard,
  doctorList,
  doctorProfile,
  loginDoctor,
  updateDoctorProfile
} from '../controllers/doctorController.js';

import authDoctor from '../middlewares/authDoctor.js';

const router = express.Router();

// Public
router.get('/list', doctorList);
router.post('/login', loginDoctor);

// Protected (requires authDoctor middleware)
router.get('/appointments', authDoctor, appointmentDoctor);
router.post('/complete', authDoctor, appointmentCompleted);
router.post('/cancel', authDoctor, appointmentCancle);
router.get('/dashboard', authDoctor, doctorDashBoard);
router.get('/doctor-profile', authDoctor, doctorProfile);
router.post('/doctor-profile', authDoctor, updateDoctorProfile);

export default router;
