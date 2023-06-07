import mongoose from "mongoose";

export const connectDB=()=>{
    //connecting database
mongoose.connect(process.env.MONGO_URI,{
    dbName: "TO-DO",

})
.then(()=>console.log("Database connected"))
.catch((e)=>console.log(e));
};