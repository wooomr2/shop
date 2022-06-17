const ErrorResponse = require("../utils/ErrorResponse");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Address = require("../models/Address");

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

exports.getOrdersByUserId = (req, res) => {
  Order.find({ user: req.params.uid })
    .select("_id paymentStatus paymentType orderStatus items")
    .populate("items.product", "_id name productImgs")
    .exec((error, orders) => {
      if (error) return res.status(400).json({ error });
      if (orders) {
        res.status(200).json({ orders });
      }
    });
};

exports.getOrder = (req, res) => {
  Order.findOne({ _id: req.body.orderId })
    .populate("items.productId", "_id name productPictures")
    .lean()
    .exec((error, order) => {
      if (error) return res.status(400).json({ error });
      if (order) {
        Address.findOne({
          user: req.userId,
        }).exec((error, address) => {
          if (error) return res.status(400).json({ error });
          order.address = address.address.find(
            (adr) => adr._id.toString() == order.addressId.toString()
          );
          res.status(200).json({
            order,
          });
        });
      }
    });
};
