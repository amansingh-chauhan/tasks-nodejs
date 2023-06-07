import express from "express";

import userRouter from "./routes/users.js";
import taskRouter from "./routes/task.js";

import { config } from "dotenv";
import cookieParser from "cookie-parser";

export const app = express();

config({
    path:"./utility/config.env"
})
//using middleware
app.use(express.json()); // use before using route otherwise it will give error
app.use(cookieParser());
//using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);


app.get("/", (req, res) => {
  res.send("nice working");
});
