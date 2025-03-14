import mongoose from "mongoose";
import User from "../models/userSchema.js";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import express from "express";
const app=express.Router();


app.post("/register",async(req,res)=>{
  try{
    const user=new User(req.body);
    const emailexists= await User.findOne({email:{$eq:req.body.email}})
    if(emailexists){
      return res.status(409).json({message:"Email already exists"});
    }
    await user.save();
    res.status(200).json({message:"User registered successfully"});
  }catch(error){
    console.log(error);
    res.status(500).json({message:"User registration failed"});
  }
})

app.post("/login",async(req,res)=>{
    console.log(req.body)
    try{
        const user=await User.findOne({email:{$eq:req.body.email},password:{$eq:req.body.password},role:{$eq:req.body.role}})
        console.log(user)
        if(user){
            res.status(200).json({message:"User logged in successfully"});
        }else{
            res.status(401).json({message:"Invalid credentials"});
        }
    }catch(error){
        res.status(500).json({message:"User login failed"});
    }
})

app.get("/patients", async (req, res) => {
  try {
    const patients = await User.find({ role:{$eq:"patient"} })
    res.status(200).json({ message: "Patients fetched successfully",patients });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to fetch patients" });
  }
});

export default app;