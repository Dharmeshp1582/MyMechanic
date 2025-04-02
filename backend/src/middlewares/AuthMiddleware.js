const jwt = require("jsonwebtoken");
const secret = "secret";

const authMiddleware = (req,res,next)=>{

  var token = req.headers.authorization;

  if(token){
    if(token.startsWith("Bearer")){
      //remove Bearer //string split 
      //bearer dsbdhisdhsbdnsdhbs // [Bearer,Token]
      token = token.split(" ")[1]
      //token verify..
      try {
        const userFromToken = jwt.verify(token,secret)
        console.log(userFromToken)
        next()
      } catch (error) {
        res.status(500).json({
          message:"Token is not valid..."
        })
      }
    }else{
      res.status(400).json({
        message:"Token is not bearer token"
      })
    }
  }
    else{
      res.status(400).json({
        message:"token is required"
      })
    }
  }


  module.exports = {authMiddleware}