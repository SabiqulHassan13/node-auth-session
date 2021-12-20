// package import
const path = require("path");

const dotenv = require("dotenv");
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const expressLayouts = require("express-ejs-layouts");

// internal import
const { connectMongoDB, MONGO_URI } = require("./config/database");
const webRoutes = require("./routes/web");

// app create
const app = express();
dotenv.config();

// database connection
connectMongoDB();

// session store
const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: "mySessions",
});

// middleware list
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret key that will sign cookie",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// template setup for ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);

app.set("layout", "layouts/layout");
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// route list

// run server
const PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log(`Server running on http://localhost:${PORT}`);
});
