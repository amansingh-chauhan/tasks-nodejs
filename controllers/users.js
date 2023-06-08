import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utility/features.js";
import ErrorHandler from "../middlewares/error.js";

// ***********Registration*******************
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email }); //finding user by email

    if (user) return next(new ErrorHandler("User already exist", 404));

    const hashedPassword = await bcrypt.hash(password, 10); //hashing password
    user = await User.create({ name, email, password: hashedPassword }); //creating user

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
   // next(error);
  }
};

// ***********************Login*********************
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid Email Or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return next(new ErrorHandler("Invalid Email Or Password", 400));
    sendCookie(user, res, `Welcome back,${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

// **********************Get profile data by cookie***********************
export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
//*************************** Logout **************************
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()),
      sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
      secure:process.env.NODE_ENV==="Development"?false:true, })
    .json({
      success: true,
      user: req.user,
    });
};
