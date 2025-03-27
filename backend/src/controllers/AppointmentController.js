const appointmentModel = require("../models/AppointmentModel");
const ServiceModel = require("../models/ServiceModel");
const Appointment = require("../models/AppointmentModel");

const getAllAppointments = async (req, res) => {
    try{
        const appointments = await appointmentModel.find().populate("userId serviceId vehicleId garageownerId")
        res.status(200).json({
            message:"appointments get successfully..",
            data:appointments
        })

    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const addAppointments = async (req, res) => {
    try {
        const { userId, serviceId, vehicleId, garageownerId, appointmentDate, basePrice, finalPrice, status, reason } = req.body;

        // Validate required fields
        if (!userId || !serviceId.length || !vehicleId || !garageownerId || !appointmentDate || !reason) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        // Fetch selected services and calculate total base price
        let calculatedBasePrice = 0;
        for (const id of serviceId) {
            const service = await ServiceModel.findById(id);
            if (!service) {
                return res.status(404).json({ message: `Service not found for ID: ${id}` });
            }
            calculatedBasePrice += service.price;
        }

        // Ensure basePrice matches calculated price
        if (calculatedBasePrice !== basePrice) {
            return res.status(400).json({ message: "Base price mismatch" });
        }

        // Create new appointment
        const newAppointment = new Appointment({
            userId,
            serviceId,
            vehicleId,
            garageownerId,
            appointmentDate,
            basePrice: calculatedBasePrice,
            finalPrice: finalPrice || calculatedBasePrice, // Default to base price if not provided
            status,
            reason,
        });

        // Save appointment to DB
        await newAppointment.save();

        res.status(201).json({ message: "Appointment booked successfully", data : newAppointment });
    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



const deleteAppointmentById = async (req,res) => {
    try{
        const deletedappointment = await appointmentModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message:"Appointment deleted..",
            data: deletedappointment
        })
    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

//get appointment by id
const getAppointmentsById = async (req,res) => {
    try{
        const appointment = await appointmentModel.findById(req.params.id)
        res.status(200).json({
            message:"Appointment founded..",
            data: appointment
        })
    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

//get all appointment by user id 
const getAllAppointmentByUserId = async (req,res) => {
    try {
        const { userId } = req.params;
    
        if (!userId) {
          return res.status(400).json({ success: false, message: "User ID is required." });
        }
    
        const appointments = await Appointment.find({ userId });
    
        if (!appointments.length) {
          return res.status(404).json({ success: false, message: "No appointments found for this user." });
        }
    
        res.status(200).json({ success: true, data: appointments });
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
      }
    };


module.exports = {
    getAllAppointments,addAppointments,getAppointmentsById,deleteAppointmentById,getAllAppointmentByUserId
}