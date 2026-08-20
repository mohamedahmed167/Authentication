import { Request ,Response } from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/auth.model.js";
import { bytes } from "node:stream/consumers";
export const RegisterUser =async(req :Request ,res :Response)=>{
   try{
    const {email,password,role}=req.body
    if(!email || !password){
       return res.status(401).json({message:"please enter password or email"})
    }
    const ExistUser =await User.findOne({email})
    if(ExistUser){
      return res.status(400).json({message:"there is User already exist"})
    }
    const hashedPassword =await bcrypt.hash(password,10)
    const newUser= await User.create({
      email,
      password:hashedPassword,
      role:role || "user"
    })
    return res.status(200).json({message:"User created successfully" ,user:newUser})

   }catch(error){
    console.log( "invaild password or email",error)
    return res.status(404).json({message:"internal server error"})

   }
}
export const LoginUser=async(req :Request ,res :Response):Promise<any> =>{
  try{
    const {email,password}=req.body;
    if(!email || !password){
      return res.status(402).json({message:"please provide email or password"})
    }
    const user =await User.findOne({email})
    if(!user){
      return res.status(400).json({message:"invaild email or password"})
    }
    const isPasswordvaild =await bcrypt.compare(password,user.password)
    if(!isPasswordvaild){
      return res.status(400).json({message:"the password dosn't match"})
    }
    const token = jwt.sign({ User_id: user._id },
      process.env.JWT_SECRET ||"gjwgkjkggsgs",
      {expiresIn:"1h"}
    )
    return res.status(200).json({message:"login is successfully",token,user:user})
  }catch(error){
    console.error("error login in user",error);
    return res.status(400).json({message:"there is error in login"})

  }
}
