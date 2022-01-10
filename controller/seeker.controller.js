const db = require("../connection");
const bcrypt = require("bcrypt");

// LOGIN SEEKER ACCOUNT
// REGISTER SEEKER ACCOUNT
// continue with google
// continue with facebook
// UPDATE SEEKER ACCOUNT - add message after successful updating owner account
// GET ALL SEEKER

exports.getAllSeekers = (req, res) => {
   db.query(`SELECT * FROM boarding_house_seekers`, (err, result) => {
      if (!err) {
         res.send(result);
      } else {
         console.log(err);
      }
   });
};

exports.getSeekerProfile = (req, res) => {
   const seekerId = req.params.seekerId;
   db.query(
      `SELECT * FROM boarding_house_seekers WHERE seeker_id = ? `,
      [seekerId],
      (err, result) => {
         if (!err) {
            res.send(result[0]);
         } else {
            res.send({
               message: err,
            });
         }
      }
   );
};

saltRounds = 5;
exports.registerSeeker = async (req, res) => {
   const { name, username, password } = req.body;
   const encryptedPassword = await bcrypt.hash(password, saltRounds);

   const sqlInsert =
      "INSERT INTO boarding_house_seekers (seeker_name, seeker_username, seeker_password) VALUE (?,?,?)";
   db.query(sqlInsert, [name, username, encryptedPassword], (err, result) => {
      if (!err) {
         res.send({
            message: "Seeker successfully registered!",
            seekerId: result.insertId,
         });
      } else {
         console.log(err);
         res.send({ message: err });
      }
   });
};

exports.loginSeeker = (req, res) => {
   const username = req.body.username;
   const password = req.body.password;

   if (username && password) {
      db.query(
         "SELECT * FROM boarding_house_seekers WHERE seeker_username = ?",
         [username],
         async (err, result) => {
            if (err) {
               res.send({
                  code: 400,
                  failed: "Error Occured",
                  error: err,
               });
            }
            if (result.length > 0) {
               req.session.loggedin = true;
               req.session.username = username;
               const validate = await bcrypt.compare(
                  password,
                  result[0].seeker_password
               );

               if (username === result[0].seeker_username && validate) {
                  res.send({
                     ...result[0],
                     message: "You successfully logged in!",
                     status: "success",
                  });
               } else if (username === result[0].seeker_username || validate) {
                  res.send({
                     message: "Your Password was Incorrect!",
                     status: "incorrect",
                  });
               } else {
                  res.send({
                     message: "The account was not found! Please try again.",
                     status: "not-found",
                  });
               }
            } else {
               res.send({ message: "User does not exist!" });
               res.end();
            }
            console.log(result);
         }
      );
   } else {
      res.send({ message: "Please enter username and password" });
   }
};

exports.updateSeekerProfile = (req, res) => {
   const seekerId = req.params.seekerId;
   const { name, username } = req.body;

   db.query(
      `UPDATE boarding_house_seekers SET seeker_name = ?, seeker_username = ? WHERE seeker_id = ?`,
      [name, username, seekerId],
      (err, result) => {
         if (!err) {
            res.send({
               message: "Your account has been updated.",
               result: result,
            });
         } else {
            res.send({
               message: "Error Occured",
               error: err,
            });
         }
      }
   );
};

exports.authenticateUpdatePassword = (req, res) => {
   const seekerId = req.params.seekerId;
   const { currentPassword, newPassword } = req.body;
   db.query(
      `SELECT * FROM boarding_house_seekers WHERE seeker_id = ?`,
      [seekerId],
      async (err, result) => {
         if (!err) {
            const validate = await bcrypt.compare(
               currentPassword,
               result[0].seeker_password
            );
            if (validate) {
               const encryptedPassword = await bcrypt.hash(
                  newPassword,
                  saltRounds
               );
               db.query(
                  `UPDATE boarding_house_seekers SET seeker_password = ? WHERE seeker_id = ?`,
                  [encryptedPassword, seekerId],
                  (err, result) => {
                     if (!err) {
                        res.send({
                           message: "Your account has been updated.",
                           result: result,
                        });
                     } else {
                        res.send({
                           message: err,
                        });
                     }
                  }
               );
            }
         } else {
            res.send({ message: err });
         }
      }
   );
};

exports.googleLogin = (req, res) => {
   const googleId = req.body.googleId;
   const googleName = req.body.googleName;

   res.send({
      message: "this is for google signin",
      account: [googleId, googleName],
   });
};

exports.facebookLogin = (req, res) => {
   const facebookId = req.body.facebookId;
   const facebookName = req.body.facebookName;

   res.send({
      message: "this is for facebook signin",
      account: [facebookId, facebookName],
   });
};
