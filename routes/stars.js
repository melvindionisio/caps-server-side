const express = require("express");
const Router = express.Router();

const starsController = require("../controller/stars.controller");
const GetBoardinghouseStars = starsController.getBoardinghouseStars;
const removeStar = starsController.removeStars;
const AddStar = starsController.addStar;
const isStarred = starsController.isStarred;

Router.get("/:bhId", GetBoardinghouseStars);
Router.get("/isStarred/:bhId/:seekerId", isStarred);
Router.post("/add/:bhId/:seekerId", AddStar);
Router.delete("/delete/:bhId", RemoveStar);

module.exports = Router;
