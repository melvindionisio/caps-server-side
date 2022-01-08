const express = require('express');
const Router = express.Router();

const roomsController = require('../controller/rooms.controller');
const GetAllRooms = roomsController.getAllRooms;
const GetBoardinghouseRooms = roomsController.getBoardinghouseRooms;
const GetRoom = roomsController.getRoom;
const GetTotalBoardinghouseRooms = roomsController.getTotalBoardinghouseRooms;
const AddRoom = roomsController.addRoom;
const UpdateRoom = roomsController.updateRoom;
const DeleteRoom = roomsController.deleteRoom;
const UpdateRoomAvailability = roomsController.updateRoomAvailability;
const DisableFullRoom = roomsController.disableFullRoom;

// GET
Router.get('/', GetAllRooms);
Router.get('/all/:bhId', GetBoardinghouseRooms);
Router.get('/:roomId', GetRoom);
Router.get('/total/:bhId', GetTotalBoardinghouseRooms);

// ADD
Router.post('/add/:bhId', AddRoom);

// UPDATE
Router.put('/update/:roomId', UpdateRoom);
Router.put('/toogle-room/:roomId', UpdateRoomAvailability);
Router.put('/disable/:roomId', DisableFullRoom);

// DELETE
Router.delete('/delete/:roomId', DeleteRoom);

module.exports = Router;
