const bcrypt = require("bcrypt");

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
    // const exist = await User.findOne({ where: { email } });

    // // if found previous user then 400
    // if (exist) {
    //   console.log("user already exists");
    //   return res.redirect("/register");
    // }

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

module.exports = { showRegister, showLogin, processRegister };
