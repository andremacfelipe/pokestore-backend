import { Router,json as jsonBodyParser } from "express";
import registerController from "../../controllers/User/registerController.js";


const registerRouter = Router()

registerRouter.post("/register",jsonBodyParser(),registerController)



export default registerRouter