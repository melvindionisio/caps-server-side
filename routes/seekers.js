const express = require("express");
const Router = express.Router();

const seekersController = require("../controller/seeker.controller");

const GetAllSeekers = seekersController.getAllSeekers;
const RegisterSeeker = seekersController.registerSeeker;
const LoginSeeker = seekersController.loginSeeker;
const FacebookSignIn = seekersController.facebookLogin;
const GoogleSignIn = seekersController.googleLogin;
const UpdateSeeker = seekersController.updateSeeker;

Router.get("/", GetAllSeekers);
Router.post("/register", RegisterSeeker);
Router.post("/login", LoginSeeker);
Router.post("/google-signin", GoogleSignIn);
Router.post("/facebook-signin", FacebookSignIn);
Router.put("/update-seeker", UpdateSeeker);

module.exports = Router;
