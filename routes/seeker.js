const express = require("express");
const db = require("../connection");
const Router = express.Router();

Router.get("/", (req, res) => {
  db.query(`SELECT * FROM boardinghouse_seeker`, (err, rows) => {
    if (!err) {
      //   res.send(rows);
      res.send([
        { Name: "Melvin Dionisio" },
        { Name: "Ivan Arang" },
        { Name: "Jhelan Anabo" },
      ]);
    } else {
      console.log(err);
    }
  });
});

// Router.post("/", (req, res) => {});
// Router.put("/", (req, res) => {});
// Router.delete("/", (req, res) => {});

module.exports = Router;
