import { Router, json as jsonBodyParser } from "express";
import { validateUserAction } from "../../middlewares/validate/User/validateUserAction.js";
import { getItemsForSale, sellItemInTheMarket } from "../../controllers/Market/Market.js";

const marketRouter = Router()

marketRouter.get("/market", getItemsForSale)
marketRouter.post("/market/sell/:itemId",jsonBodyParser(),validateUserAction, sellItemInTheMarket)




export { marketRouter }