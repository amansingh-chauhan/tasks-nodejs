import mongoose from "mongoose";

export const connectDB=()=>{
    //connecting database
mongoose.connect(process.env.MONGO_URI,{
    dbName: "TO-DO",
})
.then((c)=>console.log(`Database connected with ${c.connection.host}`))
.catch((e)=>console.log(e));
};