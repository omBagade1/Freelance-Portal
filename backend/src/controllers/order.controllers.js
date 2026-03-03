import Gig from "../models/gig.model.js"
import Order from "../models/order.model.js"

const createOrder = async(req,res,next) => {
    try {
        const gigId = req.params.id
        const gig = await Gig.findById(gigId)
               if(!gig) {
               const err = new Error("Gig not found")
               err.status = 404
               return next(err)
               }
        
        if(gig.freelancer.toString() === req.user.userId) {
            const err = new Error("You cannot order your own gig")
            err.status = 403
            return next(err)
        }

        const order = await Order.create({
            buyer:req.user.userId,
            seller:gig.freelancer,
            gig:gig._id,
            price:gig.price,
            deliveryDays:gig.deliveryDays,
            status:"pending"
        })

        res.status(201).json({
            message:"Order placed succesfully waiting for sellers approval",
            order
        })

    } catch (error) {
        return next(error)
    }
}

const acceptOrder = async (req,res,next) => {
     try {
        const orderId = req.params.id
        const order = await Order.findById(orderId)
        if(!order){
            const err = new Error("Please enter vaild order Id")
            err.status = 404
            return next(err)
        }

        if(req.user.userId !== order.seller.toString()){
           const err = new Error("Not suitable for this operation")
           err.status = 403
           return next(err)
        }

        if(order.status !== "pending") {
            const err = new Error("Order cannot be accepted at this stage")
            err.status = 400
            return next(err)
        }

        const updatedOrder = await Order.findByIdAndUpdate(orderId,{status:"active"},{new:true})

        res.status(200).json({
            message:"Order accepted sucessfully",
            order:updatedOrder
        })


     } catch (error) {
        return next(error)
     }    
}

const completeOrder = async (req,res,next) => {
     try {
        const orderId = req.params.id
        const order = await Order.findById(orderId)
        if(!order){
            const err = new Error("Please enter vaild order Id")
            err.status = 404
            return next(err)
        }

        if(req.user.userId !== order.seller.toString()){
           const err = new Error("Not suitable for this operation")
           err.status = 403
           return next(err)
        }

        if(order.status !== "active") {
            const err = new Error("Order cannot be completed at this stage")
            err.status = 400
            return next(err)
        }

        const updatedOrder = await Order.findByIdAndUpdate(orderId,{status:"completed"},{new:true})

        res.status(200).json({
            message:"Order completed sucessfully",
            order:updatedOrder
        })

     } catch (error) {
        return next(error)
     }
}

const cancelOrder = async (req,res,next) => {
     try {
        const orderId = req.params.id
        const order = await Order.findById(orderId)
        if(!order){
            const err = new Error("Please enter vaild order Id")
            err.status = 404
            return next(err)
        }

        if(req.user.userId !== order.seller.toString() && req.user.userId !== order.buyer.toString()){
           const err = new Error("Not suitable for this operation")
           err.status = 403
           return next(err)
        }

        if(order.status !== "active" && order.status !== "pending") {
            const err = new Error("Order cannot be cancelled at this stage")
            err.status = 400
            return next(err)
        }

        const updatedOrder = await Order.findByIdAndUpdate(orderId,{status:"cancelled"},{new:true})

        res.status(200).json({
            message:"Order cancalled sucessfully",
            order:updatedOrder
        })
     } catch (error) {
        return next(error)
     }
}

const getMyOrders = async (req,res,next) => {
     try {
        const orders = 
        await Order.find({
            $or: [{ buyer: req.user.userId }, { seller: req.user.userId }]
        })

        if(orders.length == 0){
            const err = new Error("No orders scheduled")
            err.status = 404 
            return next(err)
        }
        
        res.status(200).json({
            message:"Here's your Orders" ,
            orders
        })

     } catch (error) {
        return next(error)
     }
}

export {createOrder,acceptOrder,completeOrder,cancelOrder,getMyOrders}