const express = require("express");
const db = require("../connection");
const Router = express.Router();

const adminController = require("../controller/admin.controller");
const loginAdmin = adminController.loginAdmin;
const updateAdmin = adminController.updateAdmin;

Router.get("/", (req, res) => {
  db.query(`SELECT * FROM admin`, (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});

Router.post("/", loginAdmin);
Router.put("/:adminId", updateAdmin);

module.exports = Router;
