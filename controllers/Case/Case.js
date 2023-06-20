import mongoose from "mongoose";

import User from "../../models/User/User.js";
import Case from "../../models/Case/Case.js";
import Item from "../../models/Item/Item.js";
import Pokemon from "../../models/Pokemon/Pokemon.js";

const openCase = async (userId, caseId) => {
    const session = await mongoose.startSession()
    try {

        session.startTransaction()

        const currentUser = await User.findOne({ _id: userId }).session(session)
        if (!currentUser) throw new Error("User not found")

        const currentCase = await Case.findOne({ _id: caseId }).session(session)
        if (!currentCase) throw new Error("Case not found")


        //Sort a random pokemon
        const sortedIndex = Math.floor(Math.random() * Number(currentCase.content.length))
        const sortedPoke = currentCase.content[sortedIndex]



        // Create the new item in the db
        const Species = await Pokemon.findOne({pokemonName:sortedPoke})
        const item = new Item({
            itemType: "Pokemon",
            itemTypeCode: Species._id,
            itemName: Species.pokemonName,
            itemPic: Species.pokemonPicSrc,
            itemOwner: currentUser._id,
            ownerHistory:[currentUser._id]
        })
        const createdItem = await item.save()
        
        //Discount user credits
        currentUser.credits -= Number(currentCase.price)
        await currentUser.save()
        
        //Add the new purchase to the currentUser
        currentUser.purchases.push({
            itemId:item._id,
            date:Date.now()
        })
        await currentUser.save()

        //Comit the transaction
        await session.commitTransaction()
        return createdItem

    } catch (err) {
        await session.abortTransaction()
        throw new Error(err.message)

    } finally {
        session.endSession()
    }
}


export { openCase }
