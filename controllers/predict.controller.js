const path = require("path");
const fs = require("fs");

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

    // res.send("product stored in db successfully");
    // res.render("predict-db");
    res.redirect("/predict-db");
  } catch (err) {
    // res.send("product didn't store in db", err);
    // res.render("predict-db");
    res.redirect("/predict-db");
  }
}

async function deleteProduct(req, res) {
  const { id: productId } = req.params;
  // console.log("tried to delete product id - ", productId);
  // res.send("tried to delete product id - ", productId);

  try {
    // find product from db
    const product = await Product.findOne({ where: { id: productId } });
    // res.json(product);

    // unlink from storage
    const pathToUnlink = path.join(
      __dirname,
      "..",
      "uploads",
      product.productFile
    );
    console.log("unlinked product file path", pathToUnlink);

    // await fs.unlink(pathToUnlink);

    // delete from db
    const result = product.destroy();

    // res.json({ message: "product deleted & file unlinked", result });
    res.redirect("/predict-db");
    // res.render("predict-db");
  } catch (err) {
    console.log("Error in deleting product", err);

    // res.json(err);
    res.redirect("/predict-db");
    // res.render("predict-db");
  }
}

module.exports = {
  showServices,
  showPredictByUrl,
  showPredictByDB,
  storeProduct,
  deleteProduct,
};
