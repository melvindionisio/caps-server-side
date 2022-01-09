const db = require("../connection");

exports.getBoardinghouseStars = (req, res) => {
   const bhId = req.params.bhId;

   db.query(
      `SELECT COUNT(*) FROM stars WHERE boardinghouse_id = ?`,
      [bhId],
      (err, result) => {
         if (!err) {
            let total = { ...result[0] }[Object.keys({ ...result[0] })[0]];
            res.send({ totalStars: total });
         } else {
            res.send({ message: err });
            console.log(err);
         }
      }
   );
};

exports.removeStar = (req, res) => {
   const { seekerId, bhId } = req.params;

   db.query(
      `DELETE FROM stars WHERE seeker_id = ? AND boardinghouse_id = ?`,
      [seekerId, bhId],
      (err, result) => {
         if (!err) {
            res.send({
               result: result,
               message: "Star was successfully removed!",
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

exports.addStar = (req, res) => {
   const bhId = req.params.bhId;
   const { seekerName } = req.body;

   const sqlInsert = "INSERT INTO stars (seeker_name) VALUE (?)";
   db.query(sqlInsert, [seekerName], (err, result) => {
      if (!err) {
         console.log(result);
         res.send({
            message: "Star added successfully!",
            result: result,
         });
      } else {
         console.log(err);
         res.send({ message: err });
      }
   });
};

exports.isStarred = (req, res) => {
   const { bhId, seekerId } = req.params;

   db.query(
      `SELECT * FROM stars WHERE seeker_id = ? AND boardinghouse_id = ?`,
      [seekerId, bhId],
      (err, result) => {
         if (!err) {
            if (result.length >= 0) {
               res.send({ isStarred: true });
            } else {
               res.send({
                  isStarred: false,
               });
            }
         } else {
            res.send({
               message: err,
            });
            console.log(err);
         }
      }
   );
};
