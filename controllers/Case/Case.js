import User from "../../models/User/User.js";

import Case from "../../models/Case/Case.js";

import { createNewItem } from "../Item/Item.js";



const openGenericCase = async (req, res) => {

    const caseDefaultErrorMessage = { message: "Not Found!" }

    const { userId } = req.body.userData

    const currentUser = await User.findOne({ _id: userId })
    if (!currentUser) return res.status(404).json(caseDefaultErrorMessage) 

    const currentCase = await Case.findOne({name:"Second Generic Case"})
    if (!currentCase) return res.status(404).json(caseDefaultErrorMessage)

    try {

        const sortedIndex = Math.floor(Math.random() * Number(currentCase.content.length))
        const sortedPoke = currentCase.content[sortedIndex]

        const newPokemonItem = await createNewItem(currentUser._id,sortedPoke)

        return res.status(201).json(newPokemonItem)

    } catch (err) {
        return res.status(400).json(caseDefaultErrorMessage)
    }


}

export { openGenericCase }
