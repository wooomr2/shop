const express = require("express");
const router = express.Router();
const { adminSignin, signup, signin, forgotPassword, resetPassword, signout, matchEmail } = require("../controllers/auth");
const { validateSignup, isValidated, validateSignin } = require("../middlewares/validator");

// ADMIN
router.post("/admin/signin", validateSignin, isValidated, adminSignin)

// 공통
router.post("/signin", validateSignin, isValidated, signin);
router.post("/signup", validateSignup, isValidated, signup);
router.get("/signout", signout);
router.get("/:email", matchEmail)
router.post("/forgot_password", forgotPassword);
router.put("/reset_password/:resetToken", resetPassword);

module.exports = router;
