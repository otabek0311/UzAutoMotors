const express = require("express");
const router = express.Router();
const {
  register,
  verifyOtp,
  login,
  forgetPassword,
  resetPassword,
  getCurrentUser,
} = require("../controller/auth.controller");
const authValidatorMiddleware = require("../middleware/auth.validator.middleware");
const authMiddleware = require("../middleware/autharation.middleware");

router.post("/register", authValidatorMiddleware("register"), register);
router.post("/verify-otp", verifyOtp);
router.post("/login", authValidatorMiddleware("login"), login);
router.post("/forget-password", authValidatorMiddleware("forget"), forgetPassword);
router.post("/reset-password", authValidatorMiddleware("reset"), resetPassword);
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;
