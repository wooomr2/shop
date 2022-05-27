const mongoose = require("mongoose");

const filterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  filterList: [{ type: String }],
});

module.exports = mongoose.model("Filter", filterSchema);
