const express = require("express");
const { addOrder, getOrder, getOrders, getAllOrders, updateOrder, updateOrderStatus } = require("../controllers/order");
const { verifyToken } = require("../middlewares/verifyToken")
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();

router.patch("/",  verifyToken, verifyRoles(ROLES.ADMIN), updateOrderStatus)
// router.patch("/",  verifyToken, verifyRoles(ROLES.USER), updatePaymentStatus)
router.get("/", verifyToken, verifyRoles(ROLES.ADMIN), getAllOrders);



router.post("/", verifyToken, verifyRoles(ROLES.USER), addOrder);
router.post("/get", verifyToken, verifyRoles(ROLES.USER), getOrders);
router.get("/:id", verifyToken, verifyRoles(ROLES.USER), getOrder);



module.exports = router;
