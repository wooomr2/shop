const express = require("express");
const { getAddress, addAddress, upsertAddress} = require("../controllers/address");
const { verifyToken, userAuth } = require("../middlewares/auth");
const router = express.Router();

// router.post('/', verifyToken, userAuth, addAddress);
router.patch('/', verifyToken, userAuth, upsertAddress);
router.get('/:uid', verifyToken, userAuth, getAddress);

module.exports = router;