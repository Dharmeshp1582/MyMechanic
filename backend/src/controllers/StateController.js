const stateModel = require("../models/StateModel");

//add state
const addState = async (req, res) => {
  try {
    const savedState = await stateModel.create(req.body);
    console.log("requested body for state model...",req.body);

      res.status(201).json({
        message:"state added successfully",
        data:savedState
      })  
 
  } catch (error) {
    res.status(500).json({
        message:error
    })
  }
};

//get all state
const getAllState = async (req,res) =>{
    try {
        const getState = await stateModel.find();
         res.status(200).json({
            message:"state fetched success",
            data: getState
         })
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
}

//delete state by id 

const deleteStateById =  async(req,res) =>{
  try {
    const deleteState = await stateModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message:"state deleted successfully",
      data:deleteState
    })
  } catch (error) {
    res.status(500).json({
      message:error
    })
  }
  


}


module.exports = {
    addState,getAllState,deleteStateById
}

