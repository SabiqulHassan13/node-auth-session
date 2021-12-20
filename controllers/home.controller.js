function showHome(req, res) {
  res.render("home");
}

function showDashboard(req, res) {
  res.render("dashboard");
}

module.exports = { showHome, showDashboard };
