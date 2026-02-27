import express from "express" 
import dotenv from "dotenv"
import connectDB from "./config/connection.js"


//configs
dotenv.config()
const app = express()
connectDB()

//local veriables 
const PORT = 5000 || process.env.PORT

app.use(express.json())

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