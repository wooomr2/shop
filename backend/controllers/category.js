const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const slugify = require("slugify");
const Category = require("../models/Category");

function createCategoryHierarchy(categories, parentId = null) {
  const categoryList = [];
  let cates;
  if (parentId == null)
    cates = categories.filter((cat) => cat.parentId == undefined);
  else cates = categories.filter((cat) => cat.parentId == parentId);

  //for in : 객체 //for of : [Symbol.iterator]를 가지는 컬렉션 전용
  for (let cate of cates) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      viewType: cate.viewType,
      categoryImg: cate.categoryImg,
      children: createCategoryHierarchy(categories, cate._id),
    });
  }
  return categoryList;
}

exports.addCategory = async (req, res, next) => {
  const { name, parentId, viewType } = req.body;

  try {
    const categoryObj = {
      name,
      slug: slugify(name),
      createdBy: req.userId,
    };
    if (parentId) categoryObj.parentId = parentId;
    if (viewType) categoryObj.viewType = viewType;
    if (req.file) categoryObj.categoryImg = req.file.filename;

    const category = await Category.create(categoryObj);

    res.status(201).json(category);
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.getCategories = (req, res, next) => {
  Category.find({})
    .exec()
    .catch((err) => next(new ErrorResponse(err, 400)))
    .then((categories) => {
      const categoryList = createCategoryHierarchy(categories);
      res.status(200).json(categoryList);
    });
};


exports.updateCategories = async (req, res, next) => {
  const { _id, name, parentId, viewType } = req.body;
  const updatedCategories = [];

  let categoryImg = [];
  if (req.files.length > 0) {
    categoryImg = req.files.map((file) => {
      return file.filename;
    });
  }

  try {
    //객체 타입이 맞으면 true 아니면 false
    //배열이면
    if (_id instanceof Array) {
      for (let i = 0; i < _id.length; i++) {
        const category = {
          name: name[i],
          viewType: viewType[i],
          slug: slugify(name[i]),
        };
        if (parentId[i] !== "") category.parentId = parentId[i];
        if (categoryImg[i] !== "") category.categoryImg = categoryImg[i];

        const updatedCategory = await Category.findOneAndUpdate(
          { _id: _id[i] },
          category,
          { new: true }
        );
        updatedCategories.push(updatedCategory);
      }

      return res.status(201).json({ updatedCategories });
    }
    //단일 업데이트면
    else {
      const category = {
        name,
        slug: slugify(name),
        viewType,
      };
      if (parentId !== "") category.parentId = parentId;
      if (categoryImg[0] !== "") category.categoryImg = categoryImg[0];

      const updatedCategory = await Category.findOneAndUpdate(
        { _id },
        category,
        {
          new: true,
        }
      );

      return res.status(201).json({ updatedCategory });
    }
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};

exports.deleteCategories = async (req, res, next) => {
  const ids = req.body;
  const deletedCategories = [];
  const updatedCategories = [];
  try {
    for (let i = 0; i < ids.length; i++) {
      const deleteCategory = await Category.findOneAndDelete({
        _id: ids[i]._id,
        createdBy: req.userId,
      });
      deletedCategories.push(deleteCategory);

      //$unset : column삭제
      const updateCategory = await Category.findOneAndUpdate(
        {
          parentId: ids[i]._id,
        },
        { $unset: { parentId: "" } },
        {
          new: true,
        }
      );
      updatedCategories.push(updateCategory);
    }

    if (deletedCategories.length == ids.length) {
      res.status(201).json({ deletedCategories, updatedCategories });
    }
  } catch (err) {
    return next(new ErrorResponse(err, 400));
  }
};
