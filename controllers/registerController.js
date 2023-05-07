import User from "../models/User/User.js"
import bcryptjs from "bcryptjs"
import Joi from "joi"



const registerController = async (req, res) => {

    const { error } = validateRegisterInputs(req.body)

    if (error) return res.status(400).json(error.details)

    const currentUserEmail = await User.findOne({ email: req.body.email })
    const currentUserName = await User.findOne({ username: req.body.username })

    if (currentUserName) {
        return res.status(400).json({ message: "Username unavailable", path:"username" })
    } else if (currentUserEmail) {
        return res.status(400).json({ message: "Email already in use", path:"email" })
    }
    else {
        try {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password)
            })
            await user.save()
            res.status(200).json({ message: "User successfully created" })



        } catch (err) {
            res.status(400).json({ message: "An error occurred" })
        }
    }



}






const validateRegisterInputs = (data) => {
    const Schema = Joi.object({
        username: Joi.string().required().min(2).max(500),
        email: Joi.string().required().min(5).max(200),
        password: Joi.string().required().min(8)
    })
    return Schema.validate(data)
}

export default registerController
