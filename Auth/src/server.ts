import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// middleWare
app.use(express.json());

app.listen(PORT, () => {
  console.log(`server is Running and your Port is ${PORT}`);
});
