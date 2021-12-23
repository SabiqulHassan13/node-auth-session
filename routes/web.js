const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home.controller");
const userController = require("../controllers/user.controller");
const predictController = require("../controllers/predict.controller");
const paymentController = require("../controllers/payment.controller");
const {
  checkIsAuth,
  checkIsGuest,
  checkIsAdmin,
} = require("../middlewares/auth");
const { upload } = require("../config/multer");

// Home Routes
router.get("/", homeController.showHome);
router.get("/dashboard", checkIsAuth, homeController.showDashboard);

// User Routes
router.get("/register", checkIsGuest, userController.showRegister);
router.post("/register", userController.processRegister);

router.get("/login", checkIsGuest, userController.showLogin);
router.post("/login", userController.processLogin);
router.post("/logout", userController.processLogout);

router.get("/users", checkIsAdmin, userController.showUserList);

// Predict Model Routes
router.get("/services", predictController.showServices);

router.get("/predict-url", checkIsAuth, predictController.showPredictByUrl);
router.get("/predict-db", checkIsAuth, predictController.showPredictByDB);

router.post(
  "/products/store",
  checkIsAuth,
  upload.single("productFile"),
  predictController.storeProduct
);

router.get("/products/:id", checkIsAuth, predictController.deleteProduct);
// router.delete("/products/:id", predictController.deleteProduct);

// Payment Routes
router.get("/pay-donate", paymentController.showPayDonation);

// checkout with stripe
// router.post(
//   "/create-checkout-session",
//   paymentController.createCheckoutSession
// );

router.post("/pay-checkout", paymentController.payCheckout);

// payment redirect
router.get("/pay-success", paymentController.showPaySuccess);
router.get("/pay-cancel", paymentController.showPayCancel);

module.exports = router;
