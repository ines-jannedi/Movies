import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";


export const protectRoute = async (req,res,next) =>{
    try {
        const token = req.cookies ["jwt_netflix"]
        if(!token) {
            return res.status(401).json({success: false, message: "Unauthorize - No token Provided"})
        }

        const decoded = jwt.verify(token,ENV_VARS.JWT_SECRET);
        if(!decoded) {
        return res.status(401).json({success: false, message: "Unauthorize - Invalid token "})
        }


       const user = await User.findById(decoded.userId).select("-password"); // select and remove the password
       if(!user) {
        return res.status(404).json({success:false,message:"User not found"})
       }

       req.user = user; // we could know that user is authenticated

    next() // once everything is done successfully w can call the next function 
    } catch (err) {
    console.log("Error in protectRoute middleware", err.message);
    res.status(500).json({success:false, message:"Internal Server Error"})
    
    }
}


