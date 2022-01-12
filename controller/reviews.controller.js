const db = require("../connection");

const reviewRemap = (reviews) => {
   let formatted = reviews.map((review) => {
      return {
         id: review.review_id,
         boardinghouseId: review.boardinghouse_id,
         reviewerId: review.seeker_id,
         reviewerName: review.reviewer_name,
         text: review.review_text,
      };
   });
   return formatted;
};

exports.getAllReviews = (req, res) => {
   const bhId = req.params.bhId;
   db.query(
      `SELECT * FROM reviews WHERE boardinghouse_id = ? `,
      [bhId],
      (err, results) => {
         if (!err) {
            let formatted = reviewRemap(results);
            res.send(formatted);
         } else {
            res.send({ message: err });
            console.log(err);
         }
      }
   );
};

exports.addReview = (req, res) => {
   const bhId = req.params.bhId;
   const { seekerId, boardinghouseId, reviewDate, reviewerName, reviewText } =
      req.body;

   const sqlInsert =
      "INSERT INTO reviews (boardinghouse_id,seeker_id, review_text, reviewer_name, review_date ) VALUE (?,?,?,?,?)";
   db.query(
      sqlInsert,
      [bhId, seekerId, reviewText, reviewerName, reviewDate],
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

exports.getReview = (req, res) => {
   const reviewId = req.params.reviewId;
   db.query(
      `SELECT * FROM reviews WHERE review_id = ?`,
      [reviewId],
      (err, result) => {
         if (!err) {
            let formatted = reviewRemap(result);
            res.send(formatted);
         } else {
            res.send({ message: err });
         }
      }
   );
};
