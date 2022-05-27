const express = require("express");
const { addOrder, getOrder, getOrdersByUserId } = require("../controllers/order");
const { verifyToken, userAuth, adminAuth } = require("../middlewares/auth");
const router = express.Router();

//ADMIN
// router.patch("/", veryfyToken, adminAuth, updateOrders);
// router.get("/", verifyToken, adminAuth, getOrders);
//COMMON
router.post("/", verifyToken, userAuth, addOrder);
router.get("/user/:uid", verifyToken, userAuth, getOrdersByUserId);
router.get("/:id", verifyToken, userAuth, getOrder);

module.exports = router;
