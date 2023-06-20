import Case from "../../../models/Case/Case.js"

const validateCaseId = async (req,res,next) => {
    const caseId = req.query.id

    const currentCase = await Case.findById(caseId)

    if (!currentCase){
        return res.status(404).json({message:"Not Found!"})
    }else{
        next()
    }
}

export {validateCaseId}