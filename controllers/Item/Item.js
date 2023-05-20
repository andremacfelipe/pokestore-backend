import Item from "../../models/Item/Item.js"
import Pokemon from "../../models/Pokemon/Pokemon.js"



const createNewItem = async (currentUserId,name) => {

    const Species = await Pokemon.findOne({pokemonName:name})

    if (!Species) throw Error("Species not found!")

    try {
        const item = new Item({
            itemType: "Pokemon",
            itemTypeCode: Species._id,
            itemName: Species.pokemonName,
            itemPic: Species.pokemonPicSrc,
            itemOwner: currentUserId,
            ownerHistory:[currentUserId]
        })
        const createdItem = await item.save()
        return createdItem
        

    } catch (err) {
        throw Error(err.message) 
    }
}

export {createNewItem}