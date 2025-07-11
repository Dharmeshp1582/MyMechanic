const appointmentModel = require("../models/AppointmentModel");
const GarageModel = require("../models/GarageModel");
const userModel = require("../models/UserModel");
const { sendingMail } = require("../utils/MailUtil");

// Get All Appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find().populate(
      "userId serviceId vehicleId garageownerId",
      "name fullName model userId licensePlate"
    );
    res.status(200).json({
      message: "Appointments fetched successfully",
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Appointment + Send Mail
const addAppointments = async (req, res) => {
  try {
    const savedAppointment = await appointmentModel.create(req.body);
    const user = await userModel.findById(req.body.userId);

    if (user?.email) {
      await sendingMail(
        user.email,
        "Appointment Confirmation - MY Mechanic",
        `Hello ${user.fullName || "Customer"},\n\nYour appointment has been booked successfully!\n\nWe'll notify you again once your service is completed.\n\nThank you for choosing MY Mechanic 🚗🔧`
      );
    }

    res.status(201).json({
      message: "Appointment saved and confirmation email sent.",
      data: savedAppointment,
    });
  } catch (error) {
    console.error("Error in booking appointment:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Delete Appointment
const deleteAppointmentById = async (req, res) => {
  try {
    const deleted = await appointmentModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Appointment deleted successfully",
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Appointment by ID
const getAppointmentsById = async (req, res) => {
  try {
    const appointment = await appointmentModel
      .findById(req.params.id)
      .populate("serviceId", "name price")
      .populate("vehicleId", "model licensePlate")
      .populate({
        path: "garageownerId",
        select: "name userId",
        populate: {
          path: "userId",
          select: "fullName email",
        },
      })
      .populate("userId", "fullName email");

    res.status(200).json({
      message: "Appointment fetched successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Appointments by User ID
const getAllAppointmentByUserId = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({ userId: req.params.userId })
      .populate("serviceId", "name allInclusivePrice")
      .populate("vehicleId", "model mfgYear licensePlate")
      .populate({
        path: "garageownerId",
        select: "name userId latitude longitude",
        populate: {
          path: "userId",
          select: "fullName email",
        },
      })
      .populate("userId", "fullName email");

    res.status(200).json({
      message: "Appointments fetched by user ID",
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Appointments by Garage Owner (userId)
const getAppointmentsByGarageownerUserId = async (req, res) => {
  try {
    const garages = await GarageModel.find({ userId: req.params.userId }).select("_id name");

    if (!garages.length) {
      return res.status(404).json({ message: "No garages found", data: [] });
    }

    const garageIds = garages.map((g) => g._id);
    const appointments = await appointmentModel
      .find({ garageownerId: { $in: garageIds } })
      .populate("serviceId", "name price")
      .populate("vehicleId", "model licensePlate")
      .populate("userId", "fullName email")
      .populate("garageownerId", "name");

    res.status(200).json({
      message: "Appointments fetched for garage owner",
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Appointment Status
const UpdateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointmentId = req.params.id;

    let updateFields = { status };
    if (status === "rejected") updateFields.wasRejected = true;
    else if (status === "pending") updateFields.wasRejected = false;

    const updatedAppointment = await appointmentModel
      .findByIdAndUpdate(appointmentId, updateFields, { new: true })
      .populate("userId")
      .populate("garageownerId")
      .populate("serviceId")
      .populate("vehicleId");

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    if (status === "completed") {
      const services = updatedAppointment.serviceId.map((s) => s.name).join(", ");
      const html = `
        <div style="font-family: Arial, sans-serif;">
          <h2>Hello ${updatedAppointment.userId.fullName},</h2>
          <p>Your service appointment is now <strong>completed</strong>.</p>
          <h3>Vehicle:</h3>
          <ul>
            <li><strong>Model:</strong> ${updatedAppointment.vehicleId.model}</li>
            <li><strong>License Plate:</strong> ${updatedAppointment.vehicleId.licensePlate}</li>
          </ul>
          <p><strong>Services:</strong> ${services}</p>
          <p><strong>Total Price:</strong> ₹${updatedAppointment.finalPrice}</p>
          <a href="http://localhost:5173/user/appointment" style="padding: 10px 15px; background: green; color: white; text-decoration: none; border-radius: 5px;">Pay Now</a>
          <p style="margin-top: 20px;">Thanks for using My Mechanic 🚗</p>
        </div>
      `;
      await sendingMail(updatedAppointment.userId.email, "Your Vehicle Service is Completed!", "", html);
    }

    res.status(200).json({
      message: "Appointment status updated",
      data: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Vehicle Return Status
const updateVehicleReturnStatus = async (req, res) => {
  try {
    const { vehicleStatus } = req.body;
    const appointmentId = req.params.id;

    const updated = await appointmentModel
      .findByIdAndUpdate(appointmentId, { vehicleStatus }, { new: true })
      .populate("userId")
      .populate("vehicleId")
      .populate("garageownerId");

    if (!updated) return res.status(404).json({ message: "Appointment not found" });

    if (vehicleStatus === "returned") {
      const userEmail = updated.userId.email;
      const formattedDate = new Date(updated.appointmentDate).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const html = `
        <div style="font-family: Arial;">
          <h2>Hello ${updated.userId.fullName},</h2>
          <p>Your vehicle has been returned by <strong>${updated.garageownerId?.name || "Garage"}</strong>.</p>
          <ul>
            <li><strong>Vehicle:</strong> ${updated.vehicleId.model} (${updated.vehicleId.licensePlate})</li>
            <li><strong>Date:</strong> ${formattedDate}</li>
          </ul>
          <p>Thanks for choosing E-Garage!</p>
        </div>
      `;
      await sendingMail(userEmail, "Your Vehicle Has Been Returned", "", html);
    }

    res.status(200).json({
      message: "Vehicle status updated",
      data: updated,
    });
  } catch (error) {
    console.error("Return Status Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Cancel Appointment
const cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const updated = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      { status: "cancelled" },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Appointment not found" });

    res.status(200).json({
      message: "Appointment cancelled",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling appointment", error });
  }
};

module.exports = {
  getAllAppointments,
  addAppointments,
  deleteAppointmentById,
  getAppointmentsById,
  getAllAppointmentByUserId,
  getAppointmentsByGarageownerUserId,
  UpdateStatus,
  updateVehicleReturnStatus,
  cancelAppointment,
};
