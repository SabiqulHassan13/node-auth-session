function showServices(req, res) {
  res.render("services");
}

function showPredictByUrl(req, res) {
  res.render("predict-url");
}

function showPredictByDB(req, res) {
  res.render("predict-db");
}

function storeProduct(req, res) {}

module.exports = {
  showServices,
  showPredictByUrl,
  showPredictByDB,
  storeProduct,
};
