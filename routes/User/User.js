import { Router,json as jsonBodyParser } from "express";
import { loginController ,registerController} from "../../controllers/User/User.js";

const userRouter = Router()

//Register
userRouter.post("/register",jsonBodyParser(),registerController)



export {userRouter}