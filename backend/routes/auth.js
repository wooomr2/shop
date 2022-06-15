const express = require("express");
const router = express.Router();
const { signup, signin, forgotPassword, resetPassword, signout, matchEmail } = require("../controllers/auth");
const { validateSignup, isValidated, validateSignin } = require("../middlewares/validator");

// auth
router.get("/:email", matchEmail)
router.post("/signup", validateSignup, isValidated, signup);
router.post("/signin", validateSignin, isValidated, signin);
router.get("/signout", signout);
router.post("/forgot_password", forgotPassword);
router.put("/reset_password/:resetToken", resetPassword);

module.exports = router;
