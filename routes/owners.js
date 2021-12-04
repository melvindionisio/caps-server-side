const express = require("express");
const db = require("../connection");
const Router = express.Router();

const ownersController = require("../controller/owners.controller");
const getAllOwners = ownersController.getAllOwners;
const getOwner = ownersController.getOwner;
const registerOwner = ownersController.registerOwner;
const loginOwner = ownersController.loginOwner;

Router.get("/", getAllOwners);
Router.get("/:ownerId", getOwner);
Router.post("/register", registerOwner);

Router.post("/auth", loginOwner);
// LOGIN REDIRECTS
Router.get("/auth/incorrect-password", (req, res) => {
  res.send({
    message: "Your Password was Incorrect!",
  });
});
Router.get("/auth/user-not-found", (req, res) => {
  res.send({
    message: "The account was not found! Please try again.",
  });
});

// Router.put("/", (req, res) => {});
// Router.delete("/", (req, res) => {});

module.exports = Router;
