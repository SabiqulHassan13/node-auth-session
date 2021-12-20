const mongoose = require("mongoose");

// const mongoUri = "mongodb://localhost:27017/session";
const mongoUri = "mongodb://127.0.0.1:27017/session";

async function connectMongoDB() {
  try {
    await mongoose.createConnection(mongoUri);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log("MongoDB Connection Failed");
    // console.log(err);
    console.log(err.message);
    process.exit(1);
  }
}

module.exports = { connectMongoDB };
