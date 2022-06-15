const express = require("express");
const { removeCartItems, getCartItems, addCartItems, updateCartItems } = require("../controllers/cart");
const { verifyToken } = require("../middlewares/verifyToken")
const { userRole } = require("../middlewares/verifyRoles")
const router = express.Router();


router.post("/", verifyToken, userRole, addCartItems);
router.put("/", verifyToken, userRole, updateCartItems)
router.delete("/", verifyToken, userRole, removeCartItems);
router.get("/:userId", verifyToken, userRole, getCartItems);

module.exports = router;