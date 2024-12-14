 
 import { User } from "../models/user.model.js";
 import bcryptjs from "bcryptjs"



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
         const salt =await bcryptjs.genSalt(10)
         const hashedPassword = await bcryptjs.hash(password,salt)
        


         // Randomly assign a profile picture
         const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
         const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
 
         // Create new user
         const newUser = new User({
             email,
             password:hashedPassword,
             username,
             image,
         });
         await newUser.save();


         // remove password from the response
         res.status(201).json({ success: true, user:{ ...newUser._doc,password:"" }});

     } catch (err) {
         console.log("Error in signup controller", err.message);
         res.status(500).json({ success: false, message: "Internal server error" });
     }
 }
 



export async function Login(req,res) {
    res.send("Login route")
}

export async function Logout(req,res) {
    res.send("Logout route")
}

 


