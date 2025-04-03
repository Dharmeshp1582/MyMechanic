const appointmentModel = require("../models/AppointmentModel");
const ServiceModel = require("../models/ServiceModel");
const Appointment = require("../models/AppointmentModel");
const GarageModel = require("../models/GarageModel");

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find()
      .populate("userId serviceId vehicleId garageownerId");
    res.status(200).json({
      message: "appointments get successfully..",
      data: appointments
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// modified
const addAppointments = async (req, res) => {
  try {
    const {
      userId,
      serviceId,
      vehicleId,
      garageownerId,
      appointmentDate,
      basePrice,
      finalPrice,
      status,
      reason
    } = req.body;

    // Validate required fields
    if (
      !userId ||
      !serviceId?.length ||
      !vehicleId ||
      !garageownerId ||
      !appointmentDate ||
      !reason
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    // Fetch selected services and calculate total base price
    let calculatedBasePrice = 0;
    for (const id of serviceId) {
      const service = await ServiceModel.findById(id);
      if (!service) {
        return res
          .status(404)
          .json({ message: `Service not found for ID: ${id}` });
      }
      calculatedBasePrice += service.price;
    }

    // Ensure basePrice matches calculated price
    if (calculatedBasePrice !== basePrice) {
      return res.status(400).json({ message: "Base price mismatch" });
    }

    // Fetch garage owner details
    const garageOwner = await GarageModel.findById(garageownerId).populate(
      "userId",
      "name email phone"
    );
    if (!garageOwner) {
      return res.status(404).json({ message: "Garage owner not found" });
    }

    // Create new appointment
    const newAppointment = new Appointment({
      userId,
      serviceId,
      vehicleId,
      garageownerId, // Keeping the garage owner ID
      appointmentDate,
      basePrice: calculatedBasePrice,
      finalPrice: finalPrice ?? calculatedBasePrice, // Defaulting final price
      status,
      reason,
      garageOwnerDetails: {
        userId: garageOwner.userId._id, // Storing user ID separately
        name: garageOwner.userId.name,
        email: garageOwner.userId.email,
        phone: garageOwner.userId.phone
      }
    });

    // Save appointment to DB
    await newAppointment.save();

    res
      .status(201)
      .json({
        message: "Appointment booked successfully",
        data: newAppointment
      });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAppointmentById = async (req, res) => {
  try {
    const deletedappointment = await appointmentModel.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json({
      message: "Appointment deleted..",
      data: deletedappointment
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

//get appointment by id
const getAppointmentsById = async (req, res) => {
  try {
    const appointment = await appointmentModel.findById(req.params.id);
    res.status(200).json({
      message: "Appointment founded..",
      data: appointment
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

//get all appointment by user id
const getAllAppointmentByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    const appointments = await appointmentModel
      .find({ userId })
      .populate({
        path: "serviceId", // Correct way to populate an array of ObjectIds
        select: "name -_id"
      })
      .populate("garageownerId", "name _id")
      .populate("vehicleId", "model -_id");

    if (!appointments.length) {
      return res.status(404).json({
        success: false,
        message: "No appointments found for this user."
      });
    }

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};

const getAppointmentByGarageownerId = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from request parameters

    // Find all appointments where garageownerId.userId._id matches the provided userId
    const appointments = await appointmentModel
      .find({
        "garageownerId.userId._id": userId
      })
      .populate("userId", "fullName email") // Populate user details
      .populate("serviceId", "name") // Populate service details
      .populate("vehicleId", "model") // Populate vehicle details
      .populate("garageownerId.userId", "email"); // Populate garage owner's user details

    if (!appointments.length) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No appointments found for this garage owner user."
        });
    }

    return res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Server error, please try again later."
      });
  }
};

const UpdateStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params.id;
    const { status } = req.body;

    const updatedAppointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({ success: true, data: updatedAppointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// //get appointment by user id
// const getappointmentByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Fetch Appointments
//     const appointments = await appointmentModel.find({ userId });

//     if (!appointments.length) {
//       return res.status(404).json({ success: false, message: "No appointments found" });
//     }

//     // Fetch Service, Vehicle, and Garage details
//     const updatedAppointments = await Promise.all(
//       appointments.map(async (appointment) => {
//         // Fetch Service Names
//         const serviceNames = await Promise.all(
//           appointment.serviceId.map(async (serviceId) => {
//             const service = await ServiceModel.findById(serviceId);
//             return service ? service.name : "N/A";
//           })
//         );

//         // Fetch Vehicle Name
//         const vehicle = await VehicleModel.findById(appointment.vehicleId);
//         const vehicleName = vehicle ? vehicle.name : "N/A";

//         // Fetch Garage Name
//         const garage = await GarageModel.findById(appointment.garageownerId);
//         const garageName = garage ? garage.name : "N/A";

//         return {
//           ...appointment._doc,
//           serviceNames: serviceNames.join(", "),
//           vehicleName,
//           garageName,
//         };
//       })
//     );

//     res.json({ success: true, data: updatedAppointments });
//   } catch (error) {
//     console.error("Error fetching appointments:", error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

module.exports = {
  getAllAppointments,
  addAppointments,
  getAppointmentsById,
  deleteAppointmentById,
  getAllAppointmentByUserId,
  getAppointmentByGarageownerId,
  UpdateStatus
};
