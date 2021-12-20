const mongoose = require("mongoose");

// const mongoUri = "mongodb://localhost:27017/session";
const MONGO_URI = "mongodb://127.0.0.1:27017/session_auth";

async function connectMongoDB() {
  try {
    await mongoose.createConnection(MONGO_URI);

    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log("MongoDB Connection Failed");
    // console.log(err);
    console.log(err.message);
    process.exit(1);
  }
}

module.exports = { MONGO_URI, connectMongoDB };
