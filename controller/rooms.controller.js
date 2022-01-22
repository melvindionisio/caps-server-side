const db = require("../connection");

const roomsRemap = (rooms) => {
   let formatted = rooms.map((room) => {
      return {
         id: room.room_id,
         boardinghouseId: room.boardinghouse_id,
         name: room.room_name,
         description: room.room_description,
         type: room.room_type,
         genderAllowed: room.gender_allowed,
         totalSlots: room.total_slots,
         occupiedSlots: room.occupied_slots,
      };
   });
   return formatted;
};

exports.getAllRooms = (req, res) => {
   db.query(`SELECT * FROM rooms `, (err, result) => {
      if (!err) {
         res.send(roomsRemap(result));
      } else {
         res.send({ message: err });
         console.log(err);
      }
   });
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
            res.send({ message: err });
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
            res.send({ message: err });
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
            res.send({ total: total });
         } else {
            res.send({ message: err });
            console.log(err);
         }
      }
   );
};

exports.getRoomImage = (req, res) => {
   const imagePath = req.params.imagename;
   res.sendFile(`/room-images/${imagePath}`);
};

// ADD A ROOM
exports.addRoom = async (req, res) => {
   const bhId = req.params.bhId;
   const {
      roomName,
      roomDescription,
      roomType,
      genderAllowed,
      totalSlots,
      occupiedSlots,
   } = req.body;

   const sqlInsert = `INSERT INTO rooms (boardinghouse_id, room_name, room_description,room_type, gender_allowed, total_slots, occupied_slots) VALUE (?,?,?,?,?,?,?)`;
   db.query(
      sqlInsert,
      [
         bhId,
         roomName,
         roomDescription,
         roomType,
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
            res.send({ message: err });
         }
      }
   );
};

// UPDATE A ROOM details
exports.updateRoom = async (req, res) => {
   const roomId = req.params.roomId;
   res.send({
      roomId: roomId,
   });
};

exports.enableRoom = (req, res) => {
   const roomId = req.params.roomId;
   res.send({
      roomId: roomId,
   });
};

exports.disableRoom = (req, res) => {
   const roomId = req.params.roomId;
   res.send({
      roomId: roomId,
   });
};

// DELETE SPECIFIC ROOM
exports.deleteRoom = async (req, res) => {
   const roomId = req.params.roomId;

   db.query(`DELETE FROM rooms WHERE room_id=?`, [roomId], (err, result) => {
      if (!err) {
         res.send({
            result: result,
            message: "Room was successfully deleted!",
         });
      } else {
         res.send({
            message: err,
         });
         console.log(err);
      }
   });
};

// UPDATE ROOM AVAILABILITY
// UPDATE ROOM SLOTS STATUS
