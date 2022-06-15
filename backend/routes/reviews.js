const express = require("express");
const {  getReviews, getReview, addReview, upsertReview } = require("../controllers/review");
const { verifyToken } = require("../middlewares/verifyToken")
const { userRole } = require("../middlewares/verifyRoles")
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.patch('/', verifyToken, userRole, upsertReview);
router.get('/:pid', getReviews);

module.exports = router;