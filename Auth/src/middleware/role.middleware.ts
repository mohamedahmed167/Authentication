import { Request ,Response ,NextFunction } from "express";

interface AuthRequset extends Request {
  user?:any
}
export const checkRole =(roles :string[])=>{
  return (req :AuthRequset ,res :Response ,next :NextFunction)=>{
    if(!roles.includes(req.user?.role)){
      return res.status(400).json({message:"Forbidden"})
    }
    next()
  }
}
