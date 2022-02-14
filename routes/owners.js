const express = require("express");
const Router = express.Router();

const ownersController = require("../controller/owners.controller");
const GetAllOwners = ownersController.getAllOwners;
const GetOwner = ownersController.getOwner;
const RegisterOwner = ownersController.registerOwner;
const LoginOwner = ownersController.loginOwner;
const UpdateOwnerProfile = ownersController.updateOwnerProfile;
const UpdateOwnerPassword = ownersController.updateOwnerPassword;
const DeleteOwner = ownersController.deleteOwner;

// GET
Router.get("/", GetAllOwners);
Router.get("/:ownerId", GetOwner);

// SEND
Router.post("/register", RegisterOwner);
Router.post("/auth", LoginOwner);

// UPDATE OWNER ACCOUNT
Router.put("/update-profile/:ownerId", UpdateOwnerProfile); // ✅ Done!
Router.put("/update-password/:ownerId", UpdateOwnerPassword); // ✅ Done!

// DELETE
Router.delete("/delete/:ownerId", DeleteOwner);

module.exports = Router;
