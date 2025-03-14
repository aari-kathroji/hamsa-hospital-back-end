import mongoose from "mongoose";
import User from "../models/userSchema.js";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app=express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.secretkey);
    req.user = decoded;
    if(decoded.role=="admin"){
      next();
    }else{
      res.status(401).json({ message: "Unauthorized access." });
    }
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

app.post("/register",async(req,res)=>{
  try{
    const user=new User(req.body);
    const emailexists= await User.findOne({email:req.body.email})
    if(emailexists){
      return res.status(409).json({message:"Email already exists"});
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({message:"User registered successfully"});
  }catch(error){
    console.log(error);
    res.status(500).json({message:"User registration failed"});
  }
})

app.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({ email: req.body.email, role: req.body.role });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.secretkey, { expiresIn: "1h" });
            res.status(200).cookie("token", token).json({message:"User logged in successfully", token });
        } else {
            res.status(401).json({message:"Invalid credentials"});
        }
    }catch(error){
        res.status(500).json({message:"User login failed"});
    }
})

app.get("/patients", verifyToken, async (req, res) => {
  try {
    const patients = await User.find({ role:"patient" })
    res.status(200).json({ message: "Patients fetched successfully", patients });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch patients" });
  }
});

export default app;