const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home.controller");
const userController = require("../controllers/user.controller");
const predictController = require("../controllers/predict.controller");
const {
  checkIsAuth,
  checkIsGuest,
  checkIsAdmin,
} = require("../middlewares/auth");

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

router.post("/store-product");

module.exports = router;
