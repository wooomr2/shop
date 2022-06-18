const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const slugify = require("slugify");
const Product = require("../models/Product");
const mongoose = require("mongoose");
const Features = require("../utils/Features");
const ObjectId = mongoose.Types.ObjectId;

exports.addProduct = async (req, res, next) => {
  const {
    name,
    price,
    quantity,
    description,
    brand,
    category,
    discountPrice,
    code,
    color,
    stock,
  } = req.body;
  const stockArray = stock.split(",").map((stock) => ({
    size: stock.split(":")[0],
    qty: stock.split(":")[1],
  }));
  let productImgs = [];

  try {
    if (req.files.length > 0) {
      productImgs = req.files.map((file) => {
        return { fileName: file.filename };
      });
    }
    let product = await Product.create({
      name: name,
      slug: slugify(name),
      price,
      quantity,
      description,
      brand,
      productImgs,
      category,
      discountPrice,
      code,
      color,
      stock: stockArray,
      createdBy: req.userId,
    });

    product = await product.populate({
      path: "category",
      select: "_id name",
    });
    res.status(201).json({ product });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

//ADMIN
exports.getProducts = (req, res, next) => {
  Product.find({})
    .populate({ path: "category", select: "_id name" })
    .exec()
    .catch((err) => next(new ErrorResponse(err, 400)))
    .then((products) => res.status(200).json({ products }));
};

exports.getProductsByCategories = async (req, res, next) => {
  let { cids, brands, perPage, currentPage, sort, ...queryStr } = req.body;
  let findQuery;
  let matchQuery;

  if (cids?.length > 0) {
    cids = cids.map((cid) => new ObjectId(cid));

    brands && brands.length > 0
      ? (findQuery = {
          $and: [{ category: { $in: cids } }, { brand: { $in: brands } }],
        })
      : (findQuery = { category: { $in: cids } });

    matchQuery = { category: { $in: cids } };
  } else {
    brands && brands.length > 0
      ? (findQuery = { brand: { $in: brands } })
      : (findQuery = {});

    matchQuery = {};
  }

  try {
    const total = await Product.countDocuments(findQuery);

    const feature = new Features(Product.find(findQuery), queryStr)
      .search()
      .filter()
      .pagination(perPage, currentPage)
      .sort(sort);

    const products = await feature.query;

    const brandData = await Product.aggregate([
      { $match: matchQuery },
      {
        //select
        $project: {
          brand: 1,
        },
      },
      {
        $group: {
          _id: "$brand",
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({ products, brandData, total });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.getProductsByBrand = async (req, res, next) => {
  let { brand, perPage, currentPage, sort, ...queryStr } = req.body;

  try {
    const total = await Product.countDocuments({ brand });

    const feature = new Features(Product.find({ brand }), queryStr)
      .search()
      .filter()
      .pagination(perPage, currentPage)
      .sort(sort);

    const products = await feature.query;
    res.status(200).json({ products, total });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.getProductsBySearch = async (req, res, next) => {
  let { keyword, perPage, currentPage, sort, ...queryStr } = req.body;

  try {
    const total = await Product.countDocuments({});

    const feature = new Features(Product.find({}), queryStr)
      .search(keyword)
      .filter()
      .pagination(perPage, currentPage)
      .sort(sort);

    const products = await feature.query;
    res.status(200).json({ products, total });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.getProduct = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorResponse("Params required", 400));

  try {
    const product = await Product.findOne({ _id: id });
    let relatedProducts;
    
    if (typeof product.code === "undefined") relatedProducts = [];
    else relatedProducts = await Product.find({ code: product.code });

    res.status(200).json({ product, relatedProducts });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.updateProduct = async (req, res, next) => {
  const {
    _id,
    name,
    price,
    quantity,
    description,
    brand,
    category,
    discountPrice,
    code,
    color,
    stock,
  } = req.body;

  const stockArray = stock.split(",").map((stock) => ({
    size: stock.split(":")[0],
    qty: stock.split(":")[1],
  }));

  let productImgs = [];

  try {
    if (req.files.length > 0) {
      productImgs = req.files.map((file) => {
        return { fileName: file.filename };
      });
    }

    const product = {
      name: name,
      slug: slugify(name),
      price,
      quantity,
      description,
      brand,
      category,
      discountPrice,
      code,
      color,
      stock: stockArray,
      createdBy: req.userId,
    };
    if (productImgs.length > 0) product.productImgs = productImgs;

    //new:true => update된 객체 return 받음
    let updatedProduct = await Product.findOneAndUpdate({ _id }, product, {
      new: true,
    });

    updatedProduct = await updatedProduct.populate({
      path: "category",
      select: "_id name",
    });

    res.status(201).json({ updatedProduct });
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.deleteProduct = (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new ErrorResponse("Params required", 400));

  Product.deleteOne({ _id: id })
    .exec()
    .catch((err) => next(new ErrorResponse(err, 400)))
    .then((result) => res.status(201).json({ result, id }));
};
