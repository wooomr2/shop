const mongoose = require("mongoose");

const connString = process.env.MONGO_URI;

const connectDB = () => {
  mongoose
    .connect(connString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB connection SUCCESS!!"))
    .catch((err) => {
      console.log("MongoDB connection FAILURE!!");
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectDB;
