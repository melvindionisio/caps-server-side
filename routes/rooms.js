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

// GET
Router.get("/", GetAllRooms);
Router.get("/all/:bhId", GetBoardinghouseRooms);
Router.get("/:roomId", GetRoom);
Router.get("/total/:bhId", GetTotalRooms);
Router.get("/total-available/:bhId", GetTotalAvailableRooms);

// ADD
Router.post("/add/:bhId", AddRoom);
Router.post("/upload", upload.single("room-image"), (req, res) => {
   const url = req.protocol + "://" + req.get("host");
   let imagePath = `${url}/${destinationPath}/${req.file.filename}`;
   res.send({
      imagepath: imagePath,
      mesage: "Image Uploaded",
   });
});

// UPDATE
Router.put("/update/:roomId", UpdateRoom);
Router.put("/enable/:roomId", EnableRoom);
Router.put("/disable/:roomId", DisableRoom);
//Router.put("/update-available-slots", UpdateAvailable);
//Router.put("/update-occupied-slots")

// DELETE
Router.delete("/delete/:roomId", DeleteRoom);

module.exports = Router;
