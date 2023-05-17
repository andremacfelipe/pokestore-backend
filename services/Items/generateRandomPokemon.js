import Item from "../../models/Item/Item.js";
import Pokemon from "../../models/Pokemon/Pokemon.js";
import User from "../../models/User/User.js";





const generateRandomPokemon = async (req, res) => {
    const rawPokes = await getPokemonTypes()
    const sortedIndex = sortRandomIndex(rawPokes.length)
    const randomPokemonType = rawPokes[Number(sortedIndex)]
    

    //Generate a new random pokemon and write it on db
    const {userData} = req.body

    try {

        const currentUser = await User.findOne({email:userData.userEmail,username:userData.username})

        

        const sortedPokemonType = await Pokemon.findOne(randomPokemonType)
        const newPokemonItem = new Item({
            ItemType:"Pokemon",
            ItemTypeCode:sortedPokemonType._id,
            ItemName:sortedPokemonType.pokemonName,
            ItemPic:sortedPokemonType.pokemonPicSrc,
            ItemOwner:currentUser._id
        })
        const savedPoke = await newPokemonItem.save()

        sortedPokemonType.createdUnits.push({
            itemId:savedPoke._id,
            createdAt:Date.now(),
            ownerHistory:[currentUser._id],
        })

        await sortedPokemonType.save()
        
        



        return res.status(200).json({
            message:"Pokemon successfully generated",
            pokemonType:sortedPokemonType,
            savedPoke:savedPoke,
            userData:userData
        }) //Debug 


    } catch (error) {
        res.status(444).json({ message: error})
    }
}



const getPokemonTypes = async () => {

    const Pokemons = await Pokemon.find()

    return Pokemons


}

const sortRandomIndex = (length) => {
    const sortedIndex = Math.floor(Math.random() * Number(length))

    return sortedIndex

}


export { generateRandomPokemon }
