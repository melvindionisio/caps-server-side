const express = require("express");
const db = require("../connection");

const Router = express.Router();

const bookmarksController = require("../controller/bookmarks.controller");

const GetAllSeekerBookmarks = bookmarksController.getAllSeekerBookmarks;
const DeleteBookmark = bookmarksController.deleteBookmark;
const AddBookmark = bookmarksController.addBookmark;

Router.post("/add/:seekerId", AddBookmark);

// GET
Router.get("/:seekerId", GetAllSeekerBookmarks);
Router.delete("/delete/:bookmarkId", DeleteBookmark);

module.exports = Router;
