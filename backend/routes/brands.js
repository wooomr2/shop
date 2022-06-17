const express = require("express");
const { addBrand, getBrands, getBrand, deleteBrand, updateBrand } = require("../controllers/brand");
const { upload } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/verifyToken")
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();

router.post("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.fields([{name: 'banners'},{name:'cards'}]), addBrand);
router.patch("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.fields([{name: 'banners'},{name:'cards'}]), updateBrand);
router.get("/", getBrands);
router.get("/:name", getBrand);
router.delete("/:id", verifyToken, verifyRoles(ROLES.ADMIN), deleteBrand);

module.exports = router;
