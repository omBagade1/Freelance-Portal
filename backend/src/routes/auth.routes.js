import express from "express";
import { register,logIn } from "../controllers/auth.controllers.js";

const authRouter = express.Router() 

authRouter.post("/register",register)
authRouter.post("/logIn",logIn)

export default authRouter