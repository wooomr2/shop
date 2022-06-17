const Brand = require("../models/Brand");
const ErrorResponse = require("../utils/ErrorResponse");

exports.addBrand = async (req, res, next) => {
  const { name, description } = req.body;
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

    let brandObj = {
      name,
      description,
      createdBy: req.userId,
    };
    if (typeof banners !== "undefined") brandObj.banners = banners;
    if (typeof cards !== "undefined") brandObj.cards = cards;

    let brand = await Brand.create(brandObj);

    res.status(201).json({ brand });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.getBrands = (req, res, next) => {
  Brand.find({})
    .sort({ name: 1 })
    .exec()
    .catch((err) => next(new ErrorResponse(err, 400)))
    .then((brands) => res.status(200).json({ brands }));
};

exports.getBrand = (req, res, next) => {
  Brand.findOne({ name: req.params.name })
    .exec()
    .catch((err) => next(new ErrorResponse(err, 400)))
    .then((brand) => res.status(200).json({ brand }));
};

exports.updateBrand = async (req, res, next) => {
  const { _id, name, description } = req.body;
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

    let brand = {
      name,
      description,
      createdBy: req.userId,
    };
    if (typeof banners !== "undefined") brand.banners = banners;
    if (typeof cards !== "undefined") brand.cards = cards;

    let updatedBrand = await Brand.findOneAndUpdate({ _id }, brand, {
      new: true,
    });

    res.status(201).json({ updatedBrand });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.deleteBrand = (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorResponse("Params required", 400));

  Brand.deleteOne({ _id: id })
    .exec()
    .catch((err) => next(new ErrorResponse(err, 400)))
    .then((result) => res.status(201).json({ result, id }));
};
