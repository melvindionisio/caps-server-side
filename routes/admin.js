const express = require("express");
const db = require("../connection");
const Router = express.Router();

const adminController = require("../controller/admin.controller");
const UpdateAdminProfile = adminController.updateAdminProfile;
const UpdateAdminPassword = adminController.updateAdminPassword;
const DeleteOwner = adminController.deleteOwner;

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

// LOGIN
Router.post("/auth", adminController.loginAdmin);

Router.post("/register", adminController.registerAdmin);
//DELETE OWNER ALONG WITH THE BH
Router.delete("/delete/owner/:ownerId", DeleteOwner);

// UPDATE
Router.put("/update-profile/:adminId", UpdateAdminProfile); // ✅ Done!
Router.put("/update-password/:adminId", UpdateAdminPassword); // ✅ Done!

module.exports = Router;
