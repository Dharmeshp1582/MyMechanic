const vehicleModel = require("../models/VehicleModel");

// Add Vehicle
const addVehicle = async (req, res) => {
  try {
    const newVehicle = await vehicleModel.create(req.body);

    res
      .status(201)
      .json({ message: "Vehicle added successfully", data: newVehicle });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Get All Vehicles
const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleModel.find().populate("userId");
    res.status(200).json({
      message: "get all vehicles success",
      data: vehicles
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Delete Vehicle
const deleteVehicleById = async (req, res) => {
  try {
    const deletedVehicle = await vehicleModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Vehicle deleted successfully",
      data: deletedVehicle
     });
  } catch (error) {
    res
      .status(500)
      .json({ message: error });
  }
};

//get Vehicle By user Id
const getVehicleByUserId = async (req,res) => {
  try{
      const vehicle = await vehicleModel.find({userId: req.params.userId})
      if(!vehicle){res.status(404).json({message:"vehicle not found"})}
      res.status(200).json({
          message:"vehicle is founded..",
          data:vehicle
      })

  } catch(err){
      res.status(500).json({
          message: err.message
      })
  }
}

module.exports = { addVehicle, getAllVehicles, deleteVehicleById, getVehicleByUserId };
