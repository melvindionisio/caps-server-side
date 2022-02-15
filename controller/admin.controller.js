const db = require("../connection");
const express = require("express");
const bcrypt = require("bcrypt");
const domain = require("../domain/domain");
const fetch = require("node-fetch");

const adminRemap = (admins) => {
   let formatted = admins.map((admin) => {
      return {
         name: admin.admin_name,
         username: admin.admin_username,
      };
   });
   return formatted;
};

const saltRounds = 5;
exports.registerAdmin = async (req, res) => {
   const { name, username, password } = req.body;
   console.log(name, username, password);
   const encryptedPassword = await bcrypt.hash(password, saltRounds);

   const sqlInsert =
      "INSERT INTO admin (admin_name, admin_username, admin_password) VALUE (?,?,?)";
   db.query(sqlInsert, [name, username, encryptedPassword], (err, result) => {
      if (!err) {
         console.log(result);
         res.send({
            message: "Admin successfully registered!",
            ownerId: result.insertId,
         });
      } else {
         console.log(err);
         res.send({ message: err });
      }
   });
};

// LOGIN ADMIN
exports.loginAdmin = async (req, res) => {
   const { username, password } = req.body;

   if (username && password) {
      db.query(
         "SELECT * FROM admin WHERE admin_username = ?",
         [username],
         async (err, result) => {
            if (err) {
               res.send({
                  code: 400,
                  failed: "Error Occured",
                  error: err,
               });
               console.log(err);
            }
            if (result.length > 0) {
               const validate = await bcrypt.compare(
                  password,
                  result[0].admin_password
               );
               if (username === result[0].admin_username && validate) {
                  res.send({
                     ...result[0],
                     message: "You successfully logged in!",
                     error: null,
                  });
               } else if (username === result[0].admin_username || validate) {
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

exports.updateAdminProfile = (req, res) => {
   const adminId = req.params.adminId;
   const { newUsername, newName } = req.body;

   db.query(
      `UPDATE admin SET admin_name = ?, admin_username = ? WHERE admin_id = ?`,
      [newName, newUsername, adminId],
      (err, result) => {
         if (!err) {
            res.send({ message: "Profile successfully changed!" });
         } else {
            console.log(err);
            res.send({ message: err });
         }
      }
   );
};

exports.updateAdminPassword = async (req, res) => {
   const adminId = req.params.adminId;
   const { currentPassword, newPassword } = req.body;

   db.query(
      `SELECT * FROM admin WHERE admin_id = ?`,
      [adminId],
      async (err, result) => {
         if (!err) {
            const validate = await bcrypt.compare(
               currentPassword,
               result[0].admin_password
            );
            if (validate) {
               const encryptedPassword = await bcrypt.hash(
                  newPassword,
                  saltRounds
               );
               db.query(
                  `UPDATE admin SET admin_password = ? WHERE admin_id = ?`,
                  [encryptedPassword, adminId],
                  async (err, result) => {
                     if (!err) {
                        res.send({
                           message: "Your password successfully changed!",
                           err: null,
                        });
                     } else {
                        res.send({ message: err });
                        console.log(err);
                     }
                  }
               );
            } else {
               res.send({
                  message: "Current Password not match",
                  err: "incorrect-current",
               });
            }
         } else {
            res.send({ message: err });
         }
      }
   );
};

exports.validateAdmin = (req, res) => {
   const { password, admin } = req.body;
   if (password) {
      db.query(
         `SELECT * FROM admin WHERE admin_username = ? `,
         [admin],
         async (err, result) => {
            if (!err) {
               const validate = await bcrypt.compare(
                  password,
                  result[0].admin_password
               );
               res.send({
                  isValid: validate,
               });
            }
         }
      );
   }
};

// DELETE SPECIFIC OWNER ACCOUNT - INCLUDING THE BOARDING HOUSE CONNECTED TO THE ACCOUNT

// To Delete the owner
// 1. first delete all rooms of boarding house that the owner owned
// 2. then delete the boarding house itself
// 3. last will be the owner acoount
exports.deleteOwner = (req, res) => {
   const ownerId = req.params.ownerId;

   fetch(`${domain}/api/boarding-houses/by-owner/${ownerId}`)
      .then((res) => res.json())
      .then((boardinghouse) => {
         db.query(
            "SELECT * FROM rooms WHERE boardinghouse_id = ?",
            [boardinghouse.id],
            (err, rooms) => {
               if (!err) {
                  // TO DO HERE.
                  //DELETE EACH ROOM PICTURE FILE FIRST
                  //DELETE ALL USER BOOKMARKED RELATED TO THE ROOM
                  //DELETE THE ROOM ITSELF
                  rooms.map((room) => {
                     fetch(`${domain}/api/rooms/delete/${room_id}`, {
                        method: "DELETE",
                     })
                        .then((res) => res.json())
                        .then((data) => console.log(data))
                        .catch((err) => console.log(err));
                  });

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
                                       message: `All related data about the owner has been deleted.`,
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
               } else {
                  console.log(err);
                  res.send({ message: err });
               }
            }
         );
      })
      .catch((err) => console.log(err));
};
