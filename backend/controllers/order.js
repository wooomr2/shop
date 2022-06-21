const ErrorResponse = require("../utils/ErrorResponse");
const Feature = require("../utils/Feature");
const asyncHandler = require("../middlewares/asyncHandler");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");

function updatePromise(condition, update) {
  return new Promise((resolve, reject) => {
    Product.findOneAndUpdate(condition, update, { new: true })
      .catch((err) => reject(err))
      .then((result) => resolve(result));
  });
}

exports.addOrder = asyncHandler(async (req, res, next) => {
  const result = await Cart.deleteOne({ user: req.userId }).exec();

  let promiseArray = [];

  const { items } = req.body;

  items.forEach((item) => {
    let condition, update;

    condition = {
      _id: item._id,
      "stock.size": item.size,
    };
    update = {
      $inc: {
        "stock.$.qty": -item.qty,
      },
    };

    promiseArray.push(updatePromise(condition, update));
  });

  Promise.all(promiseArray)
    .catch((err) => next(new ErrorResponse(err, 400)))
    .then((response) => console.log(response));

  // const point = req.body.totalPrice;
  const user = await User.findOneAndUpdate(
    { _id: req.userId },
    { $inc: { point: +(req.body.totalPrice / 100).toFixed() } }
  );

  req.body.orderStatus = [
    {
      type: "ordered",
      date: new Date(),
      isCompleted: true,
    },
    {
      type: "packed",
      isCompleted: false,
    },
    {
      type: "shipped",
      isCompleted: false,
    },
    {
      type: "delivered",
      isCompleted: false,
    },
  ];

  const order = await Order.create(req.body);

  res.status(201).json({ order });
});

exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({}).sort({ createdAt: -1 }).exec();

  res.status(200).json({ orders });
});

exports.getOrders = asyncHandler(async (req, res) => {
  const total = await Order.find({ user: req.userId }).countDocuments();
  const orders = await new Feature(Order.find({ user: req.userId }), req.body)
    .pagination()
    .sort()
    .getQuery();

  res.status(200).json({ total, orders });
});

exports.getOrder = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorResponse("Params required", 400));
  const order = await Order.findById(id).exec();

  res.status(200).json({ order });
});
