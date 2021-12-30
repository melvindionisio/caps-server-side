const db = require("../connection");

exports.addBookmark = (req, res) => {
  const seekerId = req.params.seekerId;
  const { bookmarkDate, roomId, boardinghouseId } = req.body;

  const sqlInsert =
    "INSERT INTO bookmarks (bookmark_date, seeker_id , room_id, boardinghouse_id) VALUE (?,?,?,?)";
  db.query(
    sqlInsert,
    [bookmarkDate, seekerId, roomId, boardinghouseId],
    (err, result) => {
      if (!err) {
        console.log(result);
        res.send({
          message: "Bookmark added",
        });
      } else {
        console.log(err);
        res.send({ message: err });
      }
    }
  );
};

// this will return all bookmarks with the generated liks
exports.getAllSeekerBookmarks = (req, res) => {
  const seekerId = req.params.seekerId;

  db.query(
    `SELECT * FROM bookmarks WHERE seeker_id = ? `,
    [seekerId],
    (err, result) => {
      if (!err) {
        res.send(result);
      } else {
        console.log(err);
      }
    }
  );
};

exports.deleteBookmark = (req, res) => {
  const bookmarkId = req.params.bookmarkId;
  res.send({
    message: "This is where to delete bookmarkId",
    bookmarkId: bookmarkId,
  });
};
