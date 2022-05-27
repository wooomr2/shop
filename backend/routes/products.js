const express = require("express");
const { addProduct, getProducts, getProduct, updateProduct, deleteProduct, getProductsByBrand, getProductsByCategories } = require("../controllers/product");
const { verifyToken, adminAuth } = require("../middlewares/auth");
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.post("/", verifyToken, adminAuth, upload.array("productImg"), addProduct);
router.post("/cate", getProductsByCategories)
router.post("/brand", getProductsByBrand);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.patch("/", verifyToken, adminAuth, upload.array("productImg"), updateProduct);
router.delete("/:id", verifyToken, adminAuth, deleteProduct);

module.exports = router;