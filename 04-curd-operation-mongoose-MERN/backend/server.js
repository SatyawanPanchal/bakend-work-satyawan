
const express=require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);

const dbUri = process.env.MONGODB_URI;
const port=process.env.PORT||5000;
 
mongoose.connect(dbUri)
.then(()=>{
    console.log('database connected'); 
    
})
 


app.get('/',(req,res)=>{
    res.send("Server is running here");
})


app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
    
})