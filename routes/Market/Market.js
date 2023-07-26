import { Router, json, json as jsonBodyParser } from "express";
import { validateUserAction } from "../../middlewares/validate/User/validateUserAction.js";
import {sellItemInTheMarket,getMarketListings,getItemListings,removeMarketListing } from "../../controllers/Market/Market.js";

const marketRouter = Router()

marketRouter.get("/market", getMarketListings)
marketRouter.get("/market/item/:name",getItemListings)
marketRouter.post("/market/sell/:itemId",jsonBodyParser(),validateUserAction, sellItemInTheMarket)
marketRouter.post("/market/remove/:itemId",jsonBodyParser(),validateUserAction,removeMarketListing)




export { marketRouter }