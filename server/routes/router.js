const express = require("express");
const route = express.Router(); //allows us to create different routes
const controller = require("../controller/auth/controller");
const verifyToken = require("../middleware/authMiddleware");

const services = require("../services/render");
route.get("/", services.homeRoute);

route.get("/add-user", services.add_user);

route.get("/update-user", services.update_user);

//API
route.post("/api/user", controller.create);
route.get("/api/users", controller.find);
route.post("/api/login", controller.login);
route.put("/api/user/:id", verifyToken, controller.update);
route.delete("/api/user/:id", controller.delete);

module.exports = route;
