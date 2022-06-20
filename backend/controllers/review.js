const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const ProductReview = require("../models/Review");
const Product = require("../models/Product");

exports.upsertReview = async (req, res, next) => {
  const { pid, review } = req.body;
  console.log({ pid, review });
  let productReview;

  if (!review) return next(new ErrorResponse("리뷰 전송 안됨", 400));
  try {
    if (review._id) {
      productReview = await ProductReview.findOneAndUpdate(
        { product: pid, "reviews._id": review._id },
        {
          $set: {
            "reviews.$": review,
          },
        },
        { new: true }
      );
    } else {
      productReview = await ProductReview.findOneAndUpdate(
        { product: pid },
        {
          $push: {
            reviews: review,
          },
        },
        { new: true, upsert: true }
      );
    }

    const total = productReview.reviews.length;
    const sum = productReview.reviews
      .reduce((sum, review) => sum + review.rating, 0)
      .toFixed(1);
    const avg = (sum / total).toFixed(1);

    const product = await Product.findOneAndUpdate(
      { _id: pid },
      {
        $set: { ratings: { total, sum, avg } },
      },
      { upsert: true, new: true }
    );

    res.status(201).json({ productReview, product });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.getReviews = async (req, res, next) => {
  const { pid } = req.params;
  if (!pid) return next(new ErrorResponse("Params required", 400));

  try {
    let productReview = await ProductReview.find({ product: pid });
    if (productReview)
      productReview = await ProductReview.findOne({ product: pid });

    res.status(200).json({ productReview });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};
