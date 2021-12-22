const express = require("express");
const router = express.Router();
const multer = require("multer");

const homeController = require("../controllers/home.controller");
const userController = require("../controllers/user.controller");
const predictController = require("../controllers/predict.controller");
const {
  checkIsAuth,
  checkIsGuest,
  checkIsAdmin,
} = require("../middlewares/auth");

// configure multer for file uploading
const UPLOAD_PATH = "./uploads/";
// const upload = multer({ dest: UPLOAD_PATH });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExt = file.mimetype.split("/")[1];

    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExt);
  },
});

const upload = multer({ storage: storage });

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

module.exports = router;
