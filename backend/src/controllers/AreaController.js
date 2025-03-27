const areaModel = require("../models/AreaModel");

//add area
const addArea = async (req, res) => {
  try {
    const savedArea = await areaModel.create(req.body);
    console.log("requested body for area model...", req.body);

    res.status(200).json({
      message: "area added successfully",
      data: savedArea
    });
  } catch (error) {
    res.status(500).json({
      message: err
    });
  }
};

//get all area
const getAllArea = async (req, res) => {
  try {
    const getAreas = await areaModel.find().populate("stateId cityId");
    res.status(200).json({ message: "get all areas", data: getAreas });
  } catch (error) {
    res.status(500).json({
      message: err.message
    });
  }
};

//delete area by id
const deleteAreaById = async (req, res) => {
  try {
    const deleteArea = await areaModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Area deleted successfully",
      data: deleteArea
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};

//getarea by city id

const getAreasByCityId = async(req,res) =>{
  try {
    const areas = await areaModel.find({
      cityId: req.params.cityId 
    });
    res.status(200).json({
      message: "area found",
      data: areas
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}

module.exports = {
  addArea,
  getAllArea,
  deleteAreaById,
  getAreasByCityId
};
