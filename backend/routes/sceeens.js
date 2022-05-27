const express = require("express");
const { addScreen, getScreens, updateScreen, deleteScreen, getScreen } = require("../controllers/screen");
const { verifyToken, adminAuth } = require("../middlewares/auth");
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.post("/", verifyToken, adminAuth, upload.fields([{name: 'banners'},{name:'cards'}]), addScreen);
router.get("/", getScreens);
router.get("/:cid", getScreen);
router.delete("/:id", verifyToken, adminAuth, deleteScreen);

module.exports = router;
