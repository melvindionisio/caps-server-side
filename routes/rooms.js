const express = require("express");
const db = require("../connection");
const Router = express.Router();

const roomsController = require("../controller/rooms.controller");
const getAllRooms = roomsController.getAllRooms;
const getRoom = roomsController.getRoom;

Router.get("/", getAllRooms);
Router.get("/:roomId", getRoom);

// Router.post("/", (req, res) => {});
// Router.put("/", (req, res) => {});
// Router.delete("/", (req, res) => {});

module.exports = Router;
