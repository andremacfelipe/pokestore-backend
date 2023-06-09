import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    username:{type:String,required:true,minlength:5,maxlength:500},
    email:{type:String,required:true,minlength:5,maxlength:200},
    password:{type:String,required:true,minlength:8,},
    purchases:{type:Array,default:[]},
    credits:{type:Number,default:100,min:0},
    adress:{type:Object,default:{}},
    roles:{type:Array,default:["user"]},
    
})

export default mongoose.model("User",userSchema)

