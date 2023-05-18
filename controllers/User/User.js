import User from "../../models/User/User.js"
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { validateRegisterInputs, validateLoginInputs } from "./validate/validateAuthInputs.js"



const registerController = async (req, res) => {

    const { error } = validateRegisterInputs(req.body)

    if (error) return res.status(400).json(error.details)

    const currentUserEmail = await User.findOne({ email: req.body.email })
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


const loginController = async (req, res) => {

    const defaultLoginErrorMessage = { message: "Email or password incorrect" }
    const { error } = validateLoginInputs(req.body)

    if (error) return res.status(400).json(defaultLoginErrorMessage)

    const currentUser = await User.findOne({ email: req.body.email })

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
                expiresIn: 60
            })

        return res.json({ USER_TOKEN: token })
    } else {
        return res.status(400).json(defaultLoginErrorMessage)
    }
}




export { registerController, loginController }
