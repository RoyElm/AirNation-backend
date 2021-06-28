global.config = require(process.env.NODE_ENV === "production" ? "./env/config-prod.json" : "./env/config-dev.json");
const express = require("express");
const authController = require("./controller-layer/auth-controller");
const adminController = require("./controller-layer/admin-controller");
const flightController = require("./controller-layer/flight-controller");
const articleController = require("./controller-layer/article-controller");
const orderFlightController = require("./controller-layer/order-flight-controller");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const server = express();
const path = require("path");
// Enable sending an receiving cookies from the front:

//Enabling cors to access from all ip address, allowing json as response and allowing file uploading.
server.use(cors())
server.use(express.json());
server.use(fileUpload());

//ExpressJS Routes to controllers.
server.use("/api/auth", authController);
server.use("/api/admin", adminController);
server.use("/api/article", articleController);
server.use("/api/flight", flightController);
server.use("/api/order-flight", orderFlightController);

server.use("*", (request, response) => {
    response.sendFile(path.join(__dirname, "./dist/index.html"))
});

server.listen(3001, () => console.log("Listening...."));