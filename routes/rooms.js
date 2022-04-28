const express = require("express");
const Router = express.Router();

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// let directory: string = ''
// let bookImages: string[] = []
// let files: Express.Multer.File[] = req.files as Express.Multer.File[]

// for (let i in files) {
//   if (process.platform !== 'win32') directory = `/tmp/${files[i].filename}`
//   else directory = `${process.env.TEMP}/${files[i].filename}`

//   if (fs.existsSync(directory)) {
//     const res: UploadApiResponse = await cloudinaryStorage(directory)
//     bookImages.push(res.secure_url)
//   }
// }

// // custom libs cloudinary
// import cloudinary, { UploadApiResponse } from 'cloudinary'
// import { ExpressError } from '@helpers/helper.error'

// export { UploadApiResponse }
// export const cloudinaryStorage = async (filename: string): Promise<UploadApiResponse> => {
//   try {
//     const cloudStorage: typeof cloudinary.v2 = cloudinary.v2
//     cloudStorage.config({
//       cloud_name: process.env.CLOUDINARY_NAME,
//       api_key: process.env.CLOUDINARY_KEY,
//       api_secret: process.env.CLOUDINARY_SECRET,
//       shorten: true,
//       secure: true,
//       ssl_detected: true
//     })
//     const res = (await cloudStorage.uploader.upload(filename, { resource_type: 'auto' })) as UploadApiResponse
//     return res
//   } catch (e: any) {
//     return Promise.reject(new ExpressError(`Uploading file error: ${e.message}`))
//   }
// }

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
