import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import artistRoute from "./routes/artists.js";
import eventsRoute from "./routes/events.js";
import bookingRoute from "./routes/booking.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config()
const app = express()

const connect = async()=>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongodb!!")
  } catch (error) {
   throw error
  }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb disconnected")
})
 
app.get("/", (req,res)=>{
    res.send("hello world!!")
})

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/artists", artistRoute)
app.use("/api/events", eventsRoute)
app.use("/api/booking", bookingRoute)

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something is wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})


app.listen(8800, ()=>{
    connect()
    console.log("connected to backend!!")
})

