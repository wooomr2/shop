class Features {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search(keyword) {
    keyword
      ? {
          name: {
            //regax:정규표현식
            //options:"i" ->Case insensitivity to match upper and lower cases.
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // Removing fields for additional filter options
    // const removeFields = ["keyword", "page", "perPage"];

    // removeFields.forEach((key) => delete queryCopy[key]);
    this.query = this.query.find(queryCopy);
    return this;
  }

  pagination(perPage, currentPage) {
    const skip = perPage * (currentPage - 1);

    this.query = this.query.limit(perPage).skip(skip);
    return this;
  }

  sort(sort) {
    let sortQuery;

    switch (sort) {
      case "latest":
        sortQuery = { timestamps: 1 };
        break;
      case "ascending":
        sortQuery = { price: 1 };
        break;
      case "descending":
        sortQuery = { price: -1 };
        break;
      default:
    }

    this.query = this.query.sort(sortQuery);
    return this;
  }
}

module.exports = Features;
