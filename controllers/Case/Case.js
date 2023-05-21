import User from "../../models/User/User.js";

import Case from "../../models/Case/Case.js";

import { createNewItem } from "../Item/Item.js";



const openCase = async (req, res) => {

    const caseDefaultErrorMessage = { message: "Not Found!" }

    const { userId } = req.body.userData
    const caseId = req.query.id

    const currentUser = await User.findOne({ _id: userId })
    if (!currentUser) return res.status(404).json(caseDefaultErrorMessage)

    const currentCase = await Case.findOne({ _id: caseId })
    if (!currentCase) return res.status(404).json({ message: req.params })

    try {

        const sortedIndex = Math.floor(Math.random() * Number(currentCase.content.length))
        const sortedPoke = currentCase.content[sortedIndex]

        const newPokemonItem = await createNewItem(currentUser._id, sortedPoke)
            .then(async (createdItem) => {
                if (!createdItem) {
                    throw Error("Item not created")
                } else {
                    await User.findOneAndUpdate({ _id: createdItem.itemOwner }, { $inc: { credits: - Number(currentCase.price) } })
                }
                currentUser.purchases.push({
                    itemId: createdItem._id,
                    date: Date.now()
                })
                await currentUser.save()
                return createdItem
            }).catch(err => {
                throw Error("")
            })

        return res.status(201).json(newPokemonItem)

    } catch (err) {
        return res.status(400).json(caseDefaultErrorMessage)
    }


}


export { openCase }
