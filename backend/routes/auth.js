const express = require("express");
const router = express.Router();
const { adminSignin, signup, signin, forgotPassword, resetPassword, signout, matchEmail, matchPassword, updateProfile } = require("../controllers/auth");
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


router.post("/check", isValidated, matchPassword);
router.post("/update", isValidated, updateProfile);

module.exports = router;
