import Case from "../../models/Case/Case.js";
import Pokemon from "../../models/Pokemon/Pokemon.js";

const getAvailablePokemonSpecies = async (req,res) => {

    try {
        const availablePokes = await Pokemon.find()
        res.status(200).json(availablePokes)
    } catch (error) {
        res.status(404).json({message:"Not found!"})
    }


}

const createNewGenericCase = async (req,res) => {

    const {
        name,
        price,
        content,
        availableUnits
    } = req.body

    try {
        const genericCase = new Case({
            name,
            price,
            content,
            availableUnits
        })

        const newGenericCase = await genericCase.save()

        res.status(201).json({message:"Case successfully created!",newGenericCase})


    } catch (err) {
        res.status(400).json({message:"Bad request"})
    }

}









export {getAvailablePokemonSpecies,createNewGenericCase}