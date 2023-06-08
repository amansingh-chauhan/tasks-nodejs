import express from "express";

import userRouter from "./routes/users.js";
import taskRouter from "./routes/task.js";

import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

//server deployment package
import cors from "cors";

export const app = express();

config({
    path:"./utility/config.env"
})
//using middleware
app.use(express.json()); // use before using route otherwise it will give error
app.use(cookieParser());
app.use(cors({
  origin:[process.env.FRONTEND_URL],
  methods:["GET","POST","PUT","DELETE"],
  credentials:true,
}));

//using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);


app.get("/", (req, res) => {
  res.send("nice working");
});

//creating error middleware
app.use(errorMiddleware);
