const Lookbook = require("../models/Lookbook");
const Product = require("../models/Product");
const ErrorResponse = require("../utils/ErrorResponse");

exports.addLookbook = async (req, res, next) => {
  const { name, description, products, modelInfo, wearingSize } = req.body;
  let { banners, cards } = req.files;
  
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
      modelInfo,
      wearingSize,
      products,
      createdBy: req.userId,
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

exports.updateLookbook = async (req, res, next) => {
  const { _id, name, description, products, modelInfo, wearingSize } = req.body;
  let { banners, cards } = req.files;
  console.log(req.body, req.files);

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

    let lookbook = {
      name,
      description,
      modelInfo,
      wearingSize,
      products,
      createdBy: req.userId,
    };
    if (typeof banners !== "undefined") lookbook.banners = banners;
    if (typeof cards !== "undefined") lookbook.cards = cards;

    let updatedLookbook = await Lookbook.findOneAndUpdate({ _id }, lookbook, {
      new: true,
    });

    res.status(201).json({ updatedLookbook });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
}

exports.deleteLookbook = (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorResponse("Params required", 400));

  Lookbook.deleteOne({ _id: id })
    .exec()
    .catch((err) => next(new ErrorResponse(err, 400)))
    .then((result) => res.status(201).json({ result, id }));
};
