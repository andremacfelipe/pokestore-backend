import { Router, json as jsonBodyParser } from "express";
import { validateSessionController } from "../../controllers/validateSessionController.js";

const validateSessionRouter = Router()

validateSessionRouter.get("/session/validate",jsonBodyParser(),validateSessionController)

export default validateSessionRouter