const express = require("express");
const { addLookbook, getLookbooks, getLookbook, deleteLookbook } = require("../controllers/lookbook");
const { verifyToken, adminAuth } = require("../middlewares/auth");
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.post("/", verifyToken, adminAuth, upload.fields([{name: 'banners'},{name:'cards'}]), addLookbook);
router.get("/", getLookbooks);
router.get("/:id", getLookbook);
router.delete("/:id", verifyToken, adminAuth, deleteLookbook);

module.exports = router;
