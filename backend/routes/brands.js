const express = require("express");
const { addBrand, getBrands, getBrand, deleteBrand, updateBrand } = require("../controllers/brand");
const { verifyToken } = require("../middlewares/verifyToken")
const { adminRole } = require("../middlewares/verifyRoles")
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.post("/", verifyToken, adminRole, upload.fields([{name: 'banners'},{name:'cards'}]), addBrand);
router.patch("/", verifyToken, adminRole, upload.fields([{name: 'banners'},{name:'cards'}]), updateBrand);
router.get("/", getBrands);
router.get("/:name", getBrand);
router.delete("/:id", verifyToken, adminRole, deleteBrand);

module.exports = router;
