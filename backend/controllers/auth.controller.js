
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateToken.js";







/////////////////////////signup////////////////////////////////////////////////////////////////////////////////////








export async function Signup(req, res) {

    try {
        const { username, email, password } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }

        // Check if email already exists
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        // Check if username already exists
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }

        // hash a password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // Randomly assign a profile picture
        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        // Create new user
        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image,
        });

        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json
            ({
                success: true,
                user: {
                    ...newUser._doc,
                    password: ""
                },
            });

    } catch (err) {
        console.log("Error in signup controller", err.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}





/////////////////////////login////////////////////////////////////////////////////////////////////////////////////////////////////////








export async function Login(req, res) {
    try {
        const {email,password} = req.body;

        if(!email ||!password) {
            return res.status(400).json({success:false, message:"All fields are required"})
        }

    const user = await User.findOne({email:email})
  if(!user) {
    return res.status(404).json({success:false, message:"Invalid credentials"})
  }
  
  const isPasswordCorrect = await bcryptjs.compare(password,user.password) // compare password of db with password of user
  if (!isPasswordCorrect) {
    return res.status(404).json({success:false, message:"Invalid credentials"})
  }

  generateTokenAndSetCookie(user._id,res)

  res.status(200).json
  ({
      success: true,
      user: {
          ...user._doc,
          password: ""
      },
  });


    } catch (err) {
       console.log("Error in login controller", err.message);
       res.status(500).json({ success: false, message: "Internal server error" });
    }
}






/////////////////////////////logout/////////////////////////////////////////////////////////////////////////////////////////










export async function Logout(req, res) {
    try {
    res.clearCookie("jwt_netflix");
    res.status(200).json({success:true,message:"Logged out successfully"})
    } catch (error) {
    console.log("Error in logout controller",error.message);
    res.status(500).json({success:false,message:"Internal server error"})
    }
}



////////////////////////////authCjheck/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



export async function authCheck(req,res) {
    try {
        console.log("req.user:",req.user);
        res.status(200).json({success: true, user: req.user})
    } catch (error) {
        console.log("Error in authCheck controller", error.message);
        res.status(500).json({sucess: false, message:"internal server error "})
    }
}



