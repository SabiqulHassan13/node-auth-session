// package import
require("dotenv").config();

const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
// const session = require("express-session");

const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const SessionStore = require("express-session-sequelize")(expressSession.Store);

// internal import
const { connectMysql, sequelize } = require("./config/sequelize");

const webRoutes = require("./routes/web");

// app create
const app = express();

// database connection
connectMysql();

// session store
const sequelizeSessionStore = new SessionStore({
  db: sequelize,
});

// middleware list
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: sequelizeSessionStore,
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
app.use("/", webRoutes);

// run server
const PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log(`Server running on http://localhost:${PORT}`);
});
