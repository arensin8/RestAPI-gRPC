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

async function getProduct(call, callback) {}

async function updateProduct(call, callback) {}

async function deleteProduct(call, callback) {}

module.exports = {
  productList,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
