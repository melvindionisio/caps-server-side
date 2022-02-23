const express = require("express");
const Router = express.Router();

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const destinationPath = "room-images";

if (!fs.existsSync(destinationPath)) {
   fs.mkdirSync(destinationPath);
}

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, destinationPath);
   },
   filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + path.extname(file.originalname));
   },
});

const upload = multer({ storage: storage });

const roomsController = require("../controller/rooms.controller");
const GetAllRooms = roomsController.getAllRooms;
const GetBoardinghouseRooms = roomsController.getBoardinghouseRooms;
const GetRoom = roomsController.getRoom;
const GetTotalRooms = roomsController.getTotalBoardinghouseRooms;
const GetTotalAvailableRooms = roomsController.getTotalAvailableRooms;
const AddRoom = roomsController.addRoom;
const UpdateRoom = roomsController.updateRoom;
const DeleteRoom = roomsController.deleteRoom;
const EnableRoom = roomsController.enableRoom;
const DisableRoom = roomsController.disableRoom;
const DeleteRoomPicture = roomsController.deleteRoomPicture;
const UploadRoomImage = roomsController.uploadRoomImage;
const UpdateRoomPicture = roomsController.updateRoomPicture;

// GET
Router.get("/", GetAllRooms);
Router.get("/total-rooms", roomsController.getTotalRooms);
Router.get("/all/:bhId", GetBoardinghouseRooms);
Router.get("/:roomId", GetRoom);
Router.get("/total/:bhId", GetTotalRooms);
Router.get("/total-available/:bhId", GetTotalAvailableRooms);

// ADD
Router.post("/add/:bhId", AddRoom);
Router.post("/upload", upload.single("room-image"), UploadRoomImage);

// UPDATE
Router.put("/update/:roomId", UpdateRoom);
Router.put("/update-room-picture/:roomId", UpdateRoomPicture);
Router.put("/enable/:roomId", EnableRoom);
Router.put("/disable/:roomId", DisableRoom);

// DELETE
Router.delete("/delete/:roomId", DeleteRoom);
Router.get("/delete-picture/:roomId", DeleteRoomPicture);

module.exports = Router;
