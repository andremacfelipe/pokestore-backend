import mongoose from "mongoose";

//Model for PokemonSpecies

const PokemonSchema = mongoose.Schema({
    pokemonName:{type:String,required:true},
    pokemonPokedexIndex:{type:Number,required:true},
    pokemonHeight:{type:Number, required:true,},
    pokemonWeight:{type:Number, required:true},
    pokemonBaseHp:{type:Number,required:true},
    pokemonBaseAttack:{type:Number,required:true},
    pokemonBaseDefense:{type:Number,required:true},
    pokemonTypes:{type:Array,default:[]},
    pokemonPicSrc:{type:String,required:true},
    createdUnits:{type:Array,default:[]}
})

export default mongoose.model("Pokemon",PokemonSchema)
