
// importing the mongoose
const mongoose=require('mongoose')                
// defining the schema
const userSchema= new mongoose.Schema({
    name:String,
    email:String
})

module.exports=mongoose.model('User',userSchema);

// The mongoose.model function creates a model class that can be used to interact with the users collection in your MongoDB database. This model class has methods for CRUD (Create, Read, Update, Delete) operations and more.

// module.exports:

// This is part of the CommonJS module system used in Node.js. It allows you to export functions, objects, or primitives from a file so that they can be used in other files.