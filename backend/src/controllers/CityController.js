const cityModel = require("../models/CityModel");

//add city
const addCity = async(req, res) => {
  try {
    const savedCity = await cityModel.create(req.body);
    console.log("requested body for city model...",req.body)

    res.status(201).json({
      message: "City added successfully",
      data: savedCity
    });
  } catch (err) {
    res.status(500).json({
      message:err
    });
  }
};

//getall cities

const getAllCities = async (req, res) => {
  try {
    const GetCities = await cityModel.find().populate("stateId");
    res.status(200).json({
      message: "Get all cities successfully",
      data: GetCities
    });
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
};

//deleteCityByid
const deleteCityById = async(req,res)=>{
  try {
    const deleteCityById = await cityModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message:"city deleted successfully",
      data:deleteCityById
    })
  } catch (error) {
    res.status(500).json({
      message:error
    })
  }
}

//get city by state id

const getCityByStateId = async(req,res) =>{
   //const stateId = req.params.stateId;

  try {
    const cities = await cityModel.find({stateId:req.params.stateId});
    //console.log(req.params.stateId)
    res.status(200).json({
      message:"city found",
      data:cities
    })
  } catch (error) {
    res.status(500).json({
      message: "city not found"
    })
  }
}

module.exports = {
  addCity,
  getAllCities,deleteCityById,getCityByStateId
};
