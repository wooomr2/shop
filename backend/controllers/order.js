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

  const { items, totalPrice, usedPoint } = req.body;

  items.forEach((item) => {
    let condition, update;

    condition = {
      _id: item._id,
      "stock.size": item.size,
    };
    update = {
      $inc: {
        grossSales: +item.qty * item.price,
        salesRate: +item.qty,
        "stock.$.qty": -item.qty,
      },
    };

    promiseArray.push(updatePromise(condition, update));
  });

  Promise.all(promiseArray)
    .catch((err) => next(new ErrorResponse(err, 400)))
    .then((response) => console.log(response));

  const user = await User.findOneAndUpdate(
    { _id: req.userId },
    { $inc: { point: +(totalPrice / 100).toFixed() - usedPoint } }
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

  req.body.paymentStatus = "completed";

  const order = await Order.create(req.body);

  res.status(201).json({ order });
});

exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find({}).sort({ createdAt: -1 }).exec();

  res.status(200).json({ orders });
});

exports.getOrders = asyncHandler(async (req, res) => {
  const total = await Order.find({ "user._id": req.userId }).countDocuments();
  const orders = await new Feature(
    Order.find({ "user._id": req.userId }),
    req.body
  )
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

exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { _id, type } = req.body;
  console.log(_id, type);

  //orderStatus ["ordered", "packed", "shipped", "delivered"] 변경
  const updatedOrder = await Order.findOneAndUpdate(
    { _id, "orderStatus.type": type },
    {
      $set: {
        "orderStatus.$": [{ type, date: new Date(), isCompleted: true }],
      },
    },
    { new: true }
  ).exec();

  res.status(201).json({ updatedOrder });
});

exports.updatePaymentStatus = asyncHandler(async (req, res, next) => {
  const { _id, paymentStatus } = req.body;

  // paymentStatus ["pending", "completed", "cancelled", "refund"] 변경
  const updatedOrder = await Order.findOneAndUpdate(
    { _id },
    {
      $set: {
        paymentStatus,
      },
    },
    { new: true }
  ).exec();

  console.log(updatedOrder);

  res.status(201).json({ updatedOrder });
});
