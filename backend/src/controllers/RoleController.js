const roleModel = require("../models/RoleModel");

//get data request api
const getAllRoles = async (req, res) => {
  const roles = await roleModel.find();

  res.json({
    message: "roles fetched successful",
    data: roles
  });
};

//post data request api
const addRole = async (req,res) => {
//req.body,req.params, req.headers, req.query

console.log("request body...",req.body);
//database..
const savedRole = await roleModel.create(req.body);
res.json({
  message:"ok...",
  data:savedRole
})
};

//delete role by id 
const deleteRole = async(req,res)=>{
  //delete from roles where id=>
    //req.params
  // console.log(req.params) //params object 

  const deletedRole = await roleModel.findByIdAndDelete(req.params.id);

  res.json({
    message:"Role deleted successfully",
    data:deletedRole
  })
}

//get roles by id
const getRoleById = async(req,res)=>{
//req.params.id
const foundRole = await roleModel.findById(req.params.id);

res.json({
  message:"role fetched successfully",
  data:foundRole
})
}

module.exports = {
  getAllRoles,addRole,deleteRole,getRoleById
};