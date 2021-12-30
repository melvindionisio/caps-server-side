const db = require("../connection");

// LOGIN SEEKER ACCOUNT
// REGISTER SEEKER ACCOUNT
// continue with google
// continue with facebook
// UPDATE SEEKER ACCOUNT - add message after successful updating owner account
// GET ALL SEEKER's SAVED BOOKMARKED

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

exports.registerSeeker = (req, res) => {
  const { name, username, password } = req.body;
  res.send({ message: "this is for registration of user" });
};

exports.loginSeeker = (req, res) => {
  const { username, password } = req.body;
  res.send({ message: "This is for login in of user" });
};

exports.updateSeeker = (req, res) => {
  res.send({ message: "updating the user" });
};

exports.googleLogin = (req, res) => {
  res.send({ message: "this is for google signin" });
};

exports.facebookLogin = (req, res) => {
  res.send({ message: "this is for facebook signin" });
};
