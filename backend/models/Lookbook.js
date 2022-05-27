const mongoose = require("mongoose");
const lookbookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    banners: [
      {
        img: { type: String },
      },
    ],
    cards: [
      {
        img: { type: String },
      },
    ],
    products: [],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lookbook", lookbookSchema);
