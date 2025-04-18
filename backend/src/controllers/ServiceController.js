const serviceModel = require("../models/ServiceModel");
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

//service Creation
const addService = async (req, res) => {
  try {
    const savedService = await serviceModel.create(req.body).populate("garageId","name -_id");
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
// const deleteService = async (req, res) => {
//   //delete from service where id=>
//   //req.params
//   // console.log(req.params) //params object
//   try {
//     const deletedService = await serviceModel.findByIdAndDelete(req.params.id);

//     res.status(200).json({
//       message: "service deleted successfully",
//       data: deletedService
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error
//     });
//   }
// };

// DELETE /service/delete/:id
const deleteServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    

    const deletedService = await serviceModel.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
      data: deletedService,
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the service",
      error: error.message,
    });
  }
};

//add servicewithfile
const addServiceWithFile = async (req, res) => {
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
      const savedService = await serviceModel.create(req.body);

      res.status(200).json({
        message: "service saved successfully",
        data: savedService
      });
    }
  });
};

//update service detail
const updateServiceWithFile = async (req, res) => {
  try {
    // Handle file upload
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) {
          console.error("File upload error:", err);
          return reject(err);
        }
        resolve();
      });
    });

    const serviceId = req.params.id;
    let updateData = { ...req.body }; // Copy request body

    // If an image file is uploaded, upload to Cloudinary
    if (req.file) {
      try {
        const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
        updateData.imageURL = cloudinaryResponse.secure_url;
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError);
        return res.status(500).json({
          message: "Error uploading image to Cloudinary",
          error: cloudinaryError.message
        });
      }
    }

    // Update service in the database
    const updatedService = await serviceModel.findByIdAndUpdate(
      serviceId,
      updateData, // Use updateData (not req.body)
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      message: "Service updated successfully",
      data: updatedService
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while updating service details",
      error: error.message
    });
  }
};

const getAllServicesByUserId = async (req, res) => {
  try {
    const services = await serviceModel
      .find({ userId: req.params.userId })
      .populate("userId");
    res.status(200).json({
      message: "Service founded..",
      data: services
    });
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
};

//get Service by service id
// const getServiceByServiceId = async (req, res) => {
//   try {
//      const {id} =req.params;

//     const getServiceById = await serviceModel
//       .findById(id)

//     res.status(200).json({
//       message: "service fetched successfully",
//       data: getServiceById
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "failed to fetch service",
//       error: error
//     });
//   }
// };

const getservicebyId = async (req, res) => {
  try {
    const service = await serviceModel.findById(req.params.id);

    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch service",
        error: error.message
      });
  }
};

// GET services by garage ID
const getServicesByGarageId = async (req, res) => {
  const { id } = req.params;

  try {
    const services = await serviceModel.find({ garageId: id }).populate("name","-_id");

    if (!services || services.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No services found for this garage",
      });
    }

    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Error fetching services by garage ID:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching services",
    });
  }
};

module.exports = {
  addService,
  getAllServices,
  // deleteService,
  addServiceWithFile,
  updateServiceWithFile,
  getAllServicesByUserId,
  // getServiceByServiceId,
  getservicebyId,
  getServicesByGarageId,
  deleteServiceById
};
