const express = require("express");
const { createCheckoutSession } = require("../controllers/stripe");
const { verifyToken } = require("../middlewares/verifyToken")
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();

router.post("/checkout_session", verifyToken, verifyRoles(ROLES.USER), createCheckoutSession)

module.exports = router;