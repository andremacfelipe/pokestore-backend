import mongoose from "mongoose";
import Item from "../../models/Item/Item.js";
import User from "../../models/User/User.js";


const getItemsListings = (itemsForSale) => {
    const nameObj = {}
    itemsForSale.forEach(item => {
        const itemName = item.itemName
        nameObj[itemName] = []

    })
    itemsForSale.forEach(item => {
        const itemName = item.itemName
        nameObj[itemName].push(item)
    })
    return nameObj
}

const filterItemsByLowestPrice = (itemsArr) => {
    const lowestPriceObj = { ...itemsArr }

    Object.keys(lowestPriceObj).forEach((itemName) => {
        itemsArr[itemName].sort((a, b) => a.market.price - b.market.price)
    })
    return lowestPriceObj
}

const getItemsForSale = async (req, res) => {

    try {
        const ItemsForSale = await Item.find({ "market.isForSale": true })
        const rawItems = getItemsListings(ItemsForSale)
        const lowestPriceOrderedItems = filterItemsByLowestPrice(rawItems)
        return res.status(200).json(lowestPriceOrderedItems)
    } catch (err) {
        return res.status(404).json({ message: "Not Found!" })
    }
}


const marketListingsCleanup = (lowestPriceOrderedItems) => {
    const filteredData = []
    Object.keys(lowestPriceOrderedItems).forEach((itemName) => {
        filteredData.push({
            itemName: lowestPriceOrderedItems[itemName][0].itemName,
            itemPic: lowestPriceOrderedItems[itemName][0].itemPic,
            price: lowestPriceOrderedItems[itemName][0].market.price,
            amount: lowestPriceOrderedItems[itemName].length,
        })
    })

    return filteredData


}

const getMarketListings = async (req, res) => {

    try {
        const ItemsForSale = await Item.find({ "market.isForSale": true })
        const rawItems = getItemsListings(ItemsForSale)
        const lowestPriceOrderedItems = filterItemsByLowestPrice(rawItems)
        const marketListings = marketListingsCleanup(lowestPriceOrderedItems)
        return res.status(200).json(marketListings)
    } catch (err) {
        return res.status(404).json({ message: "Not Found!" })
    }
}





const marketTransaction = async (userId, marketItemId) => {
    const session = await mongoose.startSession()
    try {

        session.startTransaction()

        const currentCustomer = await User.findById(userId).session(session)
        if (!currentCustomer) throw new Error("User not found")

        const currentItem = await Item.findOne({ _id: marketItemId, isForSale: true }).session(session)
        if (!currentItem) throw new Error("Item Not Found!")

        const currentSeller = await User.findById(currentItem.itemOwner).session(session)
        if (!currentSeller) throw new Error(" Seller Not Found!")

        if (currentCustomer.credits < Number(currentItem.market.price)) {
            throw new Error("Insuficient credits!")
        } else {
            currentCustomer.credits -= Number(currentItem.market.price)
            currentSeller.credits += Number(currentItem.market.price)

            currentCustomer.purchases.market.push({
                seller: currentSeller._id,
                buyer: currentCustomer._id,
                item: currentItem._id,
                price: currentItem.market.price
            })
            currentSeller.purchases.market.push({
                seller: currentSeller._id,
                buyer: currentCustomer._id,
                item: currentItem._id,
                price: currentItem.market.price
            })


            currentItem.itemOwner = currentCustomer._id
            currentItem.ownerHistory.push(currentCustomer._id)
            currentItem.market.isForSale = false
            currentItem.market.price = 0




            await currentItem.save()
            await currentCustomer.save()
            await currentSeller.save()

            await session.commitTransaction()
            return currentItem

        }


    } catch (err) {
        await session.abortTransaction()
        throw new Error(err.message)
        // throw new Error("Not Found!")
    } finally {
        session.endSession()
    }
}
const sellItemInTheMarket = async (req, res) => {
    const { userId } = req.body.userData
    const sellPrice = req.body.sellPrice
    const itemId = req.params.itemId

    try {
        const currentUser = await User.findById(userId)
        const currentItem = await Item.findById(itemId)

        if (currentUser._id != currentItem.itemOwner) {
            return res.status(400).json({ message: "Unauthorized" })
        } else {
            currentItem.market.isForSale = true
            currentItem.market.price = sellPrice

            await currentItem.save()

            return res.status(200).json({
                message: "Success!",
                item: currentItem
            })

        }



    } catch (err) {
        return res.status(400).json({ message: "An error occurred" })
    }
}

export { getItemsForSale, getMarketListings, marketTransaction, sellItemInTheMarket }