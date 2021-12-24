const express = require("express");
const Router = express.Router();

const boardinghousesController = require("../controller/boardinghouses.controller");

// GET ALL THE BOARDING HOUSE INCLUDING THE OWNER
Router.get("/", boardinghousesController.getAllBoardinghouse);
Router.get("/export", boardinghousesController.getAllBoardinghouseExport);
Router.get("/total", boardinghousesController.getTotalBoardinghouse);
Router.get(
  "/total/:zoneAddress",
  boardinghousesController.getTotalBoardinghouseByZone
);
Router.get("/:bhId", boardinghousesController.getBoardinghouseById);
Router.get(
  "/by-owner/:ownerId",
  boardinghousesController.getBoardinghouseByOwnerId
);

Router.get(
  "/by-zone/:zoneAddress",
  boardinghousesController.getAllBoardinghousesByZone
);

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

Router.put(
  "/owner-map/update-coordinates/:ownerId",
  boardinghousesController.updateBoardinghouseCoordinates
); // Updating existing boardinghouse coordinates

// Router.put("/", (req, res) => {});
// Router.delete("/", (req, res) => {});

module.exports = Router;
