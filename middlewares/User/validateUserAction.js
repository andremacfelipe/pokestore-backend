import jsonwebtoken from "jsonwebtoken"

const validateUserAction = (req, res, next) => {

    try {
        const userData = jsonwebtoken.verify(req.headers.user_token, process.env.TOKEN_PRIVATE_KEY)
        req.body.userData = userData
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized Action" })
    }


}


export { validateUserAction }
