import { Router, json as jsonBodyParser } from "express";
import { validateUserAction } from "../../middlewares/validate/User/validateUserAction.js";
import { getItemsForSale, sellItemInTheMarket,getMarketListings } from "../../controllers/Market/Market.js";

const marketRouter = Router()

marketRouter.get("/market", getMarketListings)
marketRouter.post("/market/sell/:itemId",jsonBodyParser(),validateUserAction, sellItemInTheMarket)




export { marketRouter }