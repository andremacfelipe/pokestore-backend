import Case from "../../../models/Case/Case.js"

const validateCaseId = async (req, res, next) => {
    const caseId = req.query.id



    try {
        const currentCase = await Case.findById(caseId)
        if (!currentCase) {
            throw new Error({ message: "Not Found!" })
        } else {
            next()
        }
    } catch (err) {
        res.status(404).json({ message: "Case not found!" })
    }
}

export { validateCaseId }