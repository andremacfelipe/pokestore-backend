import { config as dotenvConfig } from "dotenv";
dotenvConfig()

import express from "express"
import mongoose from "mongoose"
const app = express()
import cors from "cors"

import registerRouter from "./routes/User/registerRouter.js";
import loginRouter from "./routes/User/loginRouter.js";
import validateSessionRouter from "./routes/User/validateSessionRouter.js";


app.use(cors())

mongoose.set("strictQuery",true)
mongoose.connect(process.env.DB_CONNECTION_URL)
mongoose.connection.once("open",() => console.log("Database Open"))



app.use("/api",registerRouter)
app.use("/api",loginRouter)
app.use("/api",validateSessionRouter)



app.listen(process.env.PORT,() => {
    console.log("Server running on port:",process.env.PORT)
})