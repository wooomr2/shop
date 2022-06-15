const express = require("express");
const {  getReviews, getReview, addReview, upsertReview } = require("../controllers/review");
const { verifyToken, userAuth } = require("../middlewares/auth");
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.patch('/', verifyToken, userAuth, upsertReview);
router.get('/:pid', getReviews);

module.exports = router;