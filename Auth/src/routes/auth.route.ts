import express from "express"
import User from "../models/auth.model.js"
import {RegisterUser} from "../controllers/auth.controller.js"

const router =express.Router()
router.post("/register",RegisterUser)
// router.post("/login",LoginUser)
export default router
