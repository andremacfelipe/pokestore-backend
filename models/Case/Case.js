import mongoose from "mongoose";

const caseSchema = mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number, required:true},
    content:{type:Array,required:true},
    availableUnits:{type:Number,required:true,min:0}, //Added min value to availableUnits
    releaseDate:{type:Date, default:Date.now}
})

export default mongoose.model("Case",caseSchema)