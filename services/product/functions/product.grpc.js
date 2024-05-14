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

async function updateProduct(call, callback) {
  try {
    const { id, ...updateData } = call.request;
    if (!id) {
      return callback({ message: "Invalid update request: Missing ID" }, null);
    }

    // Check if the document with the given ID exists
    const existingProduct = await ProductModel.findOne({ id });
    if (!existingProduct) {
      return callback({ message: "Product not found" }, null);
    }

    // Update the fields specified in updateData using Mongoose's $set operator
    const result = await ProductModel.updateOne({ id }, { $set: updateData });

    if (result.modifiedCount > 0) {
      return callback(null, { status: "Updated!" });
    } else {
      return callback({ message: "No fields modified, update skipped" }, null);
    }
  } catch (error) {
    console.error("Error in updateProduct:", error);
    callback(error, null);
  }
}

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
