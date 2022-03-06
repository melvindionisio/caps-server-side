const db = require("../connection");

exports.addBookmark = (req, res) => {
   const seekerId = req.params.seekerId;
   const { bookmarkDate, roomId, boardinghouseId, bookmarkName, bookmarkType } =
      req.body;

   const sqlInsert =
      "INSERT INTO bookmarks (bookmark_date, seeker_id, bookmark_name, bookmark_type , room_id, boardinghouse_id) VALUE (?,?,?,?,?,?)";
   db.query(
      sqlInsert,
      [
         bookmarkDate,
         seekerId,
         bookmarkName,
         bookmarkType,
         roomId,
         boardinghouseId,
      ],
      (err, result) => {
         if (!err) {
            res.send({
               message: "Bookmark added",
            });
         } else {
            console.log(err);
            res.send({ message: "error occured." });
         }
      }
   );
};

exports.getAllSeekerBookmarks = (req, res) => {
   const seekerId = req.params.seekerId;

   db.query(
      `SELECT * FROM bookmarks WHERE seeker_id = ? `,
      [seekerId],
      (err, results) => {
         if (!err) {
            const formatted = results.map((item) => {
               return {
                  id: item.bookmark_id,
                  date: item.bookmark_date,
                  seekerId: item.seeker_id,
                  roomId: item.room_id,
                  boardinghouseId: item.boardinghouse_id,
                  type: item.bookmark_type,
                  name: item.bookmark_name,
               };
            });
            res.send(formatted);
         } else {
            res.send({ message: "error occured." });
            console.log(err);
         }
      }
   );
};

exports.deleteBookmark = (req, res) => {
   const bookmarkId = req.params.bookmarkId;

   db.query(
      `DELETE FROM bookmarks WHERE bookmark_id=?`,
      [bookmarkId],
      (err, result) => {
         if (!err) {
            res.send({
               message: "Bookmark successfully deleted!",
            });
         } else {
            res.send({
               message: "error occured.",
            });
            console.log(err);
         }
      }
   );
};

exports.deleteBookmarkedRoom = (req, res) => {
   const roomId = req.params.roomId;

   db.query(
      `DELETE FROM bookmarks WHERE room_id=?`,
      [roomId],
      (err, result) => {
         if (!err) {
            res.send({
               message: "Bookmark successfully deleted!",
            });
         } else {
            res.send({
               message: "error occured.",
            });
            console.log(err);
         }
      }
   );
};

exports.deleteBookmarkedBoardinghouse = (req, res) => {
   const bhId = req.params.bhId;

   db.query(
      `DELETE FROM bookmarks WHERE boardinghouse_id = ?`,
      [bhId],
      (err, result) => {
         if (!err) {
            res.send({
               message: "Bookmark successfully deleted!",
            });
         } else {
            res.send({
               message: "error occured.",
            });
            console.log(err);
         }
      }
   );
};

exports.roomIsBookmarked = (req, res) => {
   const { seekerId, roomId } = req.params;

   db.query(
      `SELECT * FROM bookmarks WHERE room_id = ? AND seeker_id = ? `,
      [roomId, seekerId],
      (err, results) => {
         if (!err) {
            if (results.length > 0) {
               res.send({ isBookmarked: true });
            } else {
               res.send({ isBookmarked: false });
            }
         } else {
            res.send({ message: "error occured." });
            console.log(err);
         }
      }
   );
};

exports.bhIsBookmarked = (req, res) => {
   const { bhId, seekerId } = req.params;
   db.query(
      `SELECT * FROM bookmarks WHERE boardinghouse_id = ? AND seeker_id = ? `,
      [bhId, seekerId],
      (err, results) => {
         if (!err) {
            if (results.length > 0) {
               res.send({ isBookmarked: true });
            } else {
               res.send({ isBookmarked: false });
            }
         } else {
            res.send({ message: "error occured." });
            console.log(err);
         }
      }
   );
};
