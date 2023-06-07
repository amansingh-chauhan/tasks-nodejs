import { User } from "../models/users.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utility/features.js";

// ***********Registration*******************
export const register = async (req, res) => {
  const {name,email,password} = req.body;

  let user = await User.findOne({ email }); //finding user by email

  if (user)
   return res.status(404).json({
      success: false,
      message: "User already exists",
    });

  const hashedPassword = await bcrypt.hash(password,10); //hashing password
  user = await User.create({ name, email, password: hashedPassword }); //creating user

  sendCookie(user,res,"Registered Successfully",201);

};

// ***********************Login*********************
export const login = async (req, res) => {

  const {email,password}=req.body;

  const user= await User.findOne({email}).select("+password");
  if(!user)
  return res.status(404).json({
    success:false,
    message:"Invalid Email or Password",
  })

  const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch)
  return res.status(404).json({
    success:false,
    message:"Invalid Email or Password",
  })
  sendCookie(user,res,`Welcome back,${user.name}`,200);
};

// **********************Get profile data by cookie***********************
export const getMyProfile = (req, res) => { 
  res.status(200).json({
    success:true,
    user:req.user,
  })

};
//*************************** Logout **************************
export const logout = async (req, res) => {
  res.status(200).cookie("token","",{expires:new Date(Date.now())}).json({
    success:true,
    user:req.user,
  })
};


