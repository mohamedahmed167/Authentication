import { Request ,Response } from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/auth.model.js";
const RegisterUser =async(req :Request ,res :Response)=>{
   try{
    const {email,password}=req.body
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
      password:hashedPassword
    })
    return res.status(200).json({message:"User created successfully" ,user:newUser})

   }catch(error){
    console.log( "invaild password or email",error)
    return res.status(404).json({message:"internal server error"})

   }
}
export default RegisterUser
