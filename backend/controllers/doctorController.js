import Doctor from "../models/doctorsModel.js";

export const changeAvailablity = async (req, res) => {
  try {
    const { doctorId, available } = req.body;

    if (!doctorId || typeof available !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Doctor ID and availability status are required',
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
        message: 'Doctor not found',
      });
    }

    res.json({
      success: true,
      message: 'Doctor availability updated successfully',
      data: updatedDoctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const doctorList = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select(['-password','-email']);
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