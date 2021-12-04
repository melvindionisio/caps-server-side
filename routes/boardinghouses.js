const express = require("express");
const db = require("../connection");
const Router = express.Router();

Router.get("/", (req, res) => {
  // db.query(`SELECT * FROM boarding_house`, (err, rows, field) => {
  //   if (!err) {
  //     res.send(rows);
  //   } else {
  //     console.log(err);
  //   }
  // });
  res.send([
    {
      id: 0,
      name: "UEP Women's Dorm",
      totalRooms: 100,
    },
    {
      id: 1,
      name: "UEP Men's Dorm",
      totalRooms: 200,
    },
  ]);
});

// Router.post("/", (req, res) => {});
// Router.put("/", (req, res) => {});
// Router.delete("/", (req, res) => {});

module.exports = Router;
