require("dotenv").config();
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();
// const morgan = require("morgan");

connectDB();
// app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use("/api/admin/auth", require("./routes/admin/auth"));
app.use("/api/address", require("./routes/address"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/brands", require("./routes/brands"));
app.use("/api/carts", require("./routes/carts"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/collections", require("./routes/collections"));
app.use("/api/lookbooks", require("./routes/lookbooks"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/products", require("./routes/products"));
app.use("/api/screens", require("./routes/sceeens"));
app.use("/api/stripe", require("./routes/stripe"));

//Error Handler(Should be last piece of middleware)
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});

//200 OK
//201 CREATED (as a result of POST)
//202 Accepted

//400: bad request
//401: Unauthorized
//402: Payment Required
//403: Forbidden
//404: not found (URL...)

//500: internal server error

//터미널에서 randomString 받는 법
//node
//require('crypto').randomBytes(35).toString("hex")
