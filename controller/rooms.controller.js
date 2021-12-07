const db = require("../connection");
const express = require("express");

// GET ALL ROOMS - need boardinghouse_id to get rooms associated with the current login owner
exports.getAllRooms = async (req, res) => {
  db.query(`SELECT * FROM rooms`, (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

// GET SPECIFIC ROOM - need boardinghouse_id to get specific room
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

// ADD A ROOM
exports.addRoom = async (req, res) => {
  // code for adding a room
};

// UPDATE A ROOM
exports.updateRoom = async (req, res) => {
  const roomId = req.params.roomId;
};

// UPDATE ROOM AVAILABILITY
// UPDATE ROOM SLOTS STATUS
// DELETE SPECIFIC ROOM
