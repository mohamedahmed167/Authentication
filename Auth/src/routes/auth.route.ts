import express from "express";
import User from "../models/auth.model.js";
import { RegisterUser, LoginUser, getUser } from "../controllers/auth.controller.js";
import { verifyToken ,AuthRequset} from "../middleware/auth.middleware.js";
import { checkRole } from "../middleware/role.middleware.js";

const router = express.Router();
router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/protected", verifyToken, (req, res) => {
  return res.json({ message: "protected user", user: (req as AuthRequset).user });
});

router.get("/admin",verifyToken,checkRole(["admin"]),(req,res)=>{
  return res.json({message:"admin route hello"})
})

router.get("/me",verifyToken,getUser)
export default router;
