import express from "express";
import { User } from "../models/users.js";

import {
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

//creating router
const router = express.Router();


//creating or adding users to database
router.post("/new", register);
router.post("/login", login);
router.get("/me",isAuthenticated,getMyProfile);
router.get("/logout", logout);


export default router;
