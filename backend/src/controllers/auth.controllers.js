import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"


//user registeration

const register = async (req,res,next) => {
  try {
    const {name,email,password,role} = req.body
    const existing = await User.findOne({email})
    if(existing){
        const err = new Error("Email already in use")
        err.status = 400 ;
        return next(err)
    }

    //pasword hashing 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //user creation 
    const user = await User.create({
         name,
         email,
         password : hashedPassword,
         role
    })

    //JWT allocation

    const token = jwt.sign(
        {
            userId : user._id,
            role : user.role
        },
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    )

     res.status(201).json({
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }
     })
  } catch (err) {
     next(err)
  }   
}



//user logIn

const logIn = async (req,res,next) => {
    try {
        const {email,password} = req.body 
        const user = await User.findOne({email})

        if(!user){
            const err = new Error("User is not registered")
            err.status = 401
            return next(err)
        }

        const isValid = await bcrypt.compare(password,user.password)
        if(!isValid){
            const err = new Error("Invalid password")
            err.status = 401
            return next(err)
        }
        const token = jwt.sign({ userId: user._id, role: user.role },process.env.JWT_SECRET,{expiresIn:"7d"})
        res.status(200).json({
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        }
       })

    } catch (err) {
        next(err)
    }
}

export {register,logIn}