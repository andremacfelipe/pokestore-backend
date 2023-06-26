import User from "../../../models/User/User.js";
import Case from "../../../models/Case/Case.js";


const validateUserCredits = async (req, res, next) => {

    const { userId } = req.body.userData
    const caseId = req.query.id

    try {
        const currentUser = await User.findById(userId)
        const currentCase = await Case.findById(caseId)
    
        if (currentUser.credits < currentCase.price){
            throw new Error("Insufficient credits!")
        }else{
            next()
        }
    } catch (err) {
        res.status(402).json({message:err.message})
    }



}

export { validateUserCredits }
