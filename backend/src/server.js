import dotenv from "dotenv"
dotenv.config()

import express from "express" 
import connectDB from "./config/connection.js"
import authRouter from "./routes/auth.routes.js"
import gigRouter from "./routes/gig.routes.js"



//configs
const app = express()
app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/gigs",gigRouter)
connectDB()

//local veriables 
const PORT =  process.env.PORT||5000 


app.get("/health",(req,res)=>{
      res.json({ status: 'ok' })
})

//Global error handling middleware

app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(err.status||500).json({ message: err.message || 'Internal Server Error' })
})

app.listen(PORT,()=>{
      console.log(`Server running on port ${process.env.PORT}`)

})