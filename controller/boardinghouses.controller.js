const db = require("../connection");

// ADD BASIC BH INFO FROM ADMIN ✅ DONE!
exports.registerBoardinghouse = (req, res) => {
  const boardinghouse_owner = req.body.boardinghouse_owner;
  const boardinghouse_name = req.body.boardinghouse_name;
  const street_address = req.body.street_address;
  const zone_address = req.body.zone_address;
  const complete_address = req.body.complete_address;
  const contact_number = req.body.contact_number;
  const tagline = req.body.tagline;

  const ownerId = req.params.ownerId;

  const sqlInsert =
    "INSERT INTO boarding_house (bh_name, bh_owner, bh_street_address, bh_zone_address, bh_complete_address, bh_contacts, tagline, bho_id) VALUE (?,?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      boardinghouse_name,
      boardinghouse_owner,
      street_address,
      zone_address,
      complete_address,
      contact_number,
      tagline,
      ownerId,
    ],
    (err, result) => {
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
    }
  );
};

// GET ALL BOARDING HOUSE ✅ DONE!
exports.getAllBoardinghouse = (req, res) => {
  db.query(`SELECT * FROM boarding_house`, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
    }
  });
};

// GET ALL BOARDING HOUSE Export ✅ DONE!
exports.getAllBoardinghouseExport = (req, res) => {
  db.query(
    `SELECT boardinghouse_id, bh_name, bh_owner, bh_street_address, bh_zone_address FROM boarding_house`,
    (err, results) => {
      if (!err) {
        const newResults = results.map((item) => {
          return {
            id: item.boardinghouse_id,
            name: item.bh_name,
            owner_name: item.bh_owner,
            street: item.bh_street_address,
            zone: item.bh_zone_address,
          };
        });
        res.send(newResults);
      } else {
        console.log(err);
      }
    }
  );
};

// GET NUMBER OF TOTAL BOARDING HOUSE ✅DONE!
exports.getTotalBoardinghouse = (req, res) => {
  db.query(`SELECT COUNT(*) FROM boarding_house`, (err, result) => {
    if (!err) {
      let total = { ...result[0] }[Object.keys({ ...result[0] })[0]];
      res.send({ total: total });
    } else {
      console.log(err);
    }
  });
};

// GET NUMBER OF TOTAL BOARDING HOUSE by ZONE ✅DONE!
exports.getTotalBoardinghouseByZone = (req, res) => {
  let zoneAddress = req.params.zoneAddress;
  zoneAddress = zoneAddress.charAt(0).toUpperCase() + zoneAddress.slice(1);
  const zone = zoneAddress.replace(/-/g, " ");
  db.query(
    `SELECT COUNT(*) FROM boarding_house WHERE bh_zone_address = ? `,
    [zone],
    (err, result) => {
      if (!err) {
        let total = { ...result[0] }[Object.keys({ ...result[0] })[0]];
        res.send({ total: total });
      } else {
        console.log(err);
      }
    }
  );
};

// GET ALL BOARDINGHOUSE BY ZONE ✅DONE!
exports.getAllBoardinghousesByZone = (req, res) => {
  const zoneAddress = req.params.zoneAddress;
  const zone = zoneAddress.replace(/-/g, " ");
  db.query(
    `SELECT * FROM boarding_house WHERE bh_zone_address= ? `,
    [zone],
    (err, result) => {
      if (!err) {
        res.send(result);
      } else {
        console.log(err);
      }
    }
  );
};

// GET SPECIFIC BOARDING HOUSE ✅ DONE!
exports.getBoardinghouseById = (req, res) => {
  const boardinghouseId = req.params.bhId;
  // res.send(boardinghouseId);
  db.query(
    `SELECT * FROM boarding_house WHERE boardinghouse_id = ? `,
    [boardinghouseId],
    (err, result) => {
      if (!err) {
        res.send({ ...result[0] });
      } else {
        console.log(err);
      }
    }
  );
};

// GET SPECIFIC BOARDING HOUSE by OwnerID ✅ DONE!
exports.getBoardinghouseByOwnerId = (req, res) => {
  const ownerId = req.params.ownerId;
  db.query(
    `SELECT * FROM boarding_house WHERE bho_id = ?`,
    [ownerId],
    (err, result) => {
      if (!err) {
        res.send({
          ...result[0],
        });
      } else {
        console.log(err);
      }
    }
  );
};

// UPDATE SPECIFIC BOARDING HOUSE by OwnerID
// missing!

// ! FOR MAP PURPOSE - GET ALL THE LONGITUDE, LATITUDE, NAME, ADDRESS of BH ✅ DONE!
exports.getAllBoardinghouseLocations = (req, res) => {
  db.query(
    `SELECT boardinghouse_id, bh_name, bh_complete_address, bh_longitude, bh_latitude FROM boarding_house`,
    (err, result) => {
      if (!err) {
        res.send(result);
      } else {
        console.log(err);
      }
    }
  );
};

// GET SPECIFIC BOARDINGHOUSE LOCATION BY OWNER ID ✅ DONE!
exports.getBoardinghouseLocation = (req, res) => {
  const ownerId = req.params.ownerId;

  db.query(
    `SELECT boardinghouse_id, bh_name, bh_complete_address, bh_longitude, bh_latitude FROM boarding_house WHERE bho_id = ?`,
    [ownerId],
    (err, result) => {
      if (!err) {
        res.send({ ...result[0] });
      } else {
        console.log(err);
      }
    }
  );
};
