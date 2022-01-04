const db = require("../connection");

// GET ALL ROOMS - need boardinghouse_id to get rooms associated with the current login owner
exports.getAllRooms = async (req, res) => {
  const bhId = req.params.bhId;

  db.query(
    `SELECT * FROM rooms WHERE boardinghouse_id = ? `,
    [bhId],
    (err, result) => {
      if (!err) {
        res.send(result);
      } else {
        console.log(err);
      }
    }
  );
};

// GET SPECIFIC ROOM - need boardinghouse_id to get specific room
exports.getRoom = async (req, res) => {
  roomId = req.params.roomId;

  db.query(`SELECT * FROM rooms WHERE room_id = ?`, [roomId], (err, result) => {
    if (!err) {
      res.send({ ...result[0] });
    } else {
      console.log(err);
    }
  });
};

// ADD A ROOM
exports.addRoom = async (req, res) => {
  const bhId = req.params.bhId;
  res.send({ bhId: bhId });
};

// UPDATE A ROOM details
exports.updateRoom = async (req, res) => {
  const roomId = req.params.roomId;
  res.send({
    roomId: roomId,
  });
};

exports.updateRoomAvailability = (req, res) => {
  const roomId = req.params.roomId;
  res.send({
    roomId: roomId,
  });
};

exports.disableFullRoom = (req, res) => {
  const roomId = req.params.roomId;
  res.send({
    roomId: roomId,
  });
};

// DELETE SPECIFIC ROOM
exports.deleteRoom = async (req, res) => {
  const roomId = req.params.roomId;
  res.send({ roomId: roomId });
};

// UPDATE ROOM AVAILABILITY
// UPDATE ROOM SLOTS STATUS
