import { Router,json as jsonBodyParser } from "express";
import { loginController } from "../../controllers/User/User.js";

const loginRouter = Router()

loginRouter.post("/login",jsonBodyParser(),loginController)

export default loginRouter