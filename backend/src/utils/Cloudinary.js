const cloudinary = require("cloudinary").v2;
const path = require("path")

const uploadFileToCloudinary = async(file) =>{

    //config 
    cloudinary.config({
        cloud_name:"dxt0o1esi",
        api_key:"921719868636996",
        api_secret:"hxK5qCl3LvUqNwyctprph4iHRI8" 
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path);
    return cloudinaryResponse;
};

module.exports = {
    uploadFileToCloudinary
}