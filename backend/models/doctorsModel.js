import mongoose from "mongoose";

const doctorsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Changed from Number to String
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    experience:{type: String, required: true},
    degree: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean },
    fees: { type: Number, required: true },
    address: { type: Object, required: true },
    date: { type: Date, default: Date.now }, // Changed from Number to Date
    slots_booked: { type: Map, of: String, default: {} }, // Changed to Map
  },
  { minimize: false }
);

const Doctor = mongoose.model.Doctor || mongoose.model("Doctor", doctorsSchema);
export default Doctor;
