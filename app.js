// package import
const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");

// app create
const app = express();
dotenv.config();

// database connection
const mongoUri = "mongodb://localhost:27017/session";

async function connectMongoDB() {
  try {
    await mongoose.createConnection(mongoUri);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    // console.log("MongoDB Connection Failed");
    // console.log(err);
    console.log(err.message);
    process.exit(1);
  }
}

connectMongoDB();

// middleware list
app.use(
  session({
    secret: "secret key that will sign cookie",
    resave: false,
    saveUninitialized: false,
  })
);

// route list
app.get("/", function (req, res) {
  req.session.isAuth = true;
  console.log(req.session);
  res.send("<h1>Hello world</h1>");
});

// run server
const PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log(`Server running on http://localhost:${PORT}`);
});
