require("./config/db.config");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const protoPath = path.join(__dirname, "..", "..", "protos", "blog.proto");
const blogProto = protoLoader.loadSync(protoPath);
const { BlogPackage } = grpc.loadPackageDefinition(blogProto);
const blogServiceURL = "localhost:4002";

// const {
//   productList,
//   createProduct,
//   getProduct,
//   updateProduct,
//   deleteProduct,
// } = require("./functions/product.grpc");

function main() {
  const server = new grpc.Server();
  server.addService(BlogPackage.BlogService.service, {});
  server.bindAsync(
    blogServiceURL,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) return console.error(err);
      console.log("gRPC BlogService running over port " + port);
    }
  );
}
main();
