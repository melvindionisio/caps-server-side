const db = require("../connection");
const fetch = require("node-fetch");
const domain = require("../domain/domain");

//DELETE ROOM IMAGE WHEN DELETING ROOMS
const fs = require("fs");
const destinationPath = "room-images";

const roomsRemap = (rooms) => {
   let formatted = rooms.map((room) => {
      return {
         id: room.room_id,
         boardinghouseId: room.boardinghouse_id,
         name: room.room_name,
         description: room.room_description,
         type: room.room_type,
         picture: room.room_picture,
         status: room.room_status,
         genderAllowed: room.gender_allowed,
         totalSlots: room.total_slots,
         occupiedSlots: room.occupied_slots,
      };
   });
   return formatted;
};

exports.getAllRooms = (req, res) => {
   db.query(
      `SELECT * FROM rooms WHERE room_status = 'Available' ORDER BY room_name ASC`,
      (err, result) => {
         if (!err) {
            res.send(roomsRemap(result));
         } else {
            res.send({ message: "error occured." });
            console.log(err);
         }
      }
   );
};

// GET ALL Boardinghouse ROOMS - need boardinghouse_id to get rooms associated with the current login owner
exports.getBoardinghouseRooms = async (req, res) => {
   const bhId = req.params.bhId;

   db.query(
      `SELECT * FROM rooms WHERE boardinghouse_id = ? `,
      [bhId],
      (err, result) => {
         if (!err) {
            res.send(roomsRemap(result));
         } else {
            res.send({ message: "error occured." });
            console.log(err);
         }
      }
   );
};

// GET SPECIFIC ROOM - need boardinghouse_id to get specific room
exports.getRoom = async (req, res) => {
   const roomId = req.params.roomId;

   db.query(
      `SELECT * FROM rooms WHERE room_id = ?`,
      [roomId],
      (err, result) => {
         if (!err) {
            let rooms = roomsRemap(result);
            res.send(rooms[0]);
         } else {
            res.send({ message: "error occured." });
            console.log(err);
         }
      }
   );
};

exports.getTotalBoardinghouseRooms = (req, res) => {
   const bhId = req.params.bhId;
   db.query(
      `SELECT COUNT(*) FROM rooms WHERE boardinghouse_id = ?`,
      [bhId],
      (err, result) => {
         if (!err) {
            let total = { ...result[0] }[Object.keys({ ...result[0] })[0]];

            db.query(
               `UPDATE boarding_house SET total_rooms = ? WHERE boardinghouse_id = ?`,
               [total, bhId],
               (err, result) => {
                  if (!err) {
                     res.send({ total: total });
                  }
               }
            );
         } else {
            res.send({ message: "error occured." });
            console.log(err);
         }
      }
   );
};

exports.getTotalRooms = (req, res) => {
   db.query(
      `SELECT COUNT(*) FROM rooms WHERE room_status = 'Available'`,
      (err, result) => {
         if (!err) {
            let total = { ...result[0] }[Object.keys({ ...result[0] })[0]];
            res.send({ total: total });
         } else {
            res.send({ message: "error occured." });
            console.log(err);
         }
      }
   );
};

exports.getTotalAvailableRooms = (req, res) => {
   const bhId = req.params.bhId;
   db.query(
      `SELECT COUNT(*) FROM rooms WHERE boardinghouse_id = ? AND room_status = 'Available'`,
      [bhId],
      (err, result) => {
         if (!err) {
            let total = { ...result[0] }[Object.keys({ ...result[0] })[0]];
            res.send({ total: total });
         } else {
            res.send({ message: "error occured." });
            console.log(err);
         }
      }
   );
};

// ADD A ROOM
exports.addRoom = async (req, res) => {
   const bhId = req.params.bhId;
   const {
      roomName,
      roomDescription,
      roomType,
      roomPicture,
      roomStatus,
      genderAllowed,
      totalSlots,
      occupiedSlots,
   } = req.body;

   const sqlInsert = `INSERT INTO rooms (boardinghouse_id, room_name, room_description,room_type, room_picture, room_status, gender_allowed, total_slots, occupied_slots) VALUE (?,?,?,?,?,?,?,?,?)`;
   db.query(
      sqlInsert,
      [
         bhId,
         roomName,
         roomDescription,
         roomType,
         roomPicture,
         roomStatus,
         genderAllowed,
         totalSlots,
         occupiedSlots,
      ],
      (err, result) => {
         if (!err) {
            console.log(result);
            res.send({
               message: "Room successfully Added!",
               ownerId: result.insertId,
            });
         } else {
            console.log(err);
            res.send({ message: "error occured." });
         }
      }
   );
};

exports.uploadRoomImage = (req, res) => {
   const url = req.protocol + "://" + req.get("host");
   let imagePath = `${url}/${destinationPath}/${req.file.filename}`;
   res.send({
      imagepath: imagePath,
      message: "Image Uploaded",
   });
};

exports.updateRoomPicture = (req, res) => {
   const roomId = req.params.roomId;
   const { newImageLink } = req.body;
   db.query(
      `UPDATE rooms SET room_picture = ? WHERE room_id = ?`,
      [newImageLink, roomId],
      (err, result) => {
         if (!err) {
            res.send({
               message: "Room successfully updated picture!",
            });
         } else {
            console.log(err);
            res.send({ message: "error occured." });
         }
      }
   );
};

// UPDATE A ROOM details
exports.updateRoom = async (req, res) => {
   const roomId = req.params.roomId;
   const {
      roomName,
      roomDescription,
      roomType,
      roomStatus,
      genderAllowed,
      totalSlots,
      occupiedSlots,
   } = req.body;

   db.query(
      `UPDATE rooms SET room_name = ?, room_description = ?, room_type = ?, room_status = ?, gender_allowed = ?, total_slots = ?, occupied_slots = ? WHERE room_id = ?`,
      [
         roomName,
         roomDescription,
         roomType,
         roomStatus,
         genderAllowed,
         totalSlots,
         occupiedSlots,
         roomId,
      ],
      (err, result) => {
         if (!err) {
            res.send({ message: `(Room) ${roomName} successfully updated!` });
         } else {
            console.log(err);
            res.send({ message: "error occured." });
         }
      }
   );
};

exports.enableRoom = (req, res) => {
   const roomId = req.params.roomId;
   const newStatus = "Available";
   db.query(
      `UPDATE rooms SET room_status=? WHERE room_id = ?`,
      [newStatus, roomId],
      (err, result) => {
         if (!err) {
            res.send({ message: "Room has been enabled!" });
         } else {
            console.log(err);
            res.send({ message: "error occured." });
         }
      }
   );
};

exports.disableRoom = (req, res) => {
   const roomId = req.params.roomId;
   const newStatus = "Unavailable";
   db.query(
      `UPDATE rooms SET room_status=? WHERE room_id = ?`,
      [newStatus, roomId],
      (err, result) => {
         if (!err) {
            res.send({ message: "Room has been disabled!" });
         } else {
            console.log(err);
            res.send({ message: "error occured." });
         }
      }
   );
};

//DELETE ROOM PICTURE
exports.deleteRoomPicture = (req, res) => {
   const roomId = req.params.roomId;
   db.query(
      `SELECT room_picture FROM rooms WHERE room_id = ?`,
      [roomId],
      (err, result) => {
         if (!err) {
            //DELETING THE IMAGE IN FILE SYSTEM FIRST
            const imagesPath = "./room-images/";
            let imagelink = result[0].room_picture;
            //Regex for extracting the filename from the url
            let imageNameExtraction = /[^/]+$/;
            let fileName = imagelink.match(imageNameExtraction)[0];
            let imageToDelete = imagesPath + fileName;
            try {
               fs.unlinkSync(imageToDelete);
               console.log(imageToDelete, "has been deleted");
               res.send({
                  message: "Picture been deleted",
                  status: "deleted",
               });
            } catch (err) {
               console.error(err);
            }
         } else {
            res.send({ message: "error occured." });
            console.log(err);
         }
      }
   );
};

// DELETE SPECIFIC ROOM
exports.deleteRoom = async (req, res) => {
   const roomId = req.params.roomId;

   fetch(`${domain}/api/rooms/delete-picture/${roomId}`)
      .then((res) => res.json())
      .then((data) => {
         if (data.status === "deleted") {
            console.log(data.message);
            db.query(
               `DELETE FROM bookmarks WHERE room_id=?`,
               [roomId],
               (err, result) => {
                  if (!err) {
                     console.log(
                        "Bookmarks related to the room has been deleted!"
                     );
                     //DELETING THE ROOM
                     db.query(
                        `DELETE FROM rooms WHERE room_id=?`,
                        [roomId],
                        (err, result) => {
                           if (!err) {
                              res.send({
                                 result: result,
                                 message: "Room was successfully deleted!",
                                 status: "deleted",
                              });
                           } else {
                              res.send({
                                 message: "error occured.",
                              });
                              console.log(err);
                           }
                        }
                     );
                  } else {
                     res.send({
                        message: "error occured.",
                     });
                     console.log(err);
                  }
               }
            );
         }
      })
      .catch((err) => console.log(err));
};
