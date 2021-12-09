// UPDATE SPECIFIC BOARDING HOUSE

// ADD BASIC BH INFO FROM ADMIN
exports.registerBoardinghouse = (req, res) => {
  const boardinghouse_owner = req.body.boardinghouse_owner;
  const boardinghouse_name = req.body.boardinghouse_name;
  const complete_address = req.body.complete_address;
  const contact_number = req.body.contact_number;
  const tagline = req.body.tagline;

  const ownerId = req.params.ownerId;

  const sqlInsert =
    "INSERT INTO boarding_house (bh_name, bh_owner, bh_adress, bh_contacts, tagline, bho_id) VALUE (?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      boardinghouse_name,
      boardinghouse_owner,
      complete_address,
      contact_number,
      tagline,
      ownerId,
    ],
    (err, result) => {
      if (!err) {
        console.log(result);
        res.send({
          message: "Owner successfully registered!",
          ownerId: result.insertId,
        });
      } else {
        console.log(err);
        res.send({ message: err });
      }
    }
  );
};

const db = require("../connection");
const express = require("express");

// GET ALL BOARDING HOUSE
exports.getAllBoardinghouse = (req, res) => {
  db.query(`SELECT * FROM boarding_house`, (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

// GET SPECIFIC BOARDING HOUSE
exports.getBoardinghouseById = (req, res) => {
  const boardinghouseId = req.params.bhId;
  // res.send(boardinghouseId);
  db.query(
    `SELECT * FROM boarding_house WHERE boardinghouse_id = ? `[boardinghouseId],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

// GET BOARDING HOUSE BY ZONE - dashboard get by zone
exports.getBoardinghouseByZone = (req, res) => {
  const zone = req.params.zone;
  if (zone <= 3 && zone > 0) {
    res.send(zone);

    //   db.query(
    //     `SELECT * FROM boarding_house WHERE bh_address_zone = ?`,
    //     [zone],
    //     (err, rows) => {
    //       if (!err) {
    //         res.send(rows);
    //       } else {
    //         console.log(err);
    //       }
    //     }
    //   );
  } else {
    res.send({ message: "The UEP zone is only 1, 2, and 3." });
  }
};

// ! FOR MAP PURPOSE - GET ALL THE LONGITUDE, LATITUDE, NAME, ADDRESS of BH
exports.getAllBoardinghouseLocations = (req, res) => {
  db.query(
    `SELECT boardinghouse_id, bh_name, bh_address, bh_longitude, bh_latitude FROM boarding_house`,
    [zone],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};
