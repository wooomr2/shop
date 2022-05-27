const Lookbook = require("../models/Lookbook");
const Product = require("../models/Product");
const ErrorResponse = require("../utils/ErrorResponse");

exports.addLookbook = async (req, res, next) => {
  const { name, description, products } = req.body;
  let { banners, cards } = req.files;
  const productArray = products.split("#");
  
  try {
    if (typeof banners !== "undefined") {
      banners = banners.map((banner) => ({
        img: banner.filename,
      }));
    }
    if (typeof cards !== "undefined") {
      cards = cards.map((card) => ({
        img: card.filename,
      }));
    }

    let lookbookObj = {
      name,
      description,
      products: productArray,
      createdBy: req.user._id,
    };
    if (typeof banners !== "undefined") lookbookObj.banners = banners;
    if (typeof cards !== "undefined") lookbookObj.cards = cards;

    let lookbook = await Lookbook.create(lookbookObj);

    res.status(201).json({ lookbook });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.getLookbooks = (req, res, next) => {
  Lookbook.find({})
    .sort({ timestamps: 1 })
    .exec()
    .catch((err) => next(new ErrorResponse(err, 400)))
    .then((lookbooks) => res.status(200).json({ lookbooks }));
};

exports.getLookbook = async (req, res, next) => {
  try {
    const lookbook = await Lookbook.findById({ _id: req.params.id });

    const relatedProducts = await Product.find({
      _id: { $in: lookbook.products },
    });

    res.status(200).json({ lookbook, relatedProducts });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.updateLookbook = (req, res, next) => {};

exports.deleteLookbook = (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorResponse("Params required", 400));

  Lookbook.deleteOne({ _id: id })
    .exec()
    .catch((err) => next(new ErrorResponse(err, 400)))
    .then((result) => res.status(201).json({ result, id }));
};
