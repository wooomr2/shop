const express = require("express");
const { addScreen, getScreens, updateScreen, deleteScreen, getScreen } = require("../controllers/screen");
const { verifyToken } = require("../middlewares/verifyToken")
const { adminRole } = require("../middlewares/verifyRoles")
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.post("/", verifyToken, adminRole, upload.fields([{name: 'banners'},{name:'cards'}]), addScreen);
router.get("/", getScreens);
router.get("/:cid", getScreen);
router.delete("/:id", verifyToken, adminRole, deleteScreen);

module.exports = router;
