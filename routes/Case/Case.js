// caseRouter must be used only on AdminRouter.js

import { Router, json as jsonBodyParser } from "express";

import { getAvailablePokemonSpecies, createNewGenericCase } from "../../controllers/Case/Case.js";

const CaseRouter = Router()

CaseRouter.use(jsonBodyParser())

CaseRouter.get("/cases/pokemon/species",getAvailablePokemonSpecies)
CaseRouter.post("/cases/new/generic",createNewGenericCase)




export default CaseRouter 

