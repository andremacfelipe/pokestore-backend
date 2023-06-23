import mongoose from "mongoose";

const caseSchema = mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number, required:true},
    content:{type:Array,required:true},
    image:{type:String,required:true},
    releaseDate:{type:Date, default:Date.now}
})

export default mongoose.model("Case",caseSchema)