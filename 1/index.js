const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authMiddleware = require("./authentication");
const route = require("./Routes/Route");

const app = express();
const port = 3000;

const mongoURI = "mongodb://0.0.0.0:27017/designchallenge";
mongoose.connect(mongoURI)

const db=mongoose.connection
db.on('err',console.error.bind(console,'mongoose connection error'))

db.once('open',()=>{
  console.log('connected to mongodb');
})

// Built-in middleware
app.use(express.json());

// Custom/Application level middleware
const ser = (req, res, next) => {
  console.log("Middleware 1 is executed");
  next();
};

const ser2 = (req, res, next) => {
  console.log("Middleware 2 is executed");
  next();
};

app.use(ser);
app.use(ser2);

// Third-party / Router level middleware
app.use(bodyParser.json());

// Configurable middleware
app.use(authMiddleware);

// Use the blog controller
app.use("/api2", route);

app.get("/", (req, res) => {
  res.send("Meow");
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
