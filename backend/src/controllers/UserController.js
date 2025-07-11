const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/Cloudinary");
const jwt = require("jsonwebtoken");
const secret = "secret";

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

//login user
const loginUser = async (req, res) => {
  //req.body email and password: password

  //password -->plain-->db-->encrypted
  //bcrypt --> plain,enc -->

  const email = req.body.email;
  const password = req.body.password;

  //select * from users where email = ? and password = ?  //for sql db
  //userModel.find({email:email,password:password})
  //email --> object -->abc -->  {password:hashedPassword}
  //normal password compare -->

  // const foundUserFromEmail = userModel.findOne({email:req.body.email})
  const foundUserFromEmail = await userModel
    .findOne({ email: email })
    .populate("roleId");
  console.log(foundUserFromEmail);
  //check if email is exist or not //

  if (foundUserFromEmail != null) {
    //password
    const isMatch = await bcrypt.compareSync(
      password,
      foundUserFromEmail.password
    );
    // res.send("ok...");
    //true || false

    if (isMatch == true) {
      res.status(200).json({
        message: "user login success",
        data: foundUserFromEmail
      });
    } else {
      res.status(404).json({
        message: "user cred. incorrect"
      });
    }
  } else {
    res.status(404).json({
      message: "user not found"
    });
  }
};

//signup
const Signup = async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(500).json({ message: "User already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt); // access password from req.body
    req.body.password = hashedPassword;
    const createdUser = await userModel.create(req.body);
    console.log(createdUser);
    //send mail to user

    // const mailResponse = await mailUtil.sendingMail(createdUser.email,"Welcome to MyMechanic platform","This is Welcome mail");

    await mailUtil.sendingMail(
      createdUser.email,
      "Welcome to MyMechanic platform",
      "This is Welcome mail"
    );

    //console.log("request body ..", req.body);
    res.status(201).json({
      message: "user created success..",
      data: createdUser
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error",
      data: err
    });
  }
};


const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().populate("roleId", "name -_id");
    const filteredUsers = users.filter((user) => user.roleId.name !== "Admin");
    res.status(200).json({
      message: "users fetched Sucessfully",
      data: filteredUsers
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

//add user
const addUsers = async (req, res) => {
  console.log("request body...", req.body);

  //req.body
  const savedUser = await userModel.create(req.body);
  res.json({
    message: "user added successfully",
    data: savedUser
  });
};

//deleteuser
const deleteUsers = async (req, res) => {
  //delete from user where id=>
  //req.params
  //console.log(req.params) //params object

  const deletedUser = await userModel.findByIdAndDelete(req.params.id);

  res.json({
    message: "user deleted successful",
    data: deletedUser
  });
};

// get user by id
const getUserById = async (req, res) => {
  try {
    const foundUser = await userModel.findById(req.params.id);

    res.status(200).json({
      message: "user fetched success",
      data: foundUser
    });
  } catch (error) {
    res.status(500).json({
      message: "error while update user detail",
      err: error
    });
  }
};



const addUser1 = async (req, res) => {
  try {
    const createdUser = await userModel.create(req.body);
    console.log("request body ..", req.body);
    res.status(201).json({
      message: "user created success..",
      data: createdUser
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err
    });
  }
};

const addUserWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ message: "File is required!" });
      }

      // Upload image to Cloudinary
      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
      req.body.imageURL = cloudinaryResponse.secure_url;

      // Hash the password
      const salt = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;

      // Save user
      const savedUser = await userModel.create(req.body);

      // ✅ Send welcome email
      try {
        await mailUtil.sendingMail(
          savedUser.email,
          "Welcome to MyMechanic platform",
          `<p>Hello ${savedUser.fullName || "User"}, welcome to the platform!</p>`,
          "Welcome to MyMechanic!"
        );
      } catch (mailErr) {
        console.error("Email error:", mailErr.message);
        // Optionally continue without throwing error
      }

      res.status(200).json({
        message: "User registered successfully ✅",
        data: savedUser
      });
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json({ message: "Internal Server Error ❌" });
    }
  });
};



//update user
const updateUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    try {
      const userId = req.params.id;
      const { fullName, contact } = req.body;
      let updatedData = { fullName, contact };

      // If a new image is uploaded, store it in Cloudinary
      if (req.file) {
        const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
          req.file
        );
        updatedData.imageURL = cloudinaryResponse.secure_url;
      }

      // Update the user data in the database
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        updatedData,
        { new: true }
      );

      res.status(200).json({
        message: "User updated successfully",
        data: updatedUser
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};

const forgetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const foundUser = await userModel.findOne({ email: email });

    if (foundUser) {
      const token = jwt.sign(foundUser.toObject(), secret);
      console.log(token);
      const url = `http://localhost:5173/resetpassword/${token}`;
      const mailContent = `<html>
    <a href=${url}>reset password</a></html>`;
      //email

      const mailResponse = await mailUtil.sendingMail(
        foundUser.email,
        "reset password",
        mailContent
      );
      res.json({
        message: "password reset link send success",
        data: mailResponse
      });
    } else {
      res.json({
        message: "user not found register first..."
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.body.token; //decode --> email | id
    const newPassword = req.body.password;
    const secret = "secret";

    const userFromToken = jwt.verify(token, secret);
    //object -->email,id..
    //password encrypt...
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    const updatedUser = await userModel.findByIdAndUpdate(
      userFromToken._id,
      {
        password: hashedPassword
      },
      { new: true }
    );
    res.status(201).json({
      message: "password updated successfully..",
      data: updatedUser
    });
  } catch (error) {
    console.log(error.message);
  }
};

//get User by User id
const getUserByUserId = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from request parameters
    const user = await userModel.findById(userId).select("-password"); // Fetch user from DB

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: "User Fetch success", data: user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getUsers,
  addUsers,
  deleteUsers,
  getUserById,
  addUser1,
  Signup,
  loginUser,
  // loginUserWithToken,
  addUserWithFile,
  getUserByUserId,
  updateUser,
  forgetPassword,
  resetPassword
};
