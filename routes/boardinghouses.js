const express = require("express");
const Router = express.Router();

const boardinghousesController = require("../controller/boardinghouses.controller");

// GET ALL THE BOARDING HOUSE INCLUDING THE OWNER
Router.get("/", boardinghousesController.getAllBoardinghouse);
Router.get("/:bhId", boardinghousesController.getBoardinghouseById);
Router.get(
  "/owner/:ownerId",
  boardinghousesController.getBoardinghouseByOwnerId
);
Router.get("/zone/:zone", boardinghousesController.getBoardinghouseByZone);

Router.get(
  "/owner-app/map-marks/:ownerId",
  boardinghousesController.getBoardinghouseLocation
); // GETTING  COORDINATES FOR MAP MARKING - OWNER

Router.get(
  "/seeker-app/map-marks",
  boardinghousesController.getAllBoardinghouseLocations
); // GETTING ALL COORDINATES FOR MAP MARKING - FOR SEEKER MAP

Router.post(
  "/register/:ownerId",
  boardinghousesController.registerBoardinghouse
); // ALONG WITH OWNER ACCOUNT CREATION

// Router.put("/", (req, res) => {});
// Router.delete("/", (req, res) => {});

module.exports = Router;
