const Collection = require("../models/Collection");
const ErrorResponse = require("../utils/ErrorResponse");

exports.addCollection = async (req, res, next) => {
  const { name, description, brand, launched, director, country, shop, priority } =
    req.body;
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

    let collectionObj = {
      name,
      description,
      brand,
      launched,
      director,
      country,
      shop,
      priority,
      createdBy: req.userId,
    };
    if (typeof banners !== "undefined") collectionObj.banners = banners;
    if (typeof cards !== "undefined") collectionObj.cards = cards;

    let collection = await Collection.create(collectionObj);

    res.status(201).json({ collection });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.getCollections = (req, res, next) => {
  Collection.find({})
    .sort({ timestamps: 1 })
    .exec()
    .catch((err) => next(new ErrorResponse(err, 400)))
    .then((collections) => res.status(200).json({ collections }));
};

exports.getCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findById({ _id: req.params.id });

    res.status(200).json({ collection });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.updateCollection = async (req, res, next) => {
  const { _id, name, description, brand, launched, director, country, shop,priority } =
    req.body;
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

    let collection = {
      name,
      description,
      brand,
      launched,
      director,
      country,
      shop,
      priority,
      createdBy: req.userId,
    };
    if (typeof banners !== "undefined") collection.banners = banners;
    if (typeof cards !== "undefined") collection.cards = cards;

    let updatedCollection = await Collection.findOneAndUpdate(
      { _id },
      collection,
      {
        new: true,
      }
    );

    res.status(201).json({ updatedCollection });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.deleteCollection = (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorResponse("Params required", 400));

  Collection.deleteOne({ _id: id })
    .exec()
    .catch((err) => next(new ErrorResponse(err, 400)))
    .then((result) => res.status(201).json({ result, id }));
};
