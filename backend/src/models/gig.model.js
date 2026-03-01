import mongoose from "mongoose";

const gigSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
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
    freelancer:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isActive:{
       type:Boolean,
       default:true,
       required:true
    }
},{timestamps:true})


const Gig = mongoose.model("Gig",gigSchema) 

export default Gig 