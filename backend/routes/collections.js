const express = require("express");
const { addCollection, getCollections, getCollection, deleteCollection, updateCollection } = require("../controllers/collection");
const { verifyToken} = require("../middlewares/verifyToken")
const { adminRole } = require("../middlewares/verifyRoles")
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.post("/", verifyToken, adminRole, upload.fields([{name: 'banners'},{name:'cards'}]), addCollection);
router.patch("/", verifyToken, adminRole, upload.fields([{name: 'banners'},{name:'cards'}]), updateCollection);
router.get("/", getCollections);
router.get("/:id", getCollection);
router.delete("/:id", verifyToken, adminRole, deleteCollection);

module.exports = router;
