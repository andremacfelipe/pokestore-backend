import Joi from "joi";
import Pokemon from "../../../models/Pokemon/Pokemon";


const verifyNewCase = async (req,res,next) => {

    const {error} = validateNewGenericCaseInputs(req.body)

    if (error) return res.status(400).json(error.details)

    const {name} = req.body
    
    const isAvailable = await Pokemon.findOne({pokemonName:name})

    if (isAvailable){
        next()
    }else{
        res.status(400).json({message:"Pokemon species unavailable"})
    }


}

//Validate

const validateNewGenericCaseInputs = (data) => {

    const Schema = Joi.object({
        name:Joi.string().required().min(1),
        price:Joi.number().required(),

    })
    return Schema.validate(data)

}

export default verifyNewCase