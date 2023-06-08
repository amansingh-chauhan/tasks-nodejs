import jwt from "jsonwebtoken"
export const sendCookie=(user,res,message,statusCode=200)=>{
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res
      .status(statusCode)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite:process.env.NODE_ENV==="Development"?"lax":"none",
        secure:process.env.NODE_ENV==="Development"?false:true, //this shoud be true at the time of deployment but for production it should be false
      })
      .json({
        success: true,
        message,
      });

};