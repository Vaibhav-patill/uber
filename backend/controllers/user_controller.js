const bcrypt = require('bcrypt');
const userModel = require("../models/user_model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistTokenModel=require("../models/blacklistToken.model");

registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const isUserExists = await userModel.findOne({ email });
  if (isUserExists) {
    return res.status(400).json({ message: "User with this email already exists" });
  }

  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.createUser({
    firstname:fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

   res.status(201).json({token,user});
};

loginUser=async (req,res,next)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password}=req.body;

  const user = await userModel.findOne({ email }).select("+password");// Select password field to compare later
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

    const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" }); 
  }

  const token = user.generateAuthToken();

  res.cookie('token', token);

  res.status(200).json({ token, user });
}

getUserProfile = async (req, res, next) => {

  res.status(200).json(req.user);
}

logoutUser = async (req, res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await blacklistTokenModel.create({ token });
  res.status(200).json({ message: "Logged out successfully" });
}

module.exports = { registerUser,loginUser,getUserProfile,logoutUser };
