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
Router.get("/zone/:zone", boardinghousesController.getBoardinghousesByZone);

Router.get(
  "/owner-map/map-marks/:ownerId",
  boardinghousesController.getBoardinghouseLocation
); // GETTING  COORDINATES FOR MAP MARKING - OWNER

Router.get(
  "/seeker-map/map-marks",
  boardinghousesController.getAllBoardinghouseLocations
); // GETTING ALL COORDINATES FOR MAP MARKING - FOR SEEKER MAP

Router.post(
  "/register/:ownerId",
  boardinghousesController.registerBoardinghouse
); // ALONG WITH OWNER ACCOUNT CREATION ✅ DONE!

// Router.put("/", (req, res) => {});
// Router.delete("/", (req, res) => {});

module.exports = Router;
