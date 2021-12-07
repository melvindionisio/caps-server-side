const db = require("../connection");
const express = require("express");
const bcrypt = require("bcrypt");

// GET ALL OWNER ACCOUNT
exports.getAllOwners = async (req, res) => {
  db.query(`SELECT * FROM boarding_house_owners`, (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

// GET SPECIFIC OWNER ACCOUNT
exports.getOwner = async (req, res) => {
  const ownerId = req.params.ownerId;

  db.query(
    `SELECT * FROM boarding_house_owners WHERE bho_id = ?`,
    [ownerId],
    async (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

// REGISTER OWNER ACCOUNT
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
    // ! MESSAGE FOR SUCCESSFUL REGISTRATION MISSING
  });
};

// LOGIN OWNER ACCOUNT
exports.loginOwner = async (req, res) => {
  const username = req.body.owner_username;
  const password = req.body.owner_password;

  if (username && password) {
    db.query(
      "SELECT * FROM boarding_house_owners WHERE bho_username = ?",
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
          const validate = await bcrypt.compare(
            password,
            result[0].bho_password
          );

          if (username === result[0].bho_username && validate) {
            res.send({
              ...result[0],
              message: "You successfully logged in!",
              error: "success",
            });
          } else if (username === result[0].bho_username || validate) {
            // res.redirect("/api/owners/auth/incorrect-password");
            res.send({
              message: "Your Password was Incorrect!",
            });
          } else {
            // res.redirect("/api/owners/auth/user-not-found");
            res.send({
              message: "The account was not found! Please try again.",
            });
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

// UPDATE SPECIFIC OWNER ACCOUNT | name | username | password
exports.updateOwnerProfile = async (req, res) => {
  const ownerId = req.params.ownerId;
  const newName = req.body.newName;
  const newUsername = req.body.newUsername;
  db.query(
    `UPDATE boarding_house_owners SET bho_name = ?, bho_username = ? WHERE bho_id = ?`,
    [newName, newUsername, ownerId],
    async (err, rows) => {
      if (!err) {
        // res.send(rows);
        console.log(rows.affectedRows);
      } else {
        console.log(err);
      }
    }
  );

  // ALSO SEND A MESSAGE UPAN SUCCESSFUL UPDATING AN OWNER ACCOUNT
};

// UPDATE SPECIFIC OWNER ACCOUNT | name | username | password
exports.updateOwnerPassword = async (req, res) => {
  const ownerId = req.params.ownerId;
  const updatedPassword = req.body;
  // ! HASH PASSWORD BEFORE SENDING TO DB
  db.query(
    `UPDATE boarding_house_owners SET ? WHERE bho_id = ?`,
    [updatedPassword, ownerId],
    async (err, rows) => {
      if (!err) {
        // res.send(rows);
        console.log(rows.affectedRows);
      } else {
        console.log(err);
      }
    }
  );

  // ALSO SEND A MESSAGE UPAN SUCCESSFUL UPDATING AN OWNER ACCOUNT
};

// DELETE SPECIFIC OWNER ACCOUNT - INCLUDING THE BOARDING HOUSE CONNECTED TO THE ACCOUNT
exports.deleteOwner = async (req, res) => {
  const ownerId = req.params.ownerId;
  res.send(ownerId);
};
