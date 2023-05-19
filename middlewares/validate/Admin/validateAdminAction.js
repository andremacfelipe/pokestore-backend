import User from "../../../models/User/User.js"

const validateAdminAction = async (req,res,next) => {
    const {userData} = req.body


    try {
        const currentUser = await User.findOne({_id:userData.userId})
        const isAdmin = currentUser.roles.includes("admin")

        if(isAdmin){
            next()
        }else{
            throw Error()
        }
    } catch (err) {
        res.status(404).json({message:"Not found!"})
    }





}

export default validateAdminAction