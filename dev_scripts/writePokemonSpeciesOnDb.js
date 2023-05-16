import Pokemon from "../models/Pokemon/Pokemon.js"
import { writeFile, unlink, readFile } from "fs"


const fetchPokemons = (amount) => {
    const innerAmount = Number(amount)



    let responses = []

    for (let i = 1; i <= innerAmount; i++) {
        let response = fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        responses.push(response)
    }
    return Promise.all(responses)


}


const awaitJson = (response) => Promise.all(response.map(response => {
    if (response.ok) return response.json()
    throw new Error(response.statusText)
}))

const writePokemonSpeciesOnDb = async () => {
    //To write the pokemons on Database you must import it to app.js and exec the app.js with node (not with nodemon or "npm start"),
    //and when the script finishes you must remove it from the app.js.
    //You only want to run it once in order to write the Pokemon species on the database.  
    
    const handledData = []
    const rawData = await createPokemonSpeciesFile()
    const Obj = JSON.parse(rawData)


    Obj.forEach(pokemon => {
        handledData.push({
            pokemonName: pokemon.name,
            pokemonPokedexIndex: pokemon.id,
            pokemonHeight: pokemon.height,
            pokemonWeight: pokemon.weight,
            pokemonPicSrc: pokemon.sprites.front_default,
            pokemonTypes: pokemon.types,
            pokemonBaseHp: pokemon.stats[0].base_stat,
            pokemonBaseAttack: pokemon.stats[1].base_stat,
            pokemonBaseDefense: pokemon.stats[2].base_stat,
            pokemonBaseSpeed: pokemon.stats[5].base_stat
        })
    });

    writeFile("./dev_scripts/temp/Pokes.json", JSON.stringify(handledData), (err) => {
        if (err) console.log(err)
    })

    readFile("./dev_scripts/temp/Pokes.json", "utf-8", async (err, data) => {
        if (err) console.log(err)
        const arr = JSON.parse(data)
        arr.forEach(async (element) => {
            const NewPoke = new Pokemon({
                pokemonName:element.pokemonName ,
                pokemonPokedexIndex:element.pokemonPokedexIndex ,
                pokemonHeight: element.pokemonHeight,
                pokemonWeight: element.pokemonWeight,
                pokemonBaseHp: element.pokemonBaseHp,
                pokemonBaseAttack: element.pokemonBaseAttack,
                pokemonBaseDefense: element.pokemonBaseDefense,
                pokemonTypes: element.pokemonTypes,
                pokemonPicSrc:element.pokemonPicSrc,
                createdUnits: { type: Array, default: [] }
            })

            await NewPoke.save()
        })
    })

    unlink("./dev_scripts/temp/Pokes.json",(err) => {
        if (err) throw err
        console.log("Temp file deleted!")
    })
    console.log("END of the writePokemonSpeciesOnDb SCRIPT!")
}

const createPokemonSpeciesFile = async () => {
    const Pokes = await fetchPokemons(50)
        .then(awaitJson)
        .then(async (res) => {
            return res
        })



    return JSON.stringify(Pokes)


}




export {writePokemonSpeciesOnDb}



