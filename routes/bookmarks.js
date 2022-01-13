const express = require("express");
const db = require("../connection");

const Router = express.Router();

const bookmarksController = require("../controller/bookmarks.controller");

const GetAllSeekerBookmarks = bookmarksController.getAllSeekerBookmarks;
const DeleteBookmark = bookmarksController.deleteBookmark;
const AddBookmark = bookmarksController.addBookmark;
const RoomIsBookmarked = bookmarksController.roomIsBookmarked;
const BhIsBookmarked = bookmarksController.bhIsBookmarked;
const DeleteBookmarkedRoom = bookmarksController.deleteBookmarkedRoom;
const DeleteBookmarkedBoardinghouse =
   bookmarksController.deleteBookmarkedBoardinghouse;

Router.post("/add/:seekerId", AddBookmark);
Router.get("/room/isbookmarked/:roomId", RoomIsBookmarked);
Router.get("/boardinghouse/isbookmarked/:bhId", BhIsBookmarked);
// GET
Router.get("/seeker/:seekerId", GetAllSeekerBookmarks);

Router.delete("/delete/:bookmarkId", DeleteBookmark);
Router.delete("/delete/room/:roomId", DeleteBookmarkedRoom);
Router.delete("/delete/boardinghouse/:bhId", DeleteBookmarkedBoardinghouse);

module.exports = Router;
