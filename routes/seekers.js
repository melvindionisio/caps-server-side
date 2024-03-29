const express = require("express");
const Router = express.Router();

const seekersController = require("../controller/seeker.controller");

const GetAllSeekers = seekersController.getAllSeekers;
const GetSeekerProfile = seekersController.getSeekerProfile;
const RegisterSeeker = seekersController.registerSeeker;
const LoginSeeker = seekersController.loginSeeker;
const FacebookSignIn = seekersController.facebookLogin;
const GoogleSignIn = seekersController.googleLogin;
const UpdateSeekerProfile = seekersController.updateSeekerProfile;
const AuthenticateUpdatePassword = seekersController.authenticateUpdatePassword;

Router.get("/", GetAllSeekers);
Router.get("/:seekerId", GetSeekerProfile);
Router.post("/register", RegisterSeeker);
Router.post("/login", LoginSeeker);
Router.post("/google-signin", GoogleSignIn);
Router.post("/facebook-signin", FacebookSignIn);
Router.put("/update-seeker-profile/:seekerId", UpdateSeekerProfile);
Router.post(
   "/update-seeker-password/auth/:seekerId",
   AuthenticateUpdatePassword
);

module.exports = Router;
