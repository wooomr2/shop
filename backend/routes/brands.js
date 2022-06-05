const express = require("express");
const { addBrand, getBrands, getBrand, deleteBrand, updateBrand } = require("../controllers/brand");
const { verifyToken, adminAuth } = require("../middlewares/auth");
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.post("/", verifyToken, adminAuth, upload.fields([{name: 'banners'},{name:'cards'}]), addBrand);
router.get("/", getBrands);
router.get("/:name", getBrand);
router.patch("/", verifyToken, adminAuth, upload.fields([{name: 'banners'},{name:'cards'}]), updateBrand);
router.delete("/:id", verifyToken, adminAuth, deleteBrand);

module.exports = router;
