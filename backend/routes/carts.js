const express = require("express");
const { addItemToCart, removeCartItems, getCartItems, addCartItems, updateCartItems } = require("../controllers/cart");
const { verifyToken, userAuth } = require("../middlewares/auth");
const router = express.Router();


router.post("/", verifyToken, userAuth, addCartItems);
router.put("/", verifyToken, userAuth, updateCartItems)
router.get("/:userId", verifyToken, userAuth, getCartItems);
router.delete("/", verifyToken, userAuth, removeCartItems);

module.exports = router;