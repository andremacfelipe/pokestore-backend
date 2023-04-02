import jsonwebtoken from "jsonwebtoken"

const validateSessionController = async (req,res) => {
    try {
        const userData = jsonwebtoken.verify(req.headers.user_token,process.env.TOKEN_PRIVATE_KEY)
        return res.json(userData)
    } catch (error) {
        return res.status(401).json({message:"Session invalid"})
    }
}

export {validateSessionController}
