const express = require("express");
const { addLookbook, getLookbooks, getLookbook, deleteLookbook, updateLookbook } = require("../controllers/lookbook");
const { verifyToken } = require("../middlewares/verifyToken")
const { adminRole } = require("../middlewares/verifyRoles")
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.post("/", verifyToken, adminRole, upload.fields([{name: 'banners'},{name:'cards'}]), addLookbook);
router.patch("/", verifyToken, adminRole, upload.fields([{name: 'banners'},{name:'cards'}]), updateLookbook);
router.get("/", getLookbooks);
router.get("/:id", getLookbook);
router.delete("/:id", verifyToken, adminRole, deleteLookbook);

module.exports = router;
