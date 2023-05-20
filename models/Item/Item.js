import mongoose from "mongoose";

const ItemSchema = mongoose.Schema({
    itemType:{type:String,required:true},
    itemTypeCode:{type:String,required:true},
    itemName:{type:String,required:true},
    itemPic:{type:String,required:true},
    itemOwner:{type:String,required:true}
})

export default mongoose.model("Item",ItemSchema)