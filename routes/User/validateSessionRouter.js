import { Router, json as jsonBodyParser } from "express";
import { validateSessionController } from "../../controllers/User/validateSessionController.js";

const validateSessionRouter = Router()

validateSessionRouter.get("/session/validate",jsonBodyParser(),validateSessionController)

export default validateSessionRouter