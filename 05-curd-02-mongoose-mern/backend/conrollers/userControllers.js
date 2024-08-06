 
const userModel=require('../model/userModel')

const updateData=async(req,res)=>{
    try{
        console.log('let us see what to update',req.body,req.params.id);
        
        const userUpdated=await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        console.log('user edited =',userUpdated);

    }catch(error)
    {
        res.status(400).json({error:error.message})
    }

}


const createUser=async (req,res)=>{
    
    try{
        const newUser=await new userModel(req.body);
        console.log('we got some data ',req.body); 
        
        await newUser.save()
        .then(()=>{
            console.log('new user is created');
            
        }) 
        if(newUser)
            {
                res.status(200).json(newUser);
            }
            else{
                res.send("no user created");
            }
        }catch(error)
        {
            res.status(400).json({'error':`we got some error ${error.message}`})
        }
            

}

const findAll = async (req,res)=>{
    try{
        const users= await userModel.find()
        res.status(200).json(users);
        if(users)
        {
            console.log('we found some users');
            
        }
        else{
            console.log('we have not found users');
            
        }
    }catch(error)
    {
        res.status(400).json({error:error.message})
    }
}


const deleteUser=async(req,res)=>{
    try{
        console.log('we are in deleteUser with id',req.params.id);
        
        
        const userDeleted =await userModel.findByIdAndDelete(req.params.id);
        console.log("this is ",userDeleted);
        

    }catch(error)
    {
        res.status(400).json({error:error.message})
    }
}

module.exports={
    createUser,
    findAll,
    deleteUser,updateData
};
