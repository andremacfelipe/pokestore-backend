import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import Joi from "joi"
import User from "../../models/User/User.js"


const loginController = async (req,res) => {

    const defaultLoginErrorMessage = {message:"Email or password incorrect"}
    const {error} = validateLoginInputs(req.body)

    if (error) return res.status(400).json(defaultLoginErrorMessage)

    const currentUser = await User.findOne({email:req.body.email})

    if (!currentUser) return res.status(400).json(defaultLoginErrorMessage)

    if(bcryptjs.compareSync(req.body.password,currentUser.password)){
        const token = await jsonwebtoken.sign({
            userEmail:currentUser.email,
            username:currentUser.username,
            userId:currentUser._id
        },
        process.env.TOKEN_PRIVATE_KEY,

        {
            algorithm:"HS512",
            expiresIn:60
        })

        return res.json({USER_TOKEN:token})
    }else{
        return res.status(400).json(defaultLoginErrorMessage)
    }
}




const validateLoginInputs = (data) => {
    const Schema = Joi.object({
        email:Joi.string().required().min(5).max(500),
        password:Joi.string().required().min(8)
    })

    return Schema.validate(data)
}

export default loginController
