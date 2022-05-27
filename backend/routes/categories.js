const express = require("express");
const { addCategory, getCategories, updateCategories, deleteCategories} = require("../controllers/category");
const { verifyToken, adminAuth } = require("../middlewares/auth");
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.post("/", verifyToken, adminAuth, upload.single("categoryImg"), addCategory);
router.get("/", getCategories);
router.patch("/", verifyToken, adminAuth, upload.array("categoryImg"), updateCategories);
router.put("/", verifyToken, adminAuth, deleteCategories);

module.exports = router;
