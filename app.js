import { config as dotenvConfig } from "dotenv";
dotenvConfig()

import express from "express"
import mongoose from "mongoose"
const app = express()
import cors from "cors"

import { userRouter } from "./routes/User/User.js";


import validateSessionRouter from "./routes/User/validateSessionRouter.js";

//dev_scripts_bellow

// import { writePokemonSpeciesOnDb } from "./dev_scripts/writePokemonSpeciesOnDb.js";




app.use(cors())

mongoose.set("strictQuery",true)
mongoose.connect(process.env.DB_CONNECTION_URL)
mongoose.connection.once("open",() => console.log("Database Open"))


app.use("/api",userRouter)
app.use("/api",validateSessionRouter)



app.listen(process.env.PORT,() => {
    console.log("Server running on port:",process.env.PORT)
})
//RUN IT ONLY ONE TIME TO WRITE THE SPECIES ON DATABASE
//DONT USE "npm start" IF THIS CODE ISN'T COMMENTED, USE "node app.js" INSTEAD
// writePokemonSpeciesOnDb() 