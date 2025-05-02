const cloudinary = require("cloudinary").v2;
const path = require("path")

const uploadFileToCloudinary = async(file) =>{

    //config 
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_KEY,
        api_secret: process.env.CLOUD_SECRET 
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
    return cloudinaryResponse;
};

module.exports = {
    uploadFileToCloudinary
}