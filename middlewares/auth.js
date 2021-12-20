function checkIsAuth(req, res, next) {
  if (!req.session.isAuth) {
    return res.redirect("/login");
  }
  next();
}

function checkIsGuest(req, res, next) {
  if (req.session.isAuth === true) {
    return res.redirect("back");
  }
  next();
}

module.exports = { checkIsAuth, checkIsGuest };
