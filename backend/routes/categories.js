const express = require("express");
const { addCategory, getCategories, updateCategories, deleteCategories } = require("../controllers/category");
const { verifyToken } = require("../middlewares/verifyToken")
const { adminRole } = require("../middlewares/verifyRoles")
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.post("/", verifyToken, adminRole, upload.single("categoryImg"), addCategory);
router.get("/", getCategories);
router.patch("/", verifyToken, adminRole, upload.array("categoryImg"), updateCategories);
router.put("/", verifyToken, adminRole, deleteCategories);

module.exports = router;
