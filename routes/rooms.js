const express = require("express");
const Router = express.Router();

const roomsController = require("../controller/rooms.controller");

// GET
Router.get("/", roomsController.getAllRooms);
Router.get("/:roomId", roomsController.getRoom);

// SEND
Router.post("/", roomsController.addRoom);

// UPDATE
Router.put("/:roomId", roomsController.updateRoom);

// DELETE
Router.delete("/:roomId", roomsController.deleteRoom);

module.exports = Router;
