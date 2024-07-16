const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const uri =
  "mongodb+srv://panchalsatyawan:QmmxEiPMi9T0vPud@clusterproject.qhteotm.mongodb.net/?retryWrites=true&w=majority&appName=ClusterProject";

app.listen(PORT, () => {
  console.log("my server is running at port =", PORT);
});

app.get("/", (req, res) => {
  res.send("Server running here  ");
});

app.get("/about", (req, res) => {
  res.send(`kya de data`);
});

app.get("/add", (req, res) => {
  res.send("data sent sucessfully");
});

app.post("/add", (req, res) => {
  const datawegot = req.body;
  const result = parseInt(datawegot.firstData) + parseInt(datawegot.secondData);
  res.json(result);
  console.log("data we got by post method =", result);
});
