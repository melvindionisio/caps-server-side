const db = require("../connection");

exports.getAllReviews = (req, res) => {
  const bhId = req.params.bhId;
  res.send({ bhId: bhId, message: "success" });
  /* db.query(
    `SELECT * FROM reviews WHERE boardinghouse_id = ? `,
    [bhId],
    (err, result) => {
      if (!err) {
        res.send({ message: "recieved" });
      } else {
        console.log(err);
      }
    }
  );
*/
};

exports.getReview = (req, res) => {
  const reviewId = req.params.reviewId;
  res.send({
    message: "this will hold an individual review to view",
    reviewId: reviewId,
  });
};

exports.addReview = (req, res) => {
  res.send({
    message: "post request for adding a review to an individual boardinghouse",
  });
};

exports.updateReview = (req, res) => {
  const reviewId = req.params.reviewId;
  res.send({
    message: "This is where you can update specific review.",
    reviewId: reviewId,
  });
};

exports.deleteReview = (req, res) => {
  const reviewId = req.params.reviewId;
  res.send({
    message: "Will delete specific review",
    reviewId: reviewId,
  });
};
