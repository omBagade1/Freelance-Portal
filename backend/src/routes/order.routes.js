
import express from "express"
import protection from "../middleware/auth.middleware.js"
import allowOnly from "../middleware/role.middleware.js"
import {createOrder,acceptOrder,completeOrder,cancelOrder,getMyOrders} from "../controllers/order.controllers.js"

const orderRouter =  express.Router() 

orderRouter.post("/:id",protection,allowOnly("client"),createOrder) 
orderRouter.put("/:id/accept",protection,allowOnly("freelancer"),acceptOrder)
orderRouter.put("/:id/complete",protection,allowOnly("freelancer"),completeOrder)
orderRouter.put("/:id/cancel",protection,cancelOrder)
orderRouter.get("/",protection,getMyOrders)


export default orderRouter 