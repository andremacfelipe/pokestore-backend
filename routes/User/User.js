import { Router,json as jsonBodyParser } from "express";
import {marketRouter} from "../Market/Market.js";
import { loginController ,registerController, purchaseMarketItem} from "../../controllers/User/User.js";
import validateSession from "../../controllers/User/validate/validateSession.js";

import { validateUserAction } from "../../middlewares/validate/User/validateUserAction.js";
import { validateUserCredits } from "../../middlewares/validate/Case/validateUserCredits.js";
import { validateCaseId } from "../../middlewares/validate/Case/validateCaseId.js";

import { getAvailableCases,getCase } from "../../controllers/Case/Case.js";

import { purchaseCase,getUserInventory,getItemInfo, } from "../../controllers/User/User.js";


const userRouter = Router()

//Register
userRouter.post("/register",jsonBodyParser(),registerController)


//Login
userRouter.post("/login",jsonBodyParser(),loginController)
userRouter.get("/session/validate",jsonBodyParser(),validateSession)


//Cases
userRouter.get("/case",getAvailableCases)
userRouter.get("/case/:id",getCase)


//Purchase
userRouter.post("/purchase/case",jsonBodyParser(),validateUserAction,validateCaseId,validateUserCredits,purchaseCase)

userRouter.post("/purchase/item/:itemId",jsonBodyParser(),validateUserAction,purchaseMarketItem)

//Profiles
userRouter.get("/profiles/:id/inventory",getUserInventory)

//Item
userRouter.get("/item/:id",getItemInfo)

//Market
userRouter.use(marketRouter)


export {userRouter}