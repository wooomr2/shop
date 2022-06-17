const express = require("express");
const { getAddress, upsertAddress } = require("../controllers/address");
const { verifyToken } = require("../middlewares/verifyToken")
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();

router.patch("/", verifyToken, verifyRoles(ROLES.USER), upsertAddress);
router.get('/:uid', verifyToken, verifyRoles(ROLES.USER), getAddress);

module.exports = router;