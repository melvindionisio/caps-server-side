const db = require("../connection");

exports.addBookmark = (req, res) => {
  const seekerId = req.params.seekerId;
  res.send({
    message: "This will add the bookmark to dedicated seeker",
    seekerId: seekerId,
  });
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
