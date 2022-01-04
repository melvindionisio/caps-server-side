const express = require("express");
const Router = express.Router();

const roomsController = require("../controller/rooms.controller");
const GetAllRooms = roomsController.getAllRooms;
const GetRoom = roomsController.getRoom;
const AddRoom = roomsController.addRoom;
const UpdateRoom = roomsController.updateRoom;
const DeleteRoom = roomsController.deleteRoom;
const UpdateRoomAvailability = roomsController.updateRoomAvailability;
const DisableFullRoom = roomsController.disableFullRoom;

// GET
Router.get("/all/:bhId", GetAllRooms);
Router.get("/:roomId", GetRoom);

// ADD
Router.post("/add/:bhId", AddRoom);

// UPDATE
Router.put("/update/:roomId", UpdateRoom);
Router.put("/toogle-room/:roomId", UpdateRoomAvailability);
Router.put("/disable/:roomId", DisableFullRoom);

// MAY CHANGES SA UI SAN ROOMS sa pag edit san available

// DELETE
Router.delete("/delete/:roomId", DeleteRoom);

module.exports = Router;
