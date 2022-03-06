const db = require("../connection");
const bcrypt = require("bcrypt");

// LOGIN SEEKER ACCOUNT
// REGISTER SEEKER ACCOUNT
// continue with google
// continue with facebook
// UPDATE SEEKER ACCOUNT - add message after successful updating owner account
// GET ALL SEEKER

const seekerRemap = (seekers) => {
   let formatted = seekers.map((seeker) => {
      return {
         id: seeker.seeker_id,
         name: seeker.seeker_name,
         username: seeker.seeker_username,
         googleId: seeker.google_id,
         facebookId: seeker.facebook_id,
      };
   });
   return formatted;
};

exports.getAllSeekers = (req, res) => {
   db.query(`SELECT * FROM boarding_house_seekers`, (err, result) => {
      if (!err) {
         res.send(seekerRemap(result));
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
            let formatted = seekerRemap(result);
            res.send(formatted[0]);
         } else {
            res.send({
               message: "error occured.",
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
         res.send({ message: "error occured." });
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
               //req.session.loggedin = true;
               //req.session.username = username;
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
                        });
                     } else {
                        res.send({
                           message: "error occured.",
                        });
                     }
                  }
               );
            }
         } else {
            res.send({ message: "error occured." });
         }
      }
   );
};

exports.googleLogin = (req, res) => {
   const { googleId, name, email } = req.body;

   db.query(
      `SELECT * FROM boarding_house_seekers WHERE google_id = ? AND seeker_username = ?`,
      [googleId, email],
      (err, result) => {
         if (!err) {
            if (result.length > 0) {
               res.send({
                  id: result[0].seeker_id,
                  message: "Successfully logged in using google",
               });
            } else {
               db.query(
                  "INSERT INTO boarding_house_seekers (google_id, seeker_name, seeker_username) VALUE (?,?,?)",
                  [googleId, name, email],
                  (err, result) => {
                     if (!err) {
                        res.send({
                           id: result.insertId, //error here
                           message: "Google Account Successfully Added!",
                        });
                     } else {
                        res.send({
                           message: "error occured.",
                        });
                     }
                  }
               );
            }
         } else {
            res.send({ message: "error occured." });
         }
      }
   );
};

exports.facebookLogin = (req, res) => {
   const { facebookId, name, email } = req.body;

   db.query(
      `SELECT * FROM boarding_house_seekers WHERE facebook_id = ? AND seeker_username = ?`,
      [facebookId, email],
      (err, result) => {
         if (!err) {
            if (result.length > 0) {
               res.send({
                  id: result[0].seeker_id,
                  message: "Successfully logged in using facebook.",
               });
            } else {
               db.query(
                  "INSERT INTO boarding_house_seekers (facebook_id, seeker_name, seeker_username) VALUE (?,?,?)",
                  [facebookId, name, email],
                  (err, result) => {
                     if (!err) {
                        res.send({
                           message: "Facebook Account Successfully Added!",
                        });
                     } else {
                        res.send({
                           message: "error occured.",
                        });
                     }
                  }
               );
            }
         } else {
            res.send({ message: "error occured." });
         }
      }
   );
};
