const mongoose = require("mongoose");
const Schema =  mongoose.Schema;

const areaSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    pincode:{
          type:Number,
          require:true 
    },
    cityId:{
        type:Schema.Types.ObjectId,
        ref:"cities"
    } ,stateId:{
        type:Schema.Types.ObjectId,
        ref:"states"
    }
},{timestamps:true});

module.exports = mongoose.model("areas",areaSchema);