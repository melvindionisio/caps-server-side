const db = require("../connection");
const express = require("express");
const bcrypt = require("bcrypt");

// Get All the owners data
exports.getAllRooms = async (req, res) => {
  db.query(`SELECT * FROM rooms`, (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

// Getter for specific owner
exports.getRoom = async (req, res) => {
  roomId = req.params.roomId;

  db.query(
    `SELECT * FROM rooms WHERE room_id = ?`,
    [roomId],
    async (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};
