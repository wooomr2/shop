const express = require("express");
const { addBrand, getBrands, getBrand, deleteBrand, updateBrand, getNewBrands } = require("../controllers/brand");
const { upload } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/verifyToken")
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();

router.post("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.fields([{name: 'banners'}]), addBrand);
router.patch("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.fields([{name: 'banners'}]), updateBrand);
router.delete("/:id", verifyToken, verifyRoles(ROLES.ADMIN), deleteBrand);
router.get("/", getBrands);
router.get("/new", getNewBrands);
router.get("/:name", getBrand);

module.exports = router;
