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
        const Species = await Pokemon.findOne({ pokemonName: sortedPoke })
        const item = new Item({
            itemType: "Pokemon",
            itemTypeCode: Species._id,
            itemName: Species.pokemonName,
            itemPic: Species.pokemonPicSrc,
            itemOwner: currentUser._id,
            ownerHistory: [currentUser._id]
        })
        const createdItem = await item.save()

        //Discount user credits
        currentUser.credits -= Number(currentCase.price)
        await currentUser.save()

        //Add the new purchase to the currentUser
        currentUser.purchases.push({
            itemId: item._id,
            date: Date.now()
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


const getAvailableCases = async (req, res) => {
    const cases = await Case.find()
    const caseList = cases.map((item) => {
        return {
            id: item._id,
            name: item.name,
            price: item.price,
            image:item.image,
            content: item.content
        }
    })
    return res.status(200).json(caseList)

}

const getCase = async (req, res) => {

    const caseId = req.params.id

    try {
        const currentCase = await Case.findById(caseId)

        if (!currentCase) {
            throw new Error("Not Found!")
        } else {
            return res.status(200).json({
                id: currentCase.id,
                name: currentCase.name,
                price: currentCase.price,
                image:currentCase.image,
                content: currentCase.content
            })
        }
    } catch (err) {
        return res.status(404).json({ message: "Not found!" })
    }

}


export { openCase, getAvailableCases, getCase }
