require("./config/db.config");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const protoPath = path.join(__dirname, "..", "..", "protos", "product.proto");
const productProto = protoLoader.loadSync(protoPath);
const { ProductPackage } = grpc.loadPackageDefinition(productProto);
const productServiceURL = "localhost:4001";

const {
  productList,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("./functions/product.grpc");

function main() {
  const server = new grpc.Server();
  server.addService(ProductPackage.ProductService.service, {
    productList,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
  });
  server.bindAsync(
    productServiceURL,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) return console.error(err);
      console.log("gRPC productService running over port " + port);
    }
  );
}
main();
