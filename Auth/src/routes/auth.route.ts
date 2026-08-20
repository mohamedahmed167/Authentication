import express from "express";
import User from "../models/auth.model.js";
import { RegisterUser, LoginUser } from "../controllers/auth.controller.js";
import { verifyToken ,AuthRequset} from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/protected", verifyToken, (req, res) => {
  return res.json({ message: "protected user", user: (req as AuthRequset).user });
});
export default router;
