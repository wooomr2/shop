const express = require("express");
const { getAddress, upsertAddress } = require("../controllers/address");
const { verifyToken } = require("../middlewares/verifyToken")
const { userRole } = require("../middlewares/verifyRoles")
const router = express.Router();

router.patch('/', verifyToken, userRole, upsertAddress);
router.get('/:uid', verifyToken, userRole, getAddress);

module.exports = router;