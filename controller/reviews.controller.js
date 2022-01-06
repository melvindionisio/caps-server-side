const db = require("../connection");

exports.getAllReviews = (req, res) => {
  const bhId = req.params.bhId;
  db.query(
    `SELECT * FROM reviews WHERE boardinghouse_id = ? `,
    [bhId],
    (err, results) => {
      if (!err) {
        res.send(results);
      } else {
        res.send({ message: err });
        console.log(err);
      }
    }
  );
};

exports.getReview = (req, res) => {
  const reviewId = req.params.reviewId;
  db.query(
    `SELECT * FROM reviews WHERE review_id = ?`,
    [reviewId],
    (err, result) => {
      if (!err) {
        res.send(result);
      } else {
        res.send({ message: err });
        console.log(err);
      }
    }
  );
};

exports.addReview = (req, res) => {
  const bhId = req.params.bhId;
  const { seekerId, reviewerName, reviewText } = req.body;

  const sqlInsert =
    "INSERT INTO reviews (boardinghouse_id,seeker_id, review_text, reviewer_name ) VALUE (?,?,?,?)";
  db.query(
    sqlInsert,
    [bhId, seekerId, reviewText, reviewerName],
    (err, result) => {
      if (!err) {
        console.log(result);
        res.send({
          message: "Review successfully Added!",
          result: result,
        });
      } else {
        console.log(err);
        res.send({ message: err });
      }
    }
  );
};

exports.deleteReview = (req, res) => {
  const reviewId = req.params.reviewId;
  db.query(
    `DELETE FROM reviews WHERE review_id=?`,
    [reviewId],
    (err, result) => {
      if (!err) {
        res.send({
          result: result,
          message: "Your review was successfully deleted!",
        });
      } else {
        res.send({
          message: err,
        });
        console.log(err);
      }
    }
  );
};
