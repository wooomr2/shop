const express = require("express");
const { createCheckoutSession } = require("../controllers/stripe");
const { verifyToken } = require("../middlewares/verifyToken")
const { userRole } = require("../middlewares/verifyRoles")
const router = express.Router();

router.post("/checkout_session", verifyToken, userRole, createCheckoutSession)

module.exports = router;