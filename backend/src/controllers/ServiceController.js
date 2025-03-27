const serviceModel = require("../models/ServiceModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/Cloudinary");


//storage engine 

const storage = multer.diskStorage({
  destination:"./uploads",
  filename: function(req,file,cb){
    cb(null,file.originalname);
  }
})


//multer object...

const upload = multer({
  storage: storage,
  //fileFilter:
}).single("image");

//service Creation
const addService = async (req, res) => {
  try {
    const savedService = await serviceModel.create(req.body);
    console.log(req.body);

    res.status(200).json({
      message: "service Creation success",
      data: savedService
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};

//get All Services
const getAllServices = async (req, res) => {
  try {
    const getServices = await serviceModel.find();

    res.status(200).json({
      message: "services fetched successful",
      data: getServices
    });
  } catch (error) {
    res.status(500).json({
      message: error
    });
  }
};


//delete Service by id 
const deleteService = async(req,res)=>{
  //delete from service where id=>
    //req.params
  // console.log(req.params) //params object 
try {
    const deletedService = await serviceModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message:"service deleted successfully",
    data:deletedService
  })
} catch (error) {
    res.status(500).json({
        message:error 
    })
}
  
}

const addServiceWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      // database data store
      //cloundinary

      const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
      console.log(cloundinaryResponse);
      console.log(req.body);

      //store data in database
      req.body.imageURL = cloundinaryResponse.secure_url;
      const savedService = await serviceModel.create(req.body);

      res.status(200).json({
        message: "service saved successfully",
        data: savedService
      });
    }
  });
};


//update service detail
const updateService = async (req, res) => {
  //update tablename set ? where id = ?
  //update new data -->req.body
  //id --> req.params.id
  try {
    const updatedService = await serviceModel.findByIdAndUpdate(
      req.params.id,
      req.body,{new: true}
    );
    console.log(req.body);

    res.status(200).json({
      message: "service detail updated successfully",
      data: updatedService
    });
  } catch (error) {
    res.status(500).json({
      message: "error while update service detail",
      err: error
    });
  }
};

const getAllServicesByUserId = async (req,res) => {
  try{
      const services = await serviceModel.find({userId:req.params.userId}).populate("userId")
      res.status(200).json({
          message:"Service founded..",
          data:services 
      })
  } catch(err){
      res.status(500).json({
          message:err
      })
  }
}


//get Service by service id
const getServiceByServiceId = async (req,res)=>{
  try {
    const getServiceById = await serviceModel.findById(req.params.id).populate("userId");

    res.status(200).json({
      message: " service fetched successfully",
      data: getServiceById
    })
  } catch (error) {
    res.status(500).json({
      message:"failed to fetch service",
      error: error 
    })
  }

}


module.exports = {
  addService, getAllServices,deleteService,
  addServiceWithFile,updateService,getAllServicesByUserId,
  getServiceByServiceId
};
