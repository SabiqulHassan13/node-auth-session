const bcrypt = require("bcrypt");

const User = require("../models/user.model");

function showRegister(req, res) {
  const error = req.session.error;
  //   delete req.session.error;

  res.render("auth/register");
}

function showLogin(req, res) {
  const error = req.session.error;
  //   delete req.session.error;

  res.render("auth/login", { err: error });
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

  const user = await User.findOne({ where: { email } });

  if (!user) {
    req.session.error = "Invalid Credentials";
    // console.log("invalid credentials");

    return res.redirect("/login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    req.session.error = "Invalid Credentials";
    // console.log("invalid credentials");

    return res.redirect("/login");
  }

  req.session.isAuth = true;
  req.session.user = user;

  res.redirect("/dashboard");
}

function processLogout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      // throw err;
      console.log(err);
    }

    res.redirect("/login");
  });

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
