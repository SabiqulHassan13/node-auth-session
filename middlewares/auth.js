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
  if (req.session.isAuth === true && req.locals.user.isAdmin === 1) {
    next();
  }
  return res.redirect("back");
}

module.exports = { checkIsAuth, checkIsGuest };
