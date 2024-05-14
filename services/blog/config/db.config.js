const { default: mongoose } = require("mongoose");

module.exports = mongoose
  .connect("mongodb://localhost:27017/RestAPI-gRPC")
  .then(() => console.log("Connected to DB!"))
  .catch((err) => console.log(err.message));
