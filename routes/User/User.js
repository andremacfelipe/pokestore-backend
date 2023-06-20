import { Router,json as jsonBodyParser } from "express";
import { loginController ,registerController} from "../../controllers/User/User.js";
import validateSession from "../../controllers/User/validate/validateSession.js";

import { validateUserAction } from "../../middlewares/validate/User/validateUserAction.js";
import { validateUserCredits } from "../../middlewares/validate/Case/validateUserCredits.js";
import { validateCaseId } from "../../middlewares/validate/Case/validateCaseId.js";

import { purchaseCase } from "../../controllers/User/User.js";


const userRouter = Router()

//Register
userRouter.post("/register",jsonBodyParser(),registerController)


//Login
userRouter.post("/login",jsonBodyParser(),loginController)
userRouter.get("/session/validate",jsonBodyParser(),validateSession)



//Purchase
userRouter.post("/purchase/case",jsonBodyParser(),validateUserAction,validateUserCredits,validateCaseId,purchaseCase)



export {userRouter}