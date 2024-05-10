const productModel = require("../model/product.model");
const { ProductModel } = require("../model/product.model");

async function productList(call, callback) {
  try {
    const products = await ProductModel.find({});
    callback(null, { products });
  } catch (error) {
    callback(null, error);
  }
}
async function createProduct(call, callback) {
  try {
    const { title, price } = call.request;
    await ProductModel.create({ title, price });
    callback(null, { status: "created" });
  } catch (error) {
    callback(error, null);
  }
}

async function getProduct(call, callback) {
  try {
    const { id } = call.request;
    const product = await ProductModel.findOne({ id });
    callback(null, product);
  } catch (error) {
    callback(error, null);
  }
}

async function updateProduct(call, callback) {}

async function deleteProduct(call, callback) {
  try {
    const { id } = call.request;
    const result = await ProductModel.deleteOne({ id });
    if (result.deletedCount > 0) return callback(null, { status: "Deleted" });
    return callback({ message: "Deleting failed" }, null);
  } catch (error) {
    callback(error, null);
  }
}

module.exports = {
  productList,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
