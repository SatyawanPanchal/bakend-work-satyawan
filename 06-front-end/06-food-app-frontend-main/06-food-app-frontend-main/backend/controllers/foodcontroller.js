import { log } from "console";
import foodModel from "../models/foodmodel.js";
import fs from 'fs'

// add food item

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`
        
        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image:image_filename
        })
        
    try {
        await food.save();
        res.json({success:true,message:'food addes'})
    } catch (error)
    {
        console.log(error);
        res.json({ success: false, message: "Error" })
     
    }
    
}

const listFood=async(req,res)=>{
    try{
            const foods=await foodModel.find({}) 
                
                res.json({success:true,data:foods})
                console.log('items in the list found');
                
          
    }catch(error)
    {
        res.json({success:false,error:"could not find the items"})
    }
    
}

const removeFood=async(req,res)=>{
     try {
        const food=await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{}) // removing a file form upload folder

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"food is removed"})
     } catch (error) {
        console.log('error',error);
        res.json({success:false,message:'Error'})

        
        
     }
}
export  {addFood,listFood,removeFood}