import User from "../../models/User/User.js"
import Pokemon from "../../models/Pokemon/Pokemon.js"
import Item from "../../models/Item/Item.js"

import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { validateRegisterInputs, validateLoginInputs } from "./validate/validateAuthInputs.js"

import { openCase } from "../Case/Case.js"
import { purchaseForSaleItem } from "../Market/Market.js"


const registerController = async (req, res) => {

    const { error } = validateRegisterInputs(req.body)

    if (error) return res.status(400).json(error.details)

    const currentUserEmail = await User.findOne({ email: req.body.email.toLowerCase() })
    const currentUserName = await User.findOne({ username: req.body.username })

    if (currentUserName) {
        return res.status(400).json({ message: "Username unavailable", path: "username" })
    } else if (currentUserEmail) {
        return res.status(400).json({ message: "Email already in use", path: "email" })
    }
    else {
        try {
            const user = new User({
                username: req.body.username,
                email: req.body.email.toLowerCase(),
                password: bcryptjs.hashSync(req.body.password)
            })
            await user.save()
            res.status(200).json({ message: "User successfully created" })



        } catch (err) {
            res.status(400).json({ message: "An error occurred" })
        }
    }



}


const loginController = async (req, res) => {

    const defaultLoginErrorMessage = { message: "Email or password incorrect" }
    const { error } = validateLoginInputs(req.body)

    if (error) return res.status(400).json(defaultLoginErrorMessage)

    const currentUser = await User.findOne({ email: req.body.email.toLowerCase() })

    if (!currentUser) return res.status(400).json(defaultLoginErrorMessage)

    if (bcryptjs.compareSync(req.body.password, currentUser.password)) {
        const token = await jsonwebtoken.sign({
            userEmail: currentUser.email,
            username: currentUser.username,
            userId: currentUser._id
        },
            process.env.TOKEN_PRIVATE_KEY,

            {
                algorithm: "HS512",
                expiresIn: 60 * 10
            })

        return res.json({ USER_TOKEN: token })
    } else {
        return res.status(400).json(defaultLoginErrorMessage)
    }
}

const purchaseCase = async (req, res) => {
    const { userId } = req.body.userData
    const caseId = req.query.id

    try {
        const sortedItem = await openCase(userId, caseId)
        const matchItem = await Pokemon.findById(sortedItem.itemTypeCode)

        return res.status(201).json({
            item: sortedItem,
            match: matchItem

        })
    } catch (err) {
        return res.status(400).json(err.message)
    }
}



const getUserInventory = async (req, res) => {
    const userId = req.params.id

    try {
        const userInventory = await Item.find({ itemOwner: userId })

        return res.status(200).json(userInventory)



    } catch (err) {
        return res.status(404).json({ message: "Not found!" })
    }
}

const getItemInfo = async (req, res) => {
    const itemId = req.params.id

    try {
        const currentItem = await Item.findById(itemId)
        if (!currentItem) throw new Error("Not Found!")

        if (currentItem.itemType === "Pokemon") {
            const itemInfo = await Pokemon.findOne({ pokemonName: currentItem.itemName })
            return res.status(200).json({
                currentItem,
                itemInfo
            })
        }

    } catch (err) {
        return res.status(404).json({ message: "Not found!" })
    }
}


const purchaseMarketItem = async (req,res) => {
    const {userId} =  req.body.userData
    const itemId = req.params.itemId 

    try {
        
        const purchasedItem = await purchaseForSaleItem(userId,itemId)
        return res.status(200).json({
            message:"Success!",
            item:purchasedItem
        })


    } catch (err) {
        return res.status(400).json({message:err.message})
    }


}



export { registerController, loginController, purchaseCase, getUserInventory, getItemInfo,purchaseMarketItem }
