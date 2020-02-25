"use strict";

const express = require("express");
const ProductController = require("../controllers/product");
const UserController = require("../controllers/user");
const auth = require("../middlewares/auth");
const api = express.Router();

api.get("/products", auth, ProductController.getProducts);
api.get("/product/:productId", ProductController.getProduct);
api.post("/product", ProductController.createProduct);
api.put("/product/:productId", ProductController.updateProduct);
api.delete("/product/:productId", ProductController.deleteProduct);
api.get("/private", auth, (req, res) => {
  res.status(200).send({ message: "Tienes acceso" });
});

api.get("/users", UserController.getUsers);
api.delete("/user/:userId", UserController.deleteUser);
api.post("/signup", UserController.signUp);
api.post("/signin", UserController.signIn);

module.exports = api;
