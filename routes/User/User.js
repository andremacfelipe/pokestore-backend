import { Router,json as jsonBodyParser } from "express";
import { loginController ,registerController} from "../../controllers/User/User.js";
import validateSession from "../../controllers/User/validate/validateSession.js";

import { validateUserAction } from "../../middlewares/validate/User/validateUserAction.js";
import { validateUserCredits } from "../../middlewares/validate/Case/validateUserCredits.js";
//
import { openCase } from "../../controllers/Case/Case.js";


const userRouter = Router()

//Register
userRouter.post("/register",jsonBodyParser(),registerController)


//Login
userRouter.post("/login",jsonBodyParser(),loginController)
userRouter.get("/session/validate",jsonBodyParser(),validateSession)



//Purchase

userRouter.post("/purchase/case",jsonBodyParser(),validateUserAction,validateUserCredits,openCase)



export {userRouter}