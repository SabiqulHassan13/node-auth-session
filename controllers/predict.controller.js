const Product = require("../models/product.model");

function showServices(req, res) {
  res.render("services");
}

function showPredictByUrl(req, res) {
  res.render("predict-url");
}

function showPredictByDB(req, res) {
  res.render("predict-db");
}

async function storeProduct(req, res) {
  console.log(req.file);

  // already stored the file
  const productFileName = req.file.filename;
  console.log(productFileName);

  let statusMsg = "";
  // store file-name in db
  try {
    Product.create({
      userId: req.body.userId,
      productFile: productFileName,
    });

    res.send("product stored in db successfully");
  } catch (err) {
    res.send("product didn't store in db", err);
  }
}

module.exports = {
  showServices,
  showPredictByUrl,
  showPredictByDB,
  storeProduct,
};
