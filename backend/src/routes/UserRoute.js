const routes = require("express").Router();
const userController = require("../controllers/UserController")

routes.get("/users", userController.getUsers);
routes.post("/addusers",userController.addUsers);
routes.delete("/users/:id",userController.deleteUsers);
routes.get("/users/:id",userController.getUserById);
routes.post("/adduser1",userController.addUser1);
routes.post("/user",userController.Signup); 
routes.post("/user/login",userController.loginUser);
routes.post("/adduserwithfile",userController.addUserWithFile);
routes.put("/updateuser/:id",userController.updateUser);
routes.post("/user/forgetpassword",userController.forgetPassword);
routes.post("/user/resetpassword",userController.resetPassword);
// routes.patch("/users/:id",userController.updateUser);
//controller --> userController
routes.get("/getuserbyid/:id",userController.getUserByUserId);

module.exports = routes;