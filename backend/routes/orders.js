const express = require("express");
const { addOrder, getOrder, getOrders, getAllOrders } = require("../controllers/order");
const { verifyToken } = require("../middlewares/verifyToken")
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();


router.post("/", verifyToken, verifyRoles(ROLES.USER), addOrder);
router.get("/", verifyToken, verifyRoles(ROLES.ADMIN), getAllOrders);
router.post("/get", verifyToken, verifyRoles(ROLES.USER), getOrders);
router.get("/:id", verifyToken, verifyRoles(ROLES.USER), getOrder);



module.exports = router;
