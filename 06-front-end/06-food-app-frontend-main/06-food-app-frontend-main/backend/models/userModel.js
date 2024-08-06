import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}

},{minimize:false})   // means that cartdata will be created even if there is no data filled in it

const userModel=mongoose.model.user || mongoose.model('user',userSchema);

export default userModel;