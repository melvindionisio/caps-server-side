const express = require("express");
const db = require("../connection");
const Router = express.Router();

const roomsController = require("../controller/rooms.controller");
const getAllRooms = roomsController.getAllRooms;
const getRoom = roomsController.getRoom;
const addRoom = roomsController.addRoom;
const updateRoom = roomsController.updateRoom;

Router.get("/", getAllRooms);
Router.get("/:roomId", getRoom);
Router.post("/", addRoom);
Router.put("/:roomId", updateRoom);
// Router.delete("/", (req, res) => {});

module.exports = Router;
