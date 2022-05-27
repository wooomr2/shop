const express = require("express");
const { createCheckoutSession } = require("../controllers/stripe");
const { verifyToken, userAuth } = require("../middlewares/auth");
const router = express.Router();

router.post("/checkout_session", verifyToken, userAuth, createCheckoutSession)

module.exports = router;