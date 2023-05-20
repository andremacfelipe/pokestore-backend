import Pokemon from "../../models/Pokemon/Pokemon.js"


const writeCreatedUnits = async (currentSpeciesName,newItemId) => {
    try {
        const currentSpecies = await Pokemon.findOne({pokemonName:currentSpeciesName})
        if (!currentSpecies) throw Error("writeCreatedUnits failed!")
        currentSpecies.createdUnits.push(newItemId)
        await currentSpecies.save()

    } catch (err) {
        throw Error(err.message)
    }
}

export {writeCreatedUnits}