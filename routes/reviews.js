const express = require("express");
const db = require("../connection");
const Router = express.Router();

const reviewsController = require("../controller/reviews.controller");

// GET
Router.get("/:bhId", (req, res) => {
  const bhId = req.params.bhId;

  db.query(
    `SELECT * FROM reviews WHERE boardinghouse_id = ? `,
    [bhId],
    (err, result) => {
      if (!err) {
        res.send(result);
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = Router;
