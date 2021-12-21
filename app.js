// package import
require("dotenv").config();
const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

// internal import
const { connectMysql, sequelize } = require("./config/sequelize");
const webRoutes = require("./routes/web");
const { checkCurrentUser } = require("./middlewares/auth");

// app create
const app = express();

// database connection
connectMysql();

// middleware list
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

// access locals data from ejs view
// app.use(function (req, res, next) {
// res.locals.user = req.locals.user ? req.locals.user : {};
//   next();
// });

// app.use(function (req, res, next) {
//   req.locals.user = res.locals.user ? res.locals.user : {};
//   next();
// });

// template setup for ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);

app.set("layout", "layouts/layout");
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// route list
app.use("*", checkCurrentUser);
app.use("/", webRoutes);

// run server
const PORT = process.env.PORT;
app.listen(PORT, function () {
  console.log(`Server running on http://localhost:${PORT}`);
});
