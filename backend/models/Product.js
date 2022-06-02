const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: { 
      //grossSales
      type: Number,
      required: true,
    },
    discountPrice: {
      type:Number,
    },
    code:{
      type:String,
    },

    color: {
      type:String,
    },

    stock: [{ size: { type: String }, qty: { type: Number } }],
    description: {
      type: String,
      trim: true,
    },
    productImgs: [{ fileName: { type: String } }],
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: Number,
        review: String,
      }, //review 따로 분리해야하나
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    filters: [{ type: String }],
    brand: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
