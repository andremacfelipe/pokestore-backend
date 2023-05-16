import mongoose from "mongoose";

const ItemSchema = mongoose.Schema({
    ItemType:{type:String,required:true},
    ItemTypeCode:{type:String,required:true},
    ItemName:{type:String,required:true},
    ItemPic:{type:String,required:true}
})

export default mongoose.model("Item",ItemSchema)