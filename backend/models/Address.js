const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 1,
    max: 50,
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
  },
  pinCode: {
    type: String,
    required: true,
    trim: true,
  },
  address1: {
    type: String,
    required: true,
    trim: true,
    max: 100,
  },
  address2: {
    type: String,
    required: true,
    trim: true,
    max: 100,
  },
  claim: {
    type: String,
    max: 200,
  },
});

/////////////////////////////////////////////////
const userAddressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    address: [addressSchema],
  },
  { timestamps: true }
);

mongoose.model("Address", addressSchema);
module.exports = mongoose.model("UserAddress", userAddressSchema);
