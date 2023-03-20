import { config as dotenvConfig } from "dotenv";
dotenvConfig()

import express from "express"
import mongoose from "mongoose"
const app = express()
import cors from "cors"

import registerRouter from "./routes/registerRouter.js";


app.use(cors())

mongoose.set("strictQuery",true)
mongoose.connect(process.env.DB_CONNECTION_URL)
mongoose.connection.once("open",() => console.log("Database Open"))



app.use("/api",registerRouter)



app.listen(process.env.PORT,() => {
    console.log("Server running on port:",process.env.PORT)
})