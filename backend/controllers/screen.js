const ErrorResponse = require("../utils/ErrorResponse");
const Screen = require("../models/Screen");

exports.addScreen = async (req, res, next) => {
  const { title, description, category } = req.body;
  let { banners, cards } = req.files;
  console.log({banners, cards});
  try {
    // if (banners && banners.length > 0) {
      if (typeof banners !== "undefined") {
      banners = banners.map((banner) => ({
        img: banner.filename,
        navigateTo: `/categories/:${category}`,
      }));
    }
    if (typeof cards !== "undefined") {
      cards = cards.map((card) => ({
        img: card.filename,
        navigateTo: `/categories/:${category}`,
      }));
    }

    let screenObj = {
      title,
      description,
      createdBy: req.userId,
    };
    if (category !== "") screenObj.category = category;
    if (typeof banners !== "undefined") screenObj.banners = banners;
    if (typeof cards !== "undefined") screenObj.cards = cards;

    let screen = await Screen.create(screenObj);
    screen = await screen.populate({
      path: "category",
      select: "_id name",
    });

    res.status(201).json({ screen });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.getScreens = (req, res, next) => {
  Screen.find({})
    .populate({ path: "category", select: "_id name" })
    .sort({ category: 1 })
    .exec()
    .catch((err) => next(new ErrorResponse(err, 400)))
    .then((screens) => res.status(200).json({ screens }));
};

exports.getScreen = (req, res) => {
  const { cid } = req.params;
    Screen.findOne({ category: cid })
      .exec()
      .catch((err) => next(new ErrorResponse(err, 400)))
      .then(screen => res.status(200).json({screen}));
};

exports.updateScreen = (req, res, next) => {};

exports.deleteScreen = (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorResponse("Params required", 400));

  Screen.deleteOne({ _id: id })
    .exec()
    .catch((err) => next(new ErrorResponse(err, 400)))
    .then((result) => res.status(201).json({ result, id }));
};
