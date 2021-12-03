const express = require("express");
const db = require("../connection");
const Router = express.Router();

const ownersController = require("../controller/owners.controller");
const getAllOwners = ownersController.getAllOwners;
const getOwner = ownersController.getOwner;
const registerOwner = ownersController.registerOwner;
const loginOwner = ownersController.loginOwner;

// import {
//   getAllOwners,
//   getOwner,
//   registerOwner,
//   loginOwner,
// } from "../controller/owners.controller";

Router.get("/", getAllOwners);
Router.get("/:ownerId", getOwner);
Router.post("/register", registerOwner);
Router.post("/auth", loginOwner);

// Router.put("/", (req, res) => {});
// Router.delete("/", (req, res) => {});

module.exports = Router;
