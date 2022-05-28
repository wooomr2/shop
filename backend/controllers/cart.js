const ErrorResponse = require("../utils/ErrorResponse");
const Cart = require("../models/Cart");

function updatePromise(condition, update) {
  return new Promise((resolve, reject) => {
    Cart.findOneAndUpdate(condition, update, { new: true, upsert: true })
      .catch((err) => reject(err))
      .then((result) => resolve(result));
  });
}

exports.updateCartItems = (req, res, next) => {
  const { user, cartItems } = req.body;
  const products = cartItems.map((cartItem) => cartItem.product);

  Cart.findOneAndUpdate(
    { user },
    {
      $pull: {
        cartItems: {
          product: { $nin: products },
        },
      },
    },
    {
      new: true,
    }
  ).exec((err, cart) => {
    if (err) return next(new ErrorResponse(err, 400));
    if (cart) {
      let promiseArray = [];

      cartItems.forEach((cartItem) => {
        const product = cartItem.product;
        const item = cart.cartItems.find((c) => c.product == product);

        let condition, update;
        if (item) {
          condition = {
            user,
            "cartItems.product": product,
          };
          update = {
            $set: {
              "cartItems.$": cartItem,
            },
          };
        } else {
          condition = { user };
          update = {
            $push: {
              cartItems: cartItem,
            },
          };
        }

        promiseArray.push(updatePromise(condition, update));
      });

      Promise.all(promiseArray)
        .catch((err) => next(new ErrorResponse(err, 400)))
        .then((response) => res.status(201).json({ response }));
    } else {
      const cart = new Cart({
        user,
        cartItems,
      });
      cart.save((err, cart) => {
        if (err) return next(new ErrorResponse(err, 400));
        if (cart) return res.status(201).json({ cart });
      });
    }
  });
};

exports.addCartItems = (req, res, next) => {
  const { user, cartItems } = req.body;

  Cart.findOne({ user }).exec((err, cart) => {
    if (err) return next(new ErrorResponse(err, 400));
    if (cart) {
      let promiseArray = [];

      cartItems.forEach((cartItem) => {
        const product = cartItem.product;
        const item = cart.cartItems.find((c) => c.product == product);

        let condition, update;

        if (item) {
          condition = {
            user,
            "cartItems.product": product,
          };
          update = {
            $set: {
              "cartItems.$": cartItem,
            },
          };
        } else {
          condition = { user };
          update = {
            $push: {
              cartItems: cartItem,
            },
          };
        }

        promiseArray.push(updatePromise(condition, update));
      });

      Promise.all(promiseArray)
        .catch((err) => next(new ErrorResponse(err, 400)))
        .then((response) => res.status(201).json({ response }));
    } else {
      const cart = new Cart({
        user,
        cartItems,
      });
      cart.save((err, cart) => {
        if (err) return next(new ErrorResponse(err, 400));
        if (cart) return res.status(201).json({ cart });
      });
    }
  });
};

exports.getCartItems = (req, res, next) => {
  const { userId } = req.params;
  Cart.findOne({ user: userId })
    .populate("cartItems.product", "_id name price productImgs")
    .exec((err, cart) => {
      if (err) return next(new ErrorResponse(err, 400));
      if (cart) {
        let cartItems = [];
        cartItems = cart.cartItems.map((item) => ({
          _id: item.product._id,
          name: item.product.name,
          img: item.product.productImgs[0].fileName,
          price: item.product.price,
          qty: item.quantity,
        }));
        res.status(200).json({ cartItems });
      }
    });
};

exports.removeCartItems = (req, res, next) => {
  const { user, cartItems } = req.body;
  const products = cartItems.map((cartItem) => cartItem.product);

  Cart.findOneAndUpdate(
    { user },
    {
      $pull: {
        cartItems: {
          product: { $nin: products },
        },
      },
    },
    {
      new: true,
    }
  ).exec((err, cart) => {
    if (err) return next(new ErrorResponse(err, 400));
    if (cart) res.status(202).json({ cart });
  });
};
