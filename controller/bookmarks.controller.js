const db = require("../connection");

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
