const express = require("express");
const { addProduct, getProducts, getProduct, updateProduct, deleteProduct, getProductsByBrand, getProductsByCategories, getProductsByKeyword } = require("../controllers/product");
const { upload } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/verifyToken")
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();

router.post("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.array("productImg"), addProduct);
router.post("/cate", getProductsByCategories)
router.post("/brand", getProducts);
router.post("/keyword", getProducts);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.patch("/", verifyToken, verifyRoles(ROLES.ADMIN), upload.array("productImg"), updateProduct);
router.delete("/:id", verifyToken, verifyRoles(ROLES.ADMIN), deleteProduct);

module.exports = router;