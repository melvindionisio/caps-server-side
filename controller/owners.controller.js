const db = require("../connection");
const express = require("express");
const bcrypt = require("bcrypt");

// Get All the owners data
exports.getAllOwners = async (req, res) => {
  db.query(`SELECT * FROM boarding_house_owner`, (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

// Getter for specific owner
exports.getOwner = async (req, res) => {
  res.send(req.params.ownerId);
  //   ownerId = req.params.ownerId;

  //   db.query(
  //     `SELECT * FROM boarding_house_owner WHERE bho_id = ?`,
  //     [ownerId],
  //     async (err, rows) => {
  //       if (!err) {
  //         res.send(rows);
  //       } else {
  //         console.log(err);
  //       }
  //     }
  //   );
};

// Register Owner Account
const saltRounds = 5;
exports.registerOwner = async (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const sqlInsert =
    "INSERT INTO boarding_house_owners (bho_name, bho_username, bho_password) VALUE (?,?,?)";
  db.query(sqlInsert, [name, username, encryptedPassword], (err, result) => {
    console.log(result);
  });
};

// Login Owner Account
exports.loginOwner = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, result) => {
        if (err) {
          res.send({
            code: 400,
            failed: "Error Occured",
            error: err,
          });
        }
        if (result.length > 0) {
          req.session.loggedin = true;
          req.session.username = username;
          const validate = await bcrypt.compare(password, result[0].password);

          if (username === result[0].username && validate) {
            res.send({
              ...result[0],
              message: "You successfully logged in!",
              error: "success",
            });
          } else if (username === result[0].username || validate) {
            res.redirect("/incorrectpassword");
          } else {
            res.redirect("/usernotfound");
          }
        } else {
          res.send({ message: "User does not exist!" });
          res.end();
        }
        // console.log(result);
      }
    );
  } else {
    res.send("Please enter username and password");
  }
};
