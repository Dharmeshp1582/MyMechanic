const garageModel = require("../models/GarageModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/Cloudinary");

//storage engine

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

//multer object...

const upload = multer({
  storage: storage
  //fileFilter:
}).single("image");

//add garage data
const addGarage = async (req, res) => {
  try {
    const savedGarage = await garageModel.create(req.body);
    //console.log("requested Body.. ", req.body);

    res.status(200).json({
      message: "garage data added successfully",
      data: savedGarage
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};

//get all garages
const getAllGarages = async (req, res) => {
  try {
    const getGarages = await garageModel
      .find()
      .populate("areaId cityId stateId userId");

    res.status(200).json({
      message: "Garages fetch successfully",
      data: getGarages
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};

// const addGarageWithFile = async(req,res) =>{
//   upload(req,res,(err)=>{
//     if(err){
//       res.status(500).json({
//         message: err.message
//       })
//     }else{
//       //database data store
//       //cloudinary

//       console.log(req.body);
//       res.status(200).json({
//         message:"file uploaded successfully",
//         data:req.file,
//       })
//     }
// })
// }

//getGarage by user id
const getAllGaragesByUserId = async (req, res) => {
  try {
    const garages = await garageModel
      .find({ userId: req.params.userId })
      .populate("stateId cityId areaId userId");
    if (garages.length === 0) {
      res.status(404).json({ message: "No Garage found" });
    } else {
      res.status(200).json({
        message: "Garage found successfully",
        data: garages
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addGarageWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({
        message: err.message
      });
    } else {
      // database data store
      //cloundinary

      const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
        req.file
      );
      console.log(cloundinaryResponse);
      console.log(req.body);

      //store data in database
      req.body.imageURL = cloundinaryResponse.secure_url;
      const savedGarage = await garageModel.create(req.body);

      res.status(200).json({
        message: "garage saved successfully",
        data: savedGarage
      });
    }
  });
};

//update garage detail
// const updateGarage = async (req, res) => {
//   //update tablename set ? where id = ?
//   //update new data -->req.body
//   //id --> req.params.id
//   try {
//     const updatedGarage = await garageModel.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     console.log(req.body);

//     res.status(200).json({
//       message: "garage update successfully",
//       data: updatedGarage
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "error while update garage detail",
//       err: error
//     });
//   }
// };
const updateGarageWithFile = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const garageId = req.params.id;
    const updateData = req.body;

    if (req.file) {
      // Upload new image to Cloudinary
      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file)
      updateData.imageURL = cloudinaryResponse.secure_url;
    }

    // Update garage details in the database
    const updatedGarage = await garageModel.findByIdAndUpdate(garageId, updateData, { new: true });

    if (!updatedGarage) {
      return res.status(404).json({ message: "Garage not found" });
    }

    res.status(200).json({
      message: "Garage updated successfully",
      data: updatedGarage,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || "Error updating garage details",
    });
  }
};


//get garage by garage id
const getGarageByGarageId = async (req, res) => {
  try {
    const getGarageById = await garageModel.findById(req.params.id).populate("stateId","name -_id").populate("cityId","cityName -_id").populate("areaId","name -_id").populate("rating");

    res.status(200).json({
      message: " Garage fetched successfully",
      data: getGarageById
    });
  } catch (error) {
    res.status(500).json({
      message: "failed to fetch garage",
      error: error
    });
  }
};

const DeletedGarage = async (req, res) => {
  try {
    const garage = await garageModel.findByIdAndDelete(req.params.id);
    if (!garage) {
      return res
        .status(404)
        .json({ success: false, message: "Garage not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Garage deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting garage" });
  }
};


//approve garage
const approveGarage = async (req, res) => {
  try {
    const updatedGarage = await garageModel.findByIdAndUpdate(
      req.params.id,
      { avaliability_status: true },
      { new: true }
    );

    res.status(200).json({
      message: "Garage approved successfully",
      data: updatedGarage
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


const getApprovedGarages = async (req, res) => {
  try {
    const garages = await garageModel.find({ avaliability_status: true }).populate("stateId cityId areaId userId");
    res.status(200).json({
      message: "Approved garages only",
      data: garages
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


module.exports = {
  addGarage,
  getAllGarages,
  addGarageWithFile,
  getAllGaragesByUserId,
  updateGarageWithFile,
  getGarageByGarageId,
  DeletedGarage,
  approveGarage ,
  getApprovedGarages 
};
