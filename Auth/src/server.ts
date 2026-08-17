import express from "express";
import dotenv from "dotenv";
import router from "./routes/auth.route.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// middleWare
app.use(express.json());
app.use("/api/auth",router)

app.listen(PORT, () => {
  console.log(`server is Running and your Port is ${PORT}`);
});
