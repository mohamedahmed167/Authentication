import { Request ,Response ,NextFunction ,RequestHandler} from "express";
import  jwt  from "jsonwebtoken";

 export interface AuthRequset extends Request {
  user?:any
} //لو التوكن صح هنضيف بيانات اليوزر
export const verifyToken :RequestHandler =(req ,res  , next) =>{
  const authHeader =req.headers.authorization;
  if(!authHeader ||!authHeader.startsWith("Bearer ")){
    return res.status(401).json({message:"Unauthorized"})
  }
const token =authHeader?.split(' ')[1] as string;

try{
const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
(req as AuthRequset).user =decoded
next()
}catch(error){
  console.error("token verification error",error)
  return res.status(400).json({message:"Forbidden"})
}
}
