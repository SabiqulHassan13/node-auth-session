const Product = require("../models/product.model");

function showServices(req, res) {
  res.render("services");
}

function showPredictByUrl(req, res) {
  res.render("predict-url");
}

async function showPredictByDB(req, res) {
  const currentUserId = res.locals.user.id;
  console.log("current user id", currentUserId);

  const products = await Product.findAll({ where: { userId: currentUserId } });

  res.render("predict-db", { products });
}

async function storeProduct(req, res) {
  // console.log(req.file);

  // already stored the file
  const productFileName = req.file.filename;
  console.log(productFileName);

  let statusMsg = "";
  // store file-name in db
  try {
    await Product.create({
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
