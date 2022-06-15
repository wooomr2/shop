const express = require("express");
const { addProduct, getProducts, getProduct, updateProduct, deleteProduct, getProductsByBrand, getProductsByCategories } = require("../controllers/product");
const { verifyToken } = require("../middlewares/verifyToken")
const { adminRole } = require("../middlewares/verifyRoles")
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.post("/", verifyToken, adminRole, upload.array("productImg"), addProduct);
router.post("/cate", getProductsByCategories)
router.post("/brand", getProductsByBrand);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.patch("/", verifyToken, adminRole, upload.array("productImg"), updateProduct);
router.delete("/:id", verifyToken, adminRole, deleteProduct);

module.exports = router;