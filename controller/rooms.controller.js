const db = require("../connection");
const fetch = require("node-fetch");
const domain = require("../domain/domain");

const cloudinary = require("cloudinary").v2;

// Change cloud name, API Key, and API Secret below
cloudinary.config({
   cloud_name: "searchnstay",
   api_key: "624193438329612",
   api_secret: "WwFyOo0fxkn9dVtf2z219f2uP_s",
   secure: true,
});

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
         price: room.price,
         status: room.room_status,
         genderAllowed: room.gender_allowed,
         totalSlots: room.total_slots,
         occupiedSlots: room.occupied_slots,
      };
   });
   return formatted;
};

exports.getAllRooms = (req, res) => {
   const { sort, sortType, gender } = req.query;
   console.log(sort, sortType, gender);

   // db.query (
   //    `SELECT * FROM rooms WHERE room_status = 'Available' ORDER BY room_name ASC`,
   //    (err, result) => {
   //       if (!err) {
   //          res.send(roomsRemap(result));
   //       } else {
   //          res.send({ message: "error occured." });
   //          console.log(err);
   //       }
   //    }
   // );

   if (gender === "Male/Female") {
      db.query(
         `SELECT * FROM rooms WHERE room_status = 'Available' ORDER BY ${sort} ${sortType.toUpperCase()}`,
         (err, result) => {
            if (!err) {
               res.send(roomsRemap(result));
            } else {
               res.send({ message: "error occured." });
               console.log(err);
            }
         }
      );
   } else {
      db.query(
         `SELECT * FROM rooms WHERE room_status = 'Available' AND gender_allowed = '${gender}'  ORDER BY ${sort} ${sortType.toUpperCase()}`,
         (err, result) => {
            if (!err) {
               res.send(_bhRemap(result));
            } else {
               console.log(err);
            }
         }
      );
   }
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
      roomPrice,
      roomDescription,
      roomType,
      roomPicture,
      roomStatus,
      genderAllowed,
      totalSlots,
      occupiedSlots,
   } = req.body;

   const sqlInsert = `INSERT INTO rooms (boardinghouse_id, room_name,price, room_description,room_type, room_picture, room_status, gender_allowed, total_slots, occupied_slots) VALUE (?,?,?,?,?,?,?,?,?,?)`;
   db.query(
      sqlInsert,
      [
         bhId,
         roomName,
         roomPrice,
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
            //SET THE TOTAL ROOMS AFTER ADDING
            db.query(
               `SELECT COUNT(*) FROM rooms WHERE boardinghouse_id = ?`,
               [bhId],
               (err, result) => {
                  if (!err) {
                     let total = { ...result[0] }[
                        Object.keys({ ...result[0] })[0]
                     ];

                     db.query(
                        `UPDATE boarding_house SET total_rooms = ? WHERE boardinghouse_id = ?`,
                        [total, bhId],
                        (err, result) => {
                           if (!err) {
                              console.log("Total rooms updated! (increased)");
                           }
                        }
                     );
                  } else {
                     console.log(err);
                  }
               }
            );

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
   if (req.file) {
      let imagePath = `${url}/${destinationPath}/${req.file.filename}`;
      res.send({
         imagepath: imagePath,
         message: "Image Uploaded",
      });
   } else {
      res.send({
         message: "Does not contain the image file.",
      });
   }
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
      roomPrice,
      roomDescription,
      roomType,
      roomStatus,
      genderAllowed,
      totalSlots,
      occupiedSlots,
   } = req.body;

   db.query(
      `UPDATE rooms SET room_name = ?,price = ?, room_description = ?, room_type = ?, room_status = ?, gender_allowed = ?, total_slots = ?, occupied_slots = ? WHERE room_id = ?`,
      [
         roomName,
         roomPrice,
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

exports.deleteRoomPicture = (req, res) => {
   // Change 'sample' to any public ID of your choice
   const roomId = req.params.roomId;

   db.query(
      `SELECT room_picture FROM rooms WHERE room_id = ?`,
      [roomId],
      (err, result) => {
         if (!err) {
            //DELETING THE IMAGE IN FILE SYSTEM FIRST Cloudinary
            if (result[0].room_picture) {
               let imagelink = result[0].room_picture;
               //Regex for extracting the filename from the url
               let imageNameExtraction = /[^/]+$/;
               let fileName = imagelink.match(imageNameExtraction)[0];

               // extracting file name without file extension
               let imagePublicId =
                  fileName.substring(0, fileName.lastIndexOf(".")) || fileName;

               cloudinary.uploader.destroy(
                  `${imagePublicId}`,
                  function (err, result) {
                     if (!err) {
                        console.log(result);
                        res.send({
                           message: "Image deleted!",
                        });
                     } else {
                        console.log(err);
                        res.send({
                           message: " Failed to delete image!",
                        });
                     }
                  }
               );
            } else {
               res.send({ message: "no current image" });
            }
            //} catch (err) {
            //console.error(err);
            //}
         } else {
            res.send({ message: "error occured.", status: "not-deleted" });
            console.log(err);
         }
      }
   );
};

//DELETE ROOM PICTURE
exports.deleteRoomPictureOld = (req, res) => {
   const roomId = req.params.roomId;
   db.query(
      `SELECT room_picture FROM rooms WHERE room_id = ?`,
      [roomId],
      (err, result) => {
         if (!err) {
            //DELETING THE IMAGE IN FILE SYSTEM FIRST
            const imagesPath = "./room-images/";
            if (result[0].room_picture) {
               let imagelink = result[0].room_picture;
               //Regex for extracting the filename from the url
               let imageNameExtraction = /[^/]+$/;
               let fileName = imagelink.match(imageNameExtraction)[0];
               let imageToDelete = imagesPath + fileName;
               //try {
               if (fs.existsSync(imageToDelete)) {
                  fs.unlinkSync(imageToDelete);
                  console.log(imageToDelete, "has been deleted");
                  res.send({
                     message: "Picture been deleted",
                     status: "deleted",
                  });
               } else {
                  console.log(imageToDelete, "not found in file system");
                  res.send({
                     message: "Picture not found",
                     status: "image-not-found",
                  });
               }
            } else {
               res.send({ message: "no current image" });
            }
            //} catch (err) {
            //console.error(err);
            //}
         } else {
            res.send({ message: "error occured.", status: "not-deleted" });
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
         console.log(data.message);
         // DELETE ALL THE USER BOOKMARKS THAT THIS ROOM IS INCLUDED
         db.query(
            `DELETE FROM bookmarks WHERE room_id=?`,
            [roomId],
            (err, result) => {
               if (!err) {
                  console.log(
                     "Bookmarks related to the room has been deleted!"
                  );

                  db.query(
                     `SELECT * FROM rooms WHERE room_id = ?`,
                     [roomId],
                     (err, result) => {
                        const bhId = result[0].boardinghouse_id;
                        console.log(bhId);
                        if (!err) {
                           //DELETING THE ROOM
                           db.query(
                              `DELETE FROM rooms WHERE room_id=?`,
                              [roomId],
                              (err, result) => {
                                 if (!err) {
                                    db.query(
                                       `SELECT COUNT(*) FROM rooms WHERE boardinghouse_id = ?`,
                                       [bhId],
                                       (err, result) => {
                                          if (!err) {
                                             let total = { ...result[0] }[
                                                Object.keys({ ...result[0] })[0]
                                             ];

                                             db.query(
                                                `UPDATE boarding_house SET total_rooms = ? WHERE boardinghouse_id = ?`,
                                                [total, bhId],
                                                (err, result) => {
                                                   if (!err) {
                                                      console.log(
                                                         "Total rooms updated! (decreased)"
                                                      );
                                                   }
                                                }
                                             );
                                          } else {
                                             console.log(err);
                                          }
                                       }
                                    );

                                    res.send({
                                       result: result,
                                       message:
                                          "Room was successfully deleted!",
                                       status: "deleted",
                                    });
                                    console.log("Room has been deleted.");
                                 } else {
                                    res.send({
                                       message: "error occured.",
                                    });
                                    console.log(err);
                                 }
                              }
                           );
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
      })
      .catch((err) => console.log(err));
};
