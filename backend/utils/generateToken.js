import jwt from "jsonwebtoken";
import {ENV_VARS} from "../config/envVars.js"


export const generateTokenAndSetCookie = (userId,res)=>{
    const token = jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:'15d'}) // decoded token


    res.cookie("jwt_netflix", token,{
        maxAge:15 * 24 * 60 * 60 * 1000, // 15 days in MS
        httpOnly:true, // via browser only to prevent the xss attacks , make it not accessed by JS
        sameSite:"strict", // prevent the attacks
        secure: ENV_VARS.NODE_ENV !== "development"
     });
     return token;
}