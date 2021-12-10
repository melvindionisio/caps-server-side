const express = require("express");
const db = require("../connection");
const Router = express.Router();

const bookmarksController = require("../controller/bookmarks.controller");

// GET
Router.get("/:seekerId", (req, res) => {
  db.query(`SELECT * FROM bookmarks`, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
    }
  });
});

module.exports = Router;
