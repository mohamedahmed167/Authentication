import express from "express"
import User from "../models/auth.model.js"


const router =express.Router()
router.post("/register",RegisterUser)
