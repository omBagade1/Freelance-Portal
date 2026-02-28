import express from "express";
import { register,logIn } from "../controllers/auth.controllers.js";

const router = express.Router() 

router.post("/register",register)
router.post("/logIn",logIn)

export default router