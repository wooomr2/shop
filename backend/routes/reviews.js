const express = require("express");
const {  getReviews, getReview, addReview, upsertReview } = require("../controllers/review");
const { upload } = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/verifyToken");
const { verifyRoles } = require("../middlewares/verifyRoles");
const ROLES = require("../config/roleList");
const router = express.Router();

router.patch('/', verifyToken, verifyRoles(ROLES.USER), upsertReview);
router.get('/:pid', getReviews);

module.exports = router;