const express = require("express");
const Router = express.Router();

const ownersController = require("../controller/owners.controller");

// GET
Router.get("/", ownersController.getAllOwners);
Router.get("/:ownerId", ownersController.getOwner);

// SEND
Router.post("/register", ownersController.registerOwner);
Router.post("/auth", ownersController.loginOwner);

// UPDATE OWNER ACCOUNT
Router.put("/update-profile/:ownerId", ownersController.updateOwnerProfile); // ✅ Done!
Router.put("/update-password/:ownerId", ownersController.updateOwnerPassword); // ✅ Done!

// DELETE
Router.delete("/:ownerId", ownersController.deleteOwner);

module.exports = Router;
