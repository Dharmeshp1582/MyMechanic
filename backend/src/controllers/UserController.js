const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/Cloudinary");
const jwt = require("jsonwebtoken");
const secret = "secret";

//storage engine

const storage = multer.memoryStorage(); // Use memory storage for Vercel compatibility

//multer object...

const upload = multer({
  storage: storage
  //fileFilter:
}).single("image");

//login user
const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const foundUserFromEmail = await userModel
      .findOne({ email: email })
      .populate("roleId");
    if (foundUserFromEmail != null) {
      const isMatch = await bcrypt.compare(password, foundUserFromEmail.password);
      if (isMatch) {
        const userSafe = foundUserFromEmail.toObject();
        delete userSafe.password;
        res.status(200).json({
          message: "user login success",
          data: userSafe
        });
      } else {
        res.status(401).json({
          message: "user cred. incorrect"
        });
      }
    } else {
      res.status(404).json({
        message: "user not found"
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

//signup
const Signup = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const createdUser = await userModel.create(req.body);
    await mailUtil.sendingMail(
      createdUser.email,
      "Welcome to MyMechanic platform",
      "This is Welcome mail"
    );
    const userSafe = createdUser.toObject();
    delete userSafe.password;
    res.status(201).json({
      message: "user created success..",
      data: userSafe
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err.message
    });
  }
};


const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().populate("roleId", "name -_id");
    const filteredUsers = users.filter((user) => user.roleId.name !== "Admin");
    const safeUsers = filteredUsers.map(u => {
      const obj = u.toObject();
      delete obj.password;
      return obj;
    });
    res.status(200).json({
      message: "users fetched Sucessfully",
      data: safeUsers
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

//add user
const addUsers = async (req, res) => {
  try {
    const savedUser = await userModel.create(req.body);
    const userSafe = savedUser.toObject();
    delete userSafe.password;
    res.json({
      message: "user added successfully",
      data: userSafe
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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

      // Upload image to Cloudinary (use buffer)
      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
      req.body.imageURL = cloudinaryResponse.secure_url;

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;

      // Save user
      const savedUser = await userModel.create(req.body);

      // Send welcome mail
      try {
        await mailUtil.sendingMail(
          savedUser.email,
          "Welcome to MyMechanic platform",
          `<p>Hello ${savedUser.fullName || "User"}, welcome to the platform!</p>`,
          "Welcome to MyMechanic!"
        );
      } catch (mailErr) {
        console.error("Email error:", mailErr.message);
      }

      const userSafe = savedUser.toObject();
      delete userSafe.password;

      res.status(200).json({
        message: "User registered successfully ✅",
        data: userSafe,
      });
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json({ message: "Internal Server Error ❌" });
    }
  });
};


// const addUserWithFile = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(500).json({ message: err.message });
//     }
//     try {
//       if (!req.file) {
//         return res.status(400).json({ message: "File is required!" });
//       }
//       // Upload image to Cloudinary
//       const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
//       req.body.imageURL = cloudinaryResponse.secure_url;
//       // Hash the password
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(req.body.password, salt);
//       req.body.password = hashedPassword;
//       // Save user
//       const savedUser = await userModel.create(req.body);
//       // ✅ Send welcome email
//       try {
//         await mailUtil.sendingMail(
//           savedUser.email,
//           "Welcome to MyMechanic platform",
//           `<p>Hello ${savedUser.fullName || "User"}, welcome to the platform!</p>`,
//           "Welcome to MyMechanic!"
//         );
//       } catch (mailErr) {
//         console.error("Email error:", mailErr.message);
//       }
//       const userSafe = savedUser.toObject();
//       delete userSafe.password;
//       res.status(200).json({
//         message: "User registered successfully ✅",
//         data: userSafe
//       });
//     } catch (error) {
//       console.error("Error saving user:", error);
//       res.status(500).json({ message: "Internal Server Error ❌" });
//     }
//   });
// };



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
      if (req.file) {
        const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
        updatedData.imageURL = cloudinaryResponse.secure_url;
      }
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        updatedData,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const userSafe = updatedUser.toObject();
      delete userSafe.password;
      res.status(200).json({
        message: "User updated successfully",
        data: userSafe
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
      const token = jwt.sign(foundUser.toObject(), process.env.JWT_SECRET || "secret");
      const url = `http://localhost:5173/resetpassword/${token}`;
      const mailContent = `<html><a href=${url}>reset password</a></html>`;
      await mailUtil.sendingMail(
        foundUser.email,
        "reset password",
        mailContent
      );
      res.json({
        message: "password reset link send success"
      });
    } else {
      res.status(404).json({
        message: "user not found register first..."
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.body.token;
    const newPassword = req.body.password;
    const userFromToken = jwt.verify(token, process.env.JWT_SECRET || "secret");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const updatedUser = await userModel.findByIdAndUpdate(
      userFromToken._id,
      { password: hashedPassword },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json({
      message: "password updated successfully.."
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get User by User id
const getUserByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId).select("-password");
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
