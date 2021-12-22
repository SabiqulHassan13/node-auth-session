function showServices(req, res) {
  res.render("services");
}

function showPredictByUrl(req, res) {
  res.render("predict-url");
}

module.exports = { showServices, showPredictByUrl };
