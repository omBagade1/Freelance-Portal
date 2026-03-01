import Gig from "../models/gig.model.js";

const createGig = async (req,res,next) => {
    try {
        const reqOb = req.body ;
        
        const gig = await Gig.create({
            title:reqOb.title,
            description:reqOb.description,
            category:reqOb.category,
            price:reqOb.price,
            deliveryDays:reqOb.deliveryDays,
            freelancer:req.user.userId,
            isActive:reqOb.isActive
        })


        res.status(201).json({
            message:"Gig created succesfully",
            Gig:gig
        })

    } catch (error) {
        return next(error)
    }
}

const updateGig = async (req,res,next) => {
    try {
        const reqOb = req.body
        const gigId = req.params.id
        const gig = await Gig.findById(gigId)

        if(!gig){
            const err = new Error("Please enter vaild gig Id")
            err.status = 404
            return next(err)
        }

         if(req.user.userId != gig.freelancer.toString()){
            const err = new Error("Not suitable for this operation")
            err.status = 403
            return next(err)
         }
        
        const updatedGig = await Gig.findByIdAndUpdate(gigId,reqOb,{new:true})

        res.status(200).json({
            message:"Gig updated sucessfully",
            Gig : updatedGig
        })
       
    } catch (error) {
        return next(error)
    }
}


const deleteGig = async (req,res,next) => {
    try {
        const gigId = req.params.id
        const gig = await Gig.findById(gigId)

        if(!gig){
            const err = new Error("Please enter valid gig Id")
            err.status = 404
            return next(err)
        }

         if(req.user.userId != gig.freelancer.toString()){
            const err = new Error("Not suitable for this operation")
            err.status = 403
            return next(err)
         }

         await Gig.findByIdAndDelete(gigId)

           res.status(200).json({
            message:"Gig deleted sucessfully"
           })

    } catch (error) {
        return next(error)
    }
}

const getAllGigs = async (req,res,next) => {
    try {
        const allGigs = await Gig.find({ isActive: true })
        res.status(200).json(allGigs)
    } catch (error) {
        return next(error)
    }
}

const getGigById = async (req,res,next) => {
    try {
        const gigId =req.params.id 
        const gig = await Gig.findById(gigId)
        if(!gig) {
        const err = new Error("Gig not found")
        err.status = 404
        return next(err)
        }
        res.status(200).json(gig)
    } catch (error) {
        return next(error)
    }
}

export { createGig, updateGig, deleteGig, getAllGigs, getGigById }