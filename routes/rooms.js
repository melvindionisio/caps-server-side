const express = require("express");
const Router = express.Router();

const roomsController = require("../controller/rooms.controller");

// GET
Router.get("/:bhId", roomsController.getAllRooms);
Router.get("/:roomId", roomsController.getRoom);

// SEND
Router.post("/add/:bhId", roomsController.addRoom);

// UPDATE
Router.put("/update/:roomId", roomsController.updateRoom);

// DELETE
Router.delete("/delete/:roomId", roomsController.deleteRoom);

module.exports = Router;
