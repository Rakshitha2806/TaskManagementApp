import express from "express";
import cors from 'cors';
import "dotenv/config"

import db from "./utils/db.js"
import router from "./routes/taskRoutes.js";

const app = express();
const port = process.env.PORT || 8080

app.use(cors( { origin: process.env.CLIENT_URL || "*"}))

// reading req data
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//set up routes
app.use("/api/v1", router)

//test route
app.get("/",(req,res)=>{
    res.send("Hello")
})

//anything that matched no route
app.use((req,res)=>
    res.status(404).json({success:false, message:"Route not found"})
)

// db();
// app.listen(port,()=>{
//     console.log(`Server running on port ${port}`)
// })

db().then(()=>  app.listen(port,()=>{
    console.log(`Server running on port ${port}`) }) )
    .catch((err) =>{
        console.error("Failed to connect to postgreSQL:", err.message);
        process.exit(1)
    })

