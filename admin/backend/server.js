import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectToMongoDB from './db/connectToDB.js'
import authRoutes from './routes/authRoutes.js'
import accountRoutes from './routes/accountRoutes.js'
<<<<<<< HEAD
import electionRoutes from './routes/electionRoutes.js'
=======
>>>>>>> origin/main

dotenv.config()
const app=express();
const PORT=process.env.port || 6000
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
      origin: true, // Replace with your frontend origin
      credentials: true, // Allow credentials (cookies)
    }),

  );


app.use("/auth",authRoutes)
app.use("/students",accountRoutes)
<<<<<<< HEAD
app.use("/election",electionRoutes)
=======
>>>>>>> origin/main
app.listen(PORT,'0.0.0.0',async ()=>{
     connectToMongoDB()
    console.log("server running")})