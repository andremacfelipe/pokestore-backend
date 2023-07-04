import mongoose from "mongoose";
import Item from "../../models/Item/Item.js";
import User from "../../models/User/User.js";


const getItemsForSale = async (req, res) => {

    try {
        const ItemsForSale = await Item.find({ market:{isForSale:true} })
        return res.status(200).json(ItemsForSale)

    } catch (err) {
        return res.status(404).json({ message: "Not Found!"})
    }
}

const purchaseForSaleItem = async (userId,marketItemId) => {
    const session = await mongoose.startSession()
    try {
        
        session.startTransaction()

        const currentCustomer = await User.findById(userId).session(session)
        if (!currentCustomer) throw new Error("User not found")

        const currentItem = await Item.findOne({_id:marketItemId,isForSale:true}).session(session)
        if (!currentItem) throw new Error("Item Not Found!")

        const currentSeller = await User.findById(currentItem.itemOwner).session(session)
        if (!currentSeller) throw new Error(" Seller Not Found!")
        
        if (currentCustomer.credits < Number(currentItem.market.price)) {
            throw new Error("Insuficient credits!")
        } else {
            currentCustomer.credits -= Number(currentItem.market.price)
            currentSeller.credits += Number(currentItem.market.price)
            

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


export { getItemsForSale, purchaseForSaleItem }