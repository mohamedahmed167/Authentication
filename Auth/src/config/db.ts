import mongoose from "mongoose"
const connectDB =async()=>{
  try{
    await mongoose.connect(process.env.Mongo_URI || "");
    console.log("MonogDB connected")
  }catch(error){
    console.log("MonogDB connetion error",error)
    process.exit(1)    //عشان اوقف العمليه بعدها
  }
}
export default connectDB
