const express = require("express");
const route = express.Router(); //allows us to create different routes
const controller = require("../controller/auth/controller");

const services = require("../services/render");
route.get("/", services.homeRoute);

route.get("/add-user", services.add_user);

route.get("/update-user", services.update_user);

//API
route.post("/api/user", controller.create);
route.get("/api/users", controller.find);
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);
route.post("/api/login", controller.login);

module.exports = route;
