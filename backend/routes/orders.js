const express = require("express");
const { addOrder, getOrder, getOrdersByUserId } = require("../controllers/order");
const { verifyToken } = require("../middlewares/verifyToken")
const { userRole } = require("../middlewares/verifyRoles")
const router = express.Router();

//ADMIN
// router.patch("/", veryfyToken, adminAuth, updateOrders);
// router.get("/", verifyToken, adminAuth, getOrders);
//COMMON
router.post("/", verifyToken, userRole, addOrder);
router.get("/user/:uid", verifyToken, userRole, getOrdersByUserId);
router.get("/:id", verifyToken, userRole, getOrder);

module.exports = router;
