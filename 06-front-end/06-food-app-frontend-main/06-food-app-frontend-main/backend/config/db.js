import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(
      "mongodb+srv://satyawan:foodapp@cluster0.c1rc2fo.mongodb.net/food-del"
    ).then(() => {
        console.log("mongoose connected");
    })
}

 