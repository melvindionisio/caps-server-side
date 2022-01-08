const db = require('../connection')

const roomsRemap = rooms => {
   let formatted = rooms.map(room => {
      return {
         id: room.room_id,
         boardinghouseId: room.boardinghouse_id,
         name: room.room_name,
         description: room.room_description,
         type: room.room_type,
         genderCategory: room.gender_category,
         numSlots: room.num_slots,
         availableSlots: room.available_slots,
      }
   })
   return formatted
}

exports.getAllRooms = res => {
   db.query(`SELECT * FROM rooms `, (err, result) => {
      if (!err) {
         res.send(roomsRemap(result))
      } else {
         console.log(err)
      }
   })
}

// GET ALL Boardinghouse ROOMS - need boardinghouse_id to get rooms associated with the current login owner
exports.getBoardinghouseRooms = async (req, res) => {
   const bhId = req.params.bhId

   db.query(`SELECT * FROM rooms WHERE boardinghouse_id = ? `, [bhId], (err, result) => {
      if (!err) {
         res.send(roomsRemap(result))
      } else {
         console.log(err)
      }
   })
}

// GET SPECIFIC ROOM - need boardinghouse_id to get specific room
exports.getRoom = async (req, res) => {
   roomId = req.params.roomId

   db.query(`SELECT * FROM rooms WHERE room_id = ?`, [roomId], (err, result) => {
      if (!err) {
         let rooms = roomsRemap(result)
         res.send(rooms[0])
      } else {
         console.log(err)
      }
   })
}

exports.getTotalBoardinghouseRooms = (req, res) => {
   const bhId = req.params.bhId
   db.query(`SELECT COUNT(*) FROM rooms WHERE boardinghouse_id = ?`, [bhId], (err, result) => {
      if (!err) {
         let total = { ...result[0] }[Object.keys({ ...result[0] })[0]]
         res.send({ total: total })
      } else {
         console.log(err)
      }
   })
}

// ADD A ROOM
exports.addRoom = async (req, res) => {
   const bhId = req.params.bhId
   const { roomName, roomDescription, roomType, genderCategory, numSlots, availableSlots } = req.body

   const sqlInsert =
      'INSERT INTO rooms (boardinghouse_id, room_name, room_description,room_type, gender_category, num_slots, available_slots) VALUE (?,?,?,?,?,?,?)'
   db.query(
      sqlInsert,
      [bhId, roomName, roomDescription, roomType, genderCategory, numSlots, availableSlots],
      (err, result) => {
         if (!err) {
            console.log(result)
            res.send({
               message: 'Room successfully Added!',
               ownerId: result.insertId,
            })
         } else {
            console.log(err)
            res.send({ message: err })
         }
      }
   )
}

// UPDATE A ROOM details
exports.updateRoom = async (req, res) => {
   const roomId = req.params.roomId
   res.send({
      roomId: roomId,
   })
}

exports.updateRoomAvailability = (req, res) => {
   const roomId = req.params.roomId
   res.send({
      roomId: roomId,
   })
}

exports.disableFullRoom = (req, res) => {
   const roomId = req.params.roomId
   res.send({
      roomId: roomId,
   })
}

// DELETE SPECIFIC ROOM
exports.deleteRoom = async (req, res) => {
   const roomId = req.params.roomId

   db.query(`DELETE FROM rooms WHERE room_id=?`, [roomId], (err, result) => {
      if (!err) {
         res.send({
            result: result,
            message: 'Room was successfully deleted!',
         })
      } else {
         res.send({
            message: err,
         })
         console.log(err)
      }
   })
}

// UPDATE ROOM AVAILABILITY
// UPDATE ROOM SLOTS STATUS
