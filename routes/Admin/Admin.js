import { Router, json as jsonBodyParser } from "express";

import { validateUserAction } from "../../middlewares/validate/User/validateUserAction.js";

import validateAdminAction from "../../middlewares/validate/Admin/validateAdminAction.js";
import { getAllUsers } from "../../controllers/Admin/Admin.js";

import CaseRouter from "../Case/Case.js";

// import { getAvailablePokemonSpecies, createNewGenericCase } from "../../controllers/Case/Case.js";

const AdminRouter = Router()

AdminRouter.use(jsonBodyParser(),validateUserAction,validateAdminAction)

AdminRouter.get("/users",getAllUsers)

//Cases
AdminRouter.use(CaseRouter)

export default AdminRouter

