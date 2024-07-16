
const express=require('express')
const mongoose=require('mongoose')
const app=express()

const port=3000

const uri='mongodb+srv://panchalsatyawan:QmmxEiPMi9T0vPud@clusterproject.qhteotm.mongodb.net/?retryWrites=true&w=majority&appName=ClusterProject'

mongoose.connect(uri)
.then(()=>{
    console.log('database connected');
    
})

 const userModel=require('./models/userModel')

 // inserting the data to schema
 async function insert()
 {
    userModel.create({
        name:"Vivek bhai ji",
        email:"Sumitbhaiji@gmail.com"
    })
        
 }

 insert()

 // reading all the users

 app.get('/users',async function any (req,res)
{
    try{
        const users=await userModel.find();
        res.send(users);
    }catch(error)
    {
        res.status(500).send(error)
    }
})




app.listen(port,()=>{
    console.log('my server is running at port =',port);
    
})

app.get('/',(req,res)=>{
    
    res.send("chai bana lao");
})

app.get('/about',(req,res)=>{
    res.send("biscuit bhi le aana");
})


app.get('/service',(req,res)=>{
    res.send("Knowlege delivery is the service here");
})