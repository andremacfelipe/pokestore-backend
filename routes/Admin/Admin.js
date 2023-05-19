import { Router, json as jsonBodyParser } from "express";

import { validateUserAction } from "../../middlewares/validate/User/validateUserAction.js";

import validateAdminAction from "../../middlewares/validate/Admin/validateAdminAction.js";
import { getAllUsers } from "../../controllers/Admin/Admin.js";

const AdminRouter = Router()

AdminRouter.use(jsonBodyParser(),validateUserAction,validateAdminAction)

AdminRouter.get("/users",getAllUsers)

export default AdminRouter

