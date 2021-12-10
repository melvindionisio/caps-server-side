const express = require("express");
const db = require("../connection");
const Router = express.Router();

const adminController = require("../controller/admin.controller");
// GET
Router.get("/", (req, res) => {
  db.query(`SELECT * FROM admin`, (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

// SEND
Router.post("/", adminController.loginAdmin);

// SEND
Router.put("/:adminId", adminController.updateAdmin);

module.exports = Router;
