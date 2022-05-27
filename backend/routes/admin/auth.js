const express = require("express");
const router = express.Router();
const { signin, signout } = require("../../controllers/admin/auth");
const {isValidated, validateSignin } = require("../../middlewares/validator");

router.post("/signin", validateSignin, isValidated, signin)

module.exports = router;
