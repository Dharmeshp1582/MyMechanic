const mechanicController = require("../controllers/MechanicController");
const MechanicModel = require("../models/MechanicModel");

//add mechanic
const addMechanic = async (req, res) => {
  try {
    const savedMechanic = await mechanicController.create(req.body);

    res.status(200).json({
      message: "Mechanic added successfully",
      data: savedMechanic
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};

//get All Mechanic
const getAllMechanic = async (req, res) => {
  try {
    const getMechanics = await mechanicController.find();
    res.status(201).json({
      message: "Get all Mechanics successfully ",
      data: getMechanics
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};

//get user by id and delete
const deleteMechanic = async(req,res) =>{
    try {
        const deletedMechanic = await MechanicModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message:"Mechanic deleted successfully",
            data: deletedMechanic
        })
    } catch (error) {
        res.status(500).json({
            message:error 
        })
    }
} 

module.exports = {
  addMechanic,
  getAllMechanic,deleteMechanic
};
