const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

function showRegister(req, res) {
  res.render("auth/register");
}

function showLogin(req, res) {
  res.render("auth/login");
}

async function processRegister(req, res) {
  const { username, email, password } = req.body;
  console.log(req.body);

  try {
    // check if user exist
    const exist = await User.findOne({ where: { email } });

    // if found previous user then 400
    if (exist) {
      console.log("user already exists");
      return res.redirect("/register");
    }

    // otherwise hash password then
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const user = { username, email, password: hashedPassword };
    const newUser = await User.create(user);

    return res.redirect("/login");
  } catch (err) {
    // console.log("Internal server error");
    console.log(err);
    return res.redirect("/register");
  }
}

async function processLogin(req, res) {
  const { email, password } = req.body;
  //   console.log(req.body);

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("invalid credentials");

      return res.redirect("/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("invalid credentials");

      return res.redirect("/login");
    }

    // generate jwt for user
    const userObject = {
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const token = jwt.sign(userObject, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });

    // set cookie
    res.cookie(process.env.JWT_COOKIE_NAME, token, {
      maxAge: process.env.JWT_EXPIRE_TIME,
      httpOnly: true,
      signed: true,
    });

    // set auth locals
    res.locals.user = userObject;
    console.log(res.locals);

    res.redirect("/dashboard");
  } catch (err) {
    // console.log("internal server error");
    console.log(err);

    return res.redirect("/login");
  }
}

function processLogout(req, res) {
  // req.session.destroy((err) => {
  //   if (err) throw err;
  //   res.redirect("/login");
  // });
  //   req.session.isAuth = false;
  //   req.session.user = "";
  //   req.session.error = "";
  //   res.redirect("/login");
}

function showUserList(req, res) {
  res.render("user-list");
}

module.exports = {
  showRegister,
  showLogin,
  processRegister,
  processLogin,
  processLogout,
  showUserList,
};
