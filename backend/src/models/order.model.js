import mongoose from "mongoose"

const orderSchema  = new mongoose.Schema({
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true 
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true 
    },
    gig:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Gig",
        required:true 
    },
    price:{
        type:Number,
        required:true
    },
    deliveryDays:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum: ['pending', 'active', 'completed', 'cancelled'], 
        default: 'pending'
    }
},{timestamps:true})


const Order = mongoose.model("Order",orderSchema) 

export default Order 