const express = require("express");
const { addLookbook, getLookbooks, getLookbook, deleteLookbook, updateLookbook } = require("../controllers/lookbook");
const { upload } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/verifyToken")
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();

router.post("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.fields([{name: 'banners'},{name:'cards'}]), addLookbook);
router.patch("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.fields([{name: 'banners'},{name:'cards'}]), updateLookbook);
router.get("/", getLookbooks);
router.get("/:id", getLookbook);
router.delete("/:id", verifyToken, verifyRoles(ROLES.ADMIN), deleteLookbook);

module.exports = router;
