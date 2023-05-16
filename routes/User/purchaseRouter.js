import { Router, json as jsonBodyParser } from "express"
import { validateUserAction } from "../../middlewares/User/validateUserAction.js"

import { generateRandomPokemon } from "../../services/Items/generateRandomPokemon.js"


const purchaseRouter = Router()

purchaseRouter.post("/purchase",jsonBodyParser(),validateUserAction,generateRandomPokemon)


export {purchaseRouter}