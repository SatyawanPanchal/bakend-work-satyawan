

const express = require('express')
const mongoose=require('mongoose')
const app=express()
const port=3000

const uri='mongodb+srv://panchalsatyawan:20ZwypMS50xPdodt@clusterdatabase.axugwq6.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDatabase'

mongoose.connect(uri)
.then(()=>{
    console.log('you are connected to database');
    
}) 


const user= require('./models/userModel')

async function insert()
{
    await user.create({
        name:'satyawan',
        email:'panchal.satyawan@gmail.com'
    })
    await user.create({
        name:'vishu',
        email:'varshasehrawat8@gmail.com'
    })
}

insert()



app.get('/',(req,res)=>{
    res.send("server is running here at RPA") 
})

app.listen(port,()=>{
    console.log('server is listening at port =',port);
    
})




 