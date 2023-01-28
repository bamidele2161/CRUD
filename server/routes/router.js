const express = require("express");
const route = express.Router(); //allows us to create different routes
const controller = require("../controller/auth/controller");
const verifyToken = require("../middleware/authMiddleware");

const services = require("../services/render");
route.get("/", services.homeRoute);

route.get("/add-user", services.add_user);

route.get("/update-user", services.update_user);

//API
route.post("/api/register", controller.register);
route.get("/api/users", controller.getProfile);
route.post("/api/login", controller.login);
route.put("/api/user/:id", verifyToken, controller.updateUser);
route.delete("/api/user/:id", verifyToken, controller.delete);

module.exports = route;
