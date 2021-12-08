const express = require("express");
const db = require("../connection");
const Router = express.Router();

const boardinghousesController = require("../controller/boardinghouses.controller");
const getBoardinghouseByZone = boardinghousesController.getBoardinghouseByZone;
const getAllBoardinghouse = boardinghousesController.getAllBoardinghouse;
const getBoardinghouseById = boardinghousesController.getBoardinghouseById;
const getAllBoardinghouseLocations =
  boardinghousesController.getAllBoardinghouseLocations;

// GET ALL THE BOARDING HOUSE INCLUDING THE OWNER
Router.get("/", getAllBoardinghouse);
Router.get("/:bhId", getBoardinghouseById);
Router.get("/zone/:zone", getBoardinghouseByZone);

// GETTING ALL THE BH COORDINATES FOR MAP MARKING - FOR SEEKER MAP
Router.get("/map-marks", getAllBoardinghouseLocations);

// ALONG WITH OWNER ACCOUNT CREATION
Router.post("/initial-details", async (req, res) => {});

// Router.put("/", (req, res) => {});
// Router.delete("/", (req, res) => {});

module.exports = Router;
