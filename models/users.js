import mongoose from "mongoose";

//defining database schema
const schema = new mongoose.Schema({
  name:{
    type: String,
    required:true,
  },
  email: {
    type: String,
    unique: true,
    required:true,
  },
  password: {
    required:true,
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});
//defining database model
export const User = mongoose.model("User", schema);
