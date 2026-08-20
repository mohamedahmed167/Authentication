import express from "express";
import dotenv from "dotenv";
import router from "./routes/auth.route.js";
import connectDB from "./config/db.js";
dotenv.config();
console.log("Mongo URI:", process.env.Mongo_URI);
console.log("PORT:", process.env.PORT);
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

// middleWare
app.use(express.json());
app.use("/api/auth",router)
app.get("/",(req,res)=>{
  res.send("hello world")
})

app.listen(PORT, () => {
  console.log(`server is Running and your Port is ${PORT}`);
});
