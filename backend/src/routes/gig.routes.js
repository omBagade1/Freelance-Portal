import express from "express"
import { createGig,updateGig,deleteGig,getAllGigs,getGigById } from "../controllers/gig.controller.js"
import protection from "../middleware/auth.middleware.js"
import allowOnly from "../middleware/role.middleware.js"

const gigRouter = express.Router() 

gigRouter.post("/",protection,allowOnly("freelancer"),createGig) 
gigRouter.put("/:id",protection,allowOnly("freelancer"),updateGig)
gigRouter.delete("/:id",protection,allowOnly("freelancer"),deleteGig)
gigRouter.get("/",getAllGigs)
gigRouter.get("/:id",getGigById)

export default gigRouter 