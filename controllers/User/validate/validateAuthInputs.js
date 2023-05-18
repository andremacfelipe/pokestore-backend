import Joi from "joi"



const validateRegisterInputs = (data) => {
    const Schema = Joi.object({
        username: Joi.string().required().min(2).max(500),
        email: Joi.string().required().min(5).max(200),
        password: Joi.string().required().min(8)
    })
    return Schema.validate(data)
}


const validateLoginInputs = (data) => {
    const Schema = Joi.object({
        email:Joi.string().required().min(5).max(500),
        password:Joi.string().required().min(8)
    })

    return Schema.validate(data)
}



export { validateRegisterInputs, validateLoginInputs}