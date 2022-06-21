const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const { upload } = require("../middlewares/multer");
const { getUser, getUsers, deleteUser, updateUser } = require("../controllers/user");
const router = express.Router();

router.get("/", verifyToken, verifyRoles(ROLES.ADMIN), getUsers)
router.delete("/:id", verifyToken, verifyRoles(ROLES.ADMIN), deleteUser)
router.patch("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.single("profileImg"), updateUser)


router.get("/id", verifyToken, verifyRoles(ROLES.USER), getUser)

module.exports = router;