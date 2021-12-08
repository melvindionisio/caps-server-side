const express = require("express");
const db = require("../connection");
const Router = express.Router();

const ownersController = require("../controller/owners.controller");
const getAllOwners = ownersController.getAllOwners;
const getOwner = ownersController.getOwner;
const registerOwner = ownersController.registerOwner;
const loginOwner = ownersController.loginOwner;
const updateOwnerProfile = ownersController.updateOwnerProfile;
const updateOwnerPassword = ownersController.updateOwnerPassword;
const deleteOwner = ownersController.deleteOwner;

Router.get("/", getAllOwners);
Router.get("/:ownerId", getOwner);

Router.post("/register", registerOwner);
Router.post("/auth", loginOwner);

// UPDATE OWNER ACCOUNT
Router.put("/update-profile/:ownerId", updateOwnerProfile); // ✅ Done!
Router.put("/update-password/:ownerId", updateOwnerPassword); // ✅ Done!

Router.delete("/:ownerId", deleteOwner);

module.exports = Router;
