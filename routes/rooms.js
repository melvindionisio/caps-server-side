const express = require("express");
const Router = express.Router();

const multer = require("multer");
const path = require("path");

let imagePath;
const destinationPath = "room-images";
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, destinationPath);
   },
   filename: (req, file, cb) => {
      console.log(file);
      imagePath = `/${destinationPath}/${Date.now()}${path.extname(
         file.originalname
      )}`;
      cb(null, Date.now() + path.extname(file.originalname));
   },
});

const upload = multer({ storage: storage });

const roomsController = require("../controller/rooms.controller");
const GetAllRooms = roomsController.getAllRooms;
const GetBoardinghouseRooms = roomsController.getBoardinghouseRooms;
const GetRoom = roomsController.getRoom;
const GetTotalBoardinghouseRooms = roomsController.getTotalBoardinghouseRooms;
const AddRoom = roomsController.addRoom;
const UpdateRoom = roomsController.updateRoom;
const DeleteRoom = roomsController.deleteRoom;
const EnableRoom = roomsController.enableRoom;
const DisableRoom = roomsController.disableRoom;

// GET
Router.get("/", GetAllRooms);
Router.get("/all/:bhId", GetBoardinghouseRooms);
Router.get("/:roomId", GetRoom);
Router.get("/total/:bhId", GetTotalBoardinghouseRooms);

// ADD
Router.post("/add/:bhId", AddRoom);
Router.post("/upload", upload.single("room-image"), (req, res) => {
   console.log("image uploaded");
   res.send({
      imagePath: imagePath,
      mesage: "Image Uploaded",
   });
});

// UPDATE
Router.put("/update/:roomId", UpdateRoom);
Router.put("/enable/:roomId", EnableRoom);
Router.put("/disable/:roomId", DisableRoom);

// DELETE
Router.delete("/delete/:roomId", DeleteRoom);

module.exports = Router;
