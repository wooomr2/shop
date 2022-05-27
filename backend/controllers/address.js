const UserAddress = require("../models/Address");


exports.upsertAddress = (req, res, next) => {
  const { user, address } = req.body;
  console.log({ user, address });

  if (!address) return next(new ErrorResponse("주소 전송 안됨", 400));

  if (address._id) {
    UserAddress.findOneAndUpdate(
      { user: user._id, "address._id": address._id },
      {
        $set: {
          "address.$": address,
        },
      },
      { new: true }
    ).exec((err, userAddress) => {
      if (err) return next(new ErrorResponse(err, 400));
      if (userAddress) res.status(201).json({ userAddress });
    });
  } else {
    UserAddress.findOneAndUpdate(
      { user: user._id },
      {
        $push: {
          address: address,
        },
      },
      { new: true, upsert: true }
    ).exec((err, userAddress) => {
      if (err) return next(new ErrorResponse(err, 400));
      if (userAddress) res.status(201).json({ userAddress });
    });
  }
};

exports.getAddress = (req, res) => {
  const { uid } = req.params;
  UserAddress.findOne({ user: uid }).exec((err, userAddress) => {
    if (err) return next(new ErrorResponse(err, 400));
    if (userAddress) {
      res.status(200).json({ userAddress });
    }
  });
};
