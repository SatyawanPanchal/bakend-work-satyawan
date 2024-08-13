import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

const port = 4000;
connectDB();

//api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter)

app.listen(port, () => {
  console.log("i am running as server at port ", port);
});

app.get("/", (req, res) => {
  res.send("server running here");
});
