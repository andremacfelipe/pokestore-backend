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

const addPokemonStats = async (pokemonArray) => {


    try {
        
        const currentSpecies = await Pokemon.findById(pokemonArray[0].itemTypeCode)
        const handledData = pokemonArray.map((item) => {
            return {
                ...item.toObject(),
                pokemonHeight:currentSpecies.pokemonHeight,
                pokemonWeight:currentSpecies.pokemonWeight,
                pokemonBaseHp:currentSpecies.pokemonBaseHp,
                pokemonBaseAttack:currentSpecies.pokemonBaseAttack,
                pokemonBaseDefense:currentSpecies.pokemonBaseDefense
            }
        })
        return handledData


    } catch (error) {
        throw new Error("An error occured")
    }
}

export {writeCreatedUnits,addPokemonStats}