import { Router,json as jsonBodyParser } from "express";
import { loginController ,registerController} from "../../controllers/User/User.js";
import validateSession from "../../controllers/User/validate/validateSession.js";


const userRouter = Router()

//Register
userRouter.post("/register",jsonBodyParser(),registerController)


//Login
userRouter.post("/login",jsonBodyParser(),loginController)
userRouter.get("/session/validate",jsonBodyParser(),validateSession)



export {userRouter}