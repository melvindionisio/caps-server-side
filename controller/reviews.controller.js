const db = require("../connection");

const reviewRemap = (reviews) => {
   let formatted = reviews.map((review) => {
      return {
         id: review.review_id,
         boardinghouseId: review.boardinghouse_id,
         reviewerId: review.seeker_id,
         reviewerName: review.reviewer_name,
         text: review.review_text,
         date: review.review_date,
         status: review.status,
      };
   });
   return formatted;
};

exports.getAllReviews = (req, res) => {
   const bhId = req.params.bhId;
   db.query(
      `SELECT * FROM reviews WHERE boardinghouse_id = ? AND status = 'approved' `,
      [bhId],
      (err, results) => {
         if (!err) {
            let formatted = reviewRemap(results);
            res.send(formatted);
         } else {
            res.send({ message: "error occured." });
            console.log(err);
         }
      }
   );
};

exports.addReview = (req, res) => {
   const bhId = req.params.bhId;
   const { seekerId, reviewDate, reviewerName, reviewText, reviewStatus } =
      req.body;

   const sqlInsert =
      "INSERT INTO reviews (boardinghouse_id,seeker_id, review_text, reviewer_name, review_date, status ) VALUE (?,?,?,?,?,?)";
   db.query(
      sqlInsert,
      [bhId, seekerId, reviewText, reviewerName, reviewDate, reviewStatus],
      (err, result) => {
         if (!err) {
            res.send({
               message: "Review successfully Added!",
               result: result,
            });
         } else {
            console.log(err);
            res.send({ message: "error occured." });
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
               message: "Your review was successfully deleted!",
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

exports.deleteAllReview = (req, res) => {
   const bhId = req.params.bhId;
   db.query(
      `DELETE FROM reviews WHERE boardinghouse_id = ?`,
      [bhId],
      (err, result) => {
         if (!err) {
            res.send({
               message:
                  "All reviews of boarding house was successfully deleted!",
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
            res.send({ message: "error occured." });
         }
      }
   );
};

exports.approveReview = (req, res) => {
   const reviewId = req.params.reviewId;
   const status = req.body.status;
   console.log(reviewId);
   db.query(
      `UPDATE reviews SET status = ? WHERE review_id = ?`,
      [status, reviewId],
      (err, result) => {
         if (!err) {
            res.send({
               message: `${reviewId} review has been approved.`,
            });
         } else {
            res.send({ message: "error occured." });
         }
      }
   );
};

exports.getAllPendingReviews = (req, res) => {
   db.query(
      `SELECT * FROM reviews WHERE status = 'pending'`,
      (err, results) => {
         if (!err) {
            let formatted = reviewRemap(results);
            res.send(formatted);
         } else {
            res.send({ message: "error occured." });
            console.log(err);
         }
      }
   );
};

exports.getBhPendingReviews = (req, res) => {
   const bhId = req.params.bhId;
   db.query(
      `SELECT * FROM reviews WHERE boardinghouse_id = ? AND status = 'pending' `,
      [bhId],
      (err, results) => {
         if (!err) {
            let formatted = reviewRemap(results);
            res.send(formatted);
         } else {
            res.send({ message: "error occured." });
            console.log(err);
         }
      }
   );
};
