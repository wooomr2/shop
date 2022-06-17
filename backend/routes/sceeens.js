const express = require("express");
const { addScreen, getScreens, updateScreen, deleteScreen, getScreen } = require("../controllers/screen");
const { upload } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/verifyToken")
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();

router.post("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.fields([{name: 'banners'},{name:'cards'}]), addScreen);
router.get("/", getScreens);
router.get("/:cid", getScreen);
router.delete("/:id", verifyToken, verifyRoles(ROLES.ADMIN), deleteScreen);

module.exports = router;
