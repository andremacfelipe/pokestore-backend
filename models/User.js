import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    fistName:{type:String,required:true,minlength:3,maxlength:20},
    lastName:{type:String,required:true,minlength:3,maxlength:20},
    email:{type:String,required:true,minlength:5,maxlength:200},
    password:{type:String,required:true,minlength:8,},
    purchases:{type:Array,default:[]},
    
})