//database 
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    //fileds /// get
    name:{
        type:String
       // require:true
    },
    description:{
        type:String
        //require:true
    }
},{timestamps:true})

module.exports = mongoose.model("roles",roleSchema)

//roles[roleSchema]