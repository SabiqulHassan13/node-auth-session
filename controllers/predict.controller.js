function showServices(req, res) {
  res.render("services");
}

function showPredictByUrl(req, res) {
  res.render("predict-url");
}

function showPredictByDB(req, res) {
  res.render("predict-db");
}

module.exports = { showServices, showPredictByUrl, showPredictByDB };
