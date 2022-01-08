const db = require('../connection');

exports.addBookmark = (req, res) => {
   const seekerId = req.params.seekerId;
   const { bookmarkDate, roomId, boardinghouseId, bookmarkName, bookmarkType } = req.body;

   const sqlInsert =
      'INSERT INTO bookmarks (bookmark_date, seeker_id, bookmark_name, bookmark_type , room_id, boardinghouse_id) VALUE (?,?,?,?,?,?)';
   db.query(sqlInsert, [bookmarkDate, seekerId, bookmarkName, bookmarkType, roomId, boardinghouseId], (err, result) => {
      if (!err) {
         console.log(result);
         res.send({
            message: 'Bookmark added',
         });
      } else {
         console.log(err);
         res.send({ message: err });
      }
   });
};

exports.getAllSeekerBookmarks = (req, res) => {
   const seekerId = req.params.seekerId;

   db.query(`SELECT * FROM bookmarks WHERE seeker_id = ? `, [seekerId], (err, results) => {
      if (!err) {
         const formatted = results.map(item => {
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
         res.send({ message: err });
         console.log(err);
      }
   });
};

exports.deleteBookmark = (req, res) => {
   const bookmarkId = req.params.bookmarkId;

   db.query(`DELETE FROM bookmarks WHERE bookmark_id=?`, [bookmarkId], (err, result) => {
      if (!err) {
         res.send({
            result: result,
            message: 'Bookmark successfully deleted!',
         });
      } else {
         res.send({
            message: err,
         });
         console.log(err);
      }
   });
};
