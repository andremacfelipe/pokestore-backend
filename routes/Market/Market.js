import { Router, json as jsonBodyParser } from "express";

import { getItemsForSale } from "../../controllers/Market/Market.js";

const marketRouter = Router()

marketRouter.get("/market", getItemsForSale)




export { marketRouter }