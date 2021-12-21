function checkIsGuest(req, res, next) {
  if (req.session.isAuth === true) {
    return res.redirect("back");
  }
  next();
}

function checkIsAuth(req, res, next) {
  if (!req.session.isAuth) {
    return res.redirect("/login");
  }
  next();
}

function checkIsAdmin(req, res, next) {
  if (req.session.isAuth === true && req.session.user.isAdmin === 1) {
    next();
  }
  return res.redirect("back");
}

function checkCurrentUser(req, res, next) {
  const token = req.cookies[process.env.JWT_COOKIE_NAME];

  console.log("req.cookies", req.cookies);
  // console.log(token);
  next();

  // check and verify jwt token
  // if (token) {
  //   jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
  //     if (err) {
  //       console.log(err.message);
  //       res.locals.currentUser = null;
  //       next();
  //     } else {
  //       console.log(decodedToken);
  //       let user = await User.findById(decodedToken.id);
  //       res.locals.currentUser = user;
  //       next();
  //     }
  //   });
  // } else {
  //   res.locals.currentUser = null;
  //   next();
  // }
}

module.exports = { checkIsAuth, checkIsGuest, checkIsAdmin, checkCurrentUser };
