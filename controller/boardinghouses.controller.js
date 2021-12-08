// GET SPECIFIC BOARDING HOUSE
// UPDATE SPECIFIC BOARDING HOUSE
// ADD BASIC BH INFO FROM ADMIN

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

// GET A BOARDING HOUSE
exports.getBoardinghouseById = (req, res) => {
  const boardinghouseId = req.params.bhId;
  res.send(boardinghouseId);
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
