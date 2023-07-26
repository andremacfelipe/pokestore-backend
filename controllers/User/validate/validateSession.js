import jsonwebtoken from "jsonwebtoken"
import User from "../../../models/User/User.js"

const validateSession = async (req,res) => {
    try {
        const userData = jsonwebtoken.verify(req.headers.user_token,process.env.TOKEN_PRIVATE_KEY)
        const currentUser = await User.findById(userData.userId)

        return res.status(200).json({
            "userEmail": currentUser.email,
            "username": currentUser.username,
            "userId": currentUser._id,
            "userCredits": currentUser.credits,
        })
        
    } catch (error) {
        return res.status(401).json({message:"Session invalid"})
    }
}

export default validateSession
