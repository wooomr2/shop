const express = require("express");
const { addCollection, getCollections, getCollection, deleteCollection, updateCollection } = require("../controllers/collection");
const { verifyToken, adminAuth } = require("../middlewares/auth");
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.post("/", verifyToken, adminAuth, upload.fields([{name: 'banners'},{name:'cards'}]), addCollection);
router.get("/", getCollections);
router.get("/:id", getCollection);
router.patch("/", verifyToken, adminAuth, upload.fields([{name: 'banners'},{name:'cards'}]), updateCollection);
router.delete("/:id", verifyToken, adminAuth, deleteCollection);

module.exports = router;
