const express = require("express");
const { addOrder, getOrder, getOrdersByUserId } = require("../controllers/order");
const { verifyToken } = require("../middlewares/verifyToken")
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();

//ADMIN
// router.patch("/", veryfyToken, adminAuth, updateOrders);
// router.get("/", verifyToken, adminAuth, getOrders);
//COMMON
router.post("/", verifyToken, verifyRoles(ROLES.USER), addOrder);
router.get("/user/:uid", verifyToken, verifyRoles(ROLES.USER), getOrdersByUserId);
router.get("/:id", verifyToken, verifyRoles(ROLES.USER), getOrder);

module.exports = router;
