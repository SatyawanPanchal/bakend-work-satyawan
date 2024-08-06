const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const mongoose=require('mongoose')
const app=express();
const routes=require('./route/userRouter')
dotenv.config();
app.use(cors()) 
  
app.use(express.json())
app.use('/api/user',routes)

const port=process.env.PORT ||5001; 


mongoose.connect(process.env.DB_URI) 
.then(()=>{ 
    console.log('mongodb connected');  
    
}) 




app.listen(port,()=>{
    console.log('server is running at port --> ',port); 
    
});