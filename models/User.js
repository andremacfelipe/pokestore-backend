import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    fullName:{type:String,required:true,minlength:5,maxlength:500},
    email:{type:String,required:true,minlength:5,maxlength:200},
    password:{type:String,required:true,minlength:8,},
    purchases:{type:Array,default:[]},
    roles:{type:Array,default:[user]},
    
})

export default mongoose.model("User",userSchema)

