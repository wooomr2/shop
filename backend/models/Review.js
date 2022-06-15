const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String },
    rating: { type: Number },
    comment: { type: String },
  },
  { timestamps: true }
);

/////////////////////////////////////////////////
const productReviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  total: {
    type: Number,
  },
  totalRating: {
    type: Number,
  },
  averageRating: {
    type: Number,
  },
  reviews: [reviewSchema],
});

mongoose.model("Review", reviewSchema);
module.exports = mongoose.model("ProductReview", productReviewSchema);
