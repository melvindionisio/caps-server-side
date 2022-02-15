const db = require("../connection");
const bcrypt = require("bcrypt");

// GET ALL OWNER ACCOUNT
exports.getAllOwners = async (req, res) => {
   db.query(
      `SELECT bho_id, bho_name, bho_username FROM boarding_house_owners`,
      (err, result) => {
         if (!err) {
            let formatted = result.map((item) => {
               return {
                  id: item.bho_id,
                  name: item.bho_name,
                  username: item.bho_username,
               };
            });
            res.send(formatted);
         } else {
            console.log(err);
         }
      }
   );
};

// GET SPECIFIC OWNER ACCOUNT
exports.getOwner = (req, res) => {
   const ownerId = req.params.ownerId;

   db.query(
      `SELECT * FROM boarding_house_owners WHERE bho_id = ?`,
      [ownerId],
      (err, result) => {
         if (!err) {
            let formatted = result.map((item) => {
               return {
                  id: item.bho_id,
                  name: item.bho_name,
                  username: item.bho_username,
               };
            });
            res.send(formatted[0]);
         } else {
            console.log(err);
         }
      }
   );
};

// REGISTER OWNER ACCOUNT ✅ DONE!
const saltRounds = 5;
exports.registerOwner = async (req, res) => {
   const name = req.body.name;
   const username = req.body.username;
   const password = req.body.password;
   const encryptedPassword = await bcrypt.hash(password, saltRounds);

   const sqlInsert =
      "INSERT INTO boarding_house_owners (bho_name, bho_username, bho_password) VALUE (?,?,?)";
   db.query(sqlInsert, [name, username, encryptedPassword], (err, result) => {
      if (!err) {
         console.log(result);
         res.send({
            message: "Owner successfully registered!",
            ownerId: result.insertId,
         });
      } else {
         console.log(err);
         res.send({ message: err });
      }
   });
};

// LOGIN OWNER ACCOUNT ✅ SEMI-DONE!
exports.loginOwner = async (req, res) => {
   const username = req.body.owner_username;
   const password = req.body.owner_password;

   if (username && password) {
      db.query(
         "SELECT * FROM boarding_house_owners WHERE bho_username = ?",
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
                  result[0].bho_password
               );
               if (username === result[0].bho_username && validate) {
                  res.send({
                     ...result[0],
                     message: "You successfully logged in!",
                     error: "success",
                  });
               } else if (username === result[0].bho_username || validate) {
                  res.send({
                     message: "Your Password was Incorrect!",
                  });
               } else {
                  res.send({
                     message: "The account was not found! Please try again.",
                  });
               }
            } else {
               res.send({ message: "User does not exist!" });
               res.end();
            }
         }
      );
   } else {
      res.send("Please enter username and password");
   }
};

// UPDATE SPECIFIC OWNER PROFILE | name | username ✅ Done !
exports.updateOwnerProfile = (req, res) => {
   const ownerId = req.params.ownerId;
   const newName = req.body.newName;
   const newUsername = req.body.newUsername;
   db.query(
      `UPDATE boarding_house_owners SET bho_name = ?, bho_username = ? WHERE bho_id = ?`,
      [newName, newUsername, ownerId],
      (err, result) => {
         if (!err) {
            res.send({ message: "Profile successfully changed!" });
            db.query(
               `UPDATE boarding_house SET bh_owner = ? WHERE bho_id = ?`,
               [newName, ownerId],
               (err, result) => {
                  console.log(result);
               }
            );
            console.log("id", result.affectedRows, "has updated.");
         } else {
            console.log(err);
            res.send({ message: err });
         }
      }
   );
};

// UPDATE SPECIFIC OWNER PASSWORD ✅ Done !
exports.updateOwnerPassword = async (req, res) => {
   const ownerId = req.params.ownerId;
   const { newPassword } = req.body;

   const encryptedPassword = await bcrypt.hash(newPassword, saltRounds);
   // ! HASH PASSWORD BEFORE SENDING TO DB
   db.query(
      `UPDATE boarding_house_owners SET bho_password = ? WHERE bho_id = ?`,
      [encryptedPassword, ownerId],
      async (err, result) => {
         if (!err) {
            res.send({ message: "Password successfully changed!" });
         } else {
            res.send({ message: err });
            console.log(err);
         }
      }
   );
};

// DELETE SPECIFIC OWNER ACCOUNT - INCLUDING THE BOARDING HOUSE CONNECTED TO THE ACCOUNT

// To Delete the owner
// 1. first delete all rooms of boarding house that the owner owned
// 2. then delete the boarding house itself
// 3. last will be the owner acoount
exports.deleteOwner = async (req, res) => {
   const ownerId = req.params.ownerId;
   console.log(ownerId);

   // DELETE BOARINGHOUSE OWNED

   db.query(
      "DELETE FROM boarding_house WHERE bho_id = ?",
      [ownerId],
      (err, result) => {
         if (!err) {
            db.query(
               "DELETE FROM boarding_house_owners WHERE bho_id = ?",
               [ownerId],
               (err, result) => {
                  if (!err) {
                     res.send({
                        result: result,
                        message: `Owner at ${ownerId} successfully deleted!`,
                     });
                  } else {
                     res.send({ message: err });
                     console.log(err);
                  }
               }
            );
         } else {
            res.send({ message: err });
            console.log(err);
         }
      }
   );
};
