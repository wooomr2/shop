const ErrorResponse = require("../utils/ErrorResponse");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const UserAddress = require("../models/Address");
const asyncHandler = require("../middlewares/asyncHandler");

exports.addOrder = (req, res) => {
  console.log(req.body);
  Cart.deleteOne({ user: req.body.user }).exec((err, result) => {
    if (err) next(new ErrorResponse(err, 400));
    if (result) {
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
      const order = new Order(req.body);
      order.save((err, order) => {
        if (err) next(new ErrorResponse(err, 400));
        if (order) {
          res.status(201).json({ order });
        }
      });
    }
  });
};

exports.getAllOrders = asyncHandler(async (req, res, next) => {});

exports.getOrdersByUserId = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.userId })
    .select("_id paymentStatus paymentType orderStatus items")
    .populate("items.product", "_id name productImgs")
    .exec();

  res.status(200).json({ orders });
});

exports.getOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("items.product", "_id name color brand productImgs")
    .exec();

  const userAddress = await UserAddress.findOne({
    user: order.user,
  }).exec();

  const shippingAddress = userAddress.address.find(
    (addr) => addr._id.toString() === order.address.toString()
  );

  res.status(200).json({ order, shippingAddress });
});
