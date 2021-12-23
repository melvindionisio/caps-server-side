const express = require("express");
const db = require("../connection");
const Router = express.Router();

const bookmarksController = require("../controller/bookmarks.controller");

// GET
Router.get("/:seekerId", bookmarksController.getAllSeekerBookmarks);

module.exports = Router;
