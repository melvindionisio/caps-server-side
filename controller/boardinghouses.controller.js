const db = require("../connection");

// const _bhRemap = (result) => {
//   let boardinghouses =
// }

// ADD BASIC BH INFO FROM ADMIN ✅ DONE!
exports.registerBoardinghouse = (req, res) => {
  const boardinghouse_owner = req.body.boardinghouse_owner;
  const boardinghouse_name = req.body.boardinghouse_name;
  const street_address = req.body.street_address;
  const zone_address = req.body.zone_address;
  const complete_address = req.body.complete_address;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  const contact_number = req.body.contact_number;
  const tagline = req.body.tagline;

  const ownerId = req.params.ownerId;

  const sqlInsert =
    "INSERT INTO boarding_house (bh_name, bh_owner, bh_street_address, bh_zone_address, bh_complete_address, bh_longitude, bh_latitude, bh_contacts, tagline, bho_id) VALUE (?,?,?,?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      boardinghouse_name,
      boardinghouse_owner,
      street_address,
      zone_address,
      complete_address,
      longitude,
      latitude,
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
  res.send([
    {
      id: 4,
      ownerId: 4,
      name: "UEP Men's Dorm",
      owner: "UEP",
      streetAddress: "Seaside",
      zoneAddress: "Zone 1",
      completeAddress: "Seaside - Zone 1, UEP",
      longitude: 124.6652,
      latitude: 12.5111,
      contacts: "+639",
      popularity: null,
      tagline: "Welcome to UEP Men's Dorm!",
      houseProtocols: null,
      offers: null,
      priceRange: null,
      waterSource: null,
      genderCategory: null,
      totalRooms: null,
    },
    {
      id: 6,
      ownerId: 6,
      name: "UEP Women's Dorm",
      owner: "UEP",
      streetAddress: "University Town",
      zoneAddress: "Zone 1",
      completeAddress: "University Town - Zone 1, UEP",
      longitude: 124.665,
      latitude: 12.5109,
      contacts: "+639",
      popularity: null,
      tagline: "Welcome to UEP Women's Dorm!",
      houseProtocols: null,
      offers: null,
      priceRange: null,
      waterSource: null,
      genderCategory: null,
      totalRooms: null,
    },
    {
      id: 7,
      ownerId: 7,
      name: "Bahay Kubo",
      owner: "Jhelan Anabo",
      streetAddress: "Seaside",
      zoneAddress: "Zone 2",
      completeAddress: "Seaside - Zone 1, UEP",
      longitude: 124.6662,
      latitude: 12.5107,
      contacts: "+639",
      popularity: null,
      tagline: "Maliit lamang",
      houseProtocols: null,
      offers: null,
      priceRange: null,
      waterSource: null,
      genderCategory: null,
      totalRooms: null,
    },
  ]);
  // db.query(`SELECT * FROM boarding_house`, (err, result) => {
  //   let boardinghouses = [];
  //   if (!err) {
  //     boardinghouses = Array.from(result, (boardinghouse) => {
  //       return {
  //         id: boardinghouse.boardinghouse_id,
  //         ownerId: boardinghouse.bho_id,
  //         name: boardinghouse.bh_name,
  //         owner: boardinghouse.bh_owner,
  //         streetAddress: boardinghouse.bh_street_address,
  //         zoneAddress: boardinghouse.bh_zone_address,
  //         completeAddress: boardinghouse.bh_complete_address,
  //         longitude: boardinghouse.bh_longitude,
  //         latitude: boardinghouse.bh_latitude,
  //         contacts: boardinghouse.bh_contacts,
  //         popularity: boardinghouse.bh_popularity,
  //         tagline: boardinghouse.tagline,
  //         houseProtocols: boardinghouse.house_protocols,
  //         offers: boardinghouse.offers,
  //         priceRange: boardinghouse.price_range,
  //         waterSource: boardinghouse.water_source,
  //         genderCategory: boardinghouse.gender_category,
  //         totalRooms: boardinghouse.total_rooms,
  //       };
  //     });
  //     res.send(boardinghouses);
  //     console.log("Boarding houses retrieved.");
  //   } else {
  //     console.log(err);
  //   }
  // });
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
        if (result.length >= 0) {
          let total = { ...result[0] }[Object.keys({ ...result[0] })[0]];
          res.send({ total: total });
        } else {
          res.send({ total: 0 });
        }
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
      let boardinghouses = [];
      if (!err) {
        boardinghouses = Array.from(result, (boardinghouse) => {
          return {
            id: boardinghouse.boardinghouse_id,
            ownerId: boardinghouse.bho_id,
            name: boardinghouse.bh_name,
            owner: boardinghouse.bh_owner,
            streetAddress: boardinghouse.bh_street_address,
            zoneAddress: boardinghouse.bh_zone_address,
            completeAddress: boardinghouse.bh_complete_address,
            longitude: boardinghouse.bh_longitude,
            latitude: boardinghouse.bh_latitude,
            contacts: boardinghouse.bh_contacts,
            popularity: boardinghouse.bh_popularity,
            tagline: boardinghouse.tagline,
            houseProtocols: boardinghouse.house_protocols,
            offers: boardinghouse.offers,
            priceRange: boardinghouse.price_range,
            waterSource: boardinghouse.water_source,
            genderCategory: boardinghouse.gender_category,
            totalRooms: boardinghouse.total_rooms,
          };
        });
        res.send(boardinghouses);
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
      let boardinghouses = [];
      if (!err) {
        boardinghouses = Array.from(result, (boardinghouse) => {
          return {
            id: boardinghouse.boardinghouse_id,
            ownerId: boardinghouse.bho_id,
            name: boardinghouse.bh_name,
            owner: boardinghouse.bh_owner,
            streetAddress: boardinghouse.bh_street_address,
            zoneAddress: boardinghouse.bh_zone_address,
            completeAddress: boardinghouse.bh_complete_address,
            longitude: boardinghouse.bh_longitude,
            latitude: boardinghouse.bh_latitude,
            contacts: boardinghouse.bh_contacts,
            popularity: boardinghouse.bh_popularity,
            tagline: boardinghouse.tagline,
            houseProtocols: boardinghouse.house_protocols,
            offers: boardinghouse.offers,
            priceRange: boardinghouse.price_range,
            waterSource: boardinghouse.water_source,
            genderCategory: boardinghouse.gender_category,
            totalRooms: boardinghouse.total_rooms,
          };
        });
        res.send({ ...boardinghouses[0] });
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
  res.send({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [124.6652, 12.5111],
        },
        properties: {
          id: 4,
          title: "UEP Men's Dorm",
          description: "Seaside - Zone 1, UEP",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [124.665, 12.5109],
        },
        properties: {
          id: 6,
          title: "UEP Women's Dorm",
          description: "University Town - Zone 1, UEP",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [124.6662, 12.5107],
        },
        properties: {
          id: 7,
          title: "Bahay Kubo",
          description: "Seaside - Zone 1, UEP",
        },
      },
    ],
  });

  // db.query(
  //   `SELECT boardinghouse_id, bh_name, bh_complete_address, bh_longitude, bh_latitude FROM boarding_house`,
  //   (err, result) => {
  //     if (!err) {
  //       let featureCollections = {
  //         type: "FeatureCollection",
  //         features: [],
  //       };
  //       featureCollections.features = Array.from(result, (mark) => {
  //         return {
  //           type: "Feature",
  //           geometry: {
  //             type: "Point",
  //             coordinates: [mark.bh_longitude, mark.bh_latitude],
  //           },
  //           properties: {
  //             id: mark.boardinghouse_id,
  //             title: mark.bh_name,
  //             description: mark.bh_complete_address,
  //           },
  //         };
  //       });

  //       res.send(featureCollections);
  //     } else {
  //       console.log(err);
  //     }
  //   }
  // );
};

// GET SPECIFIC BOARDINGHOUSE LOCATION BY OWNER ID ✅ DONE!
exports.getBoardinghouseLocation = (req, res) => {
  const ownerId = req.params.ownerId;

  db.query(
    `SELECT boardinghouse_id, bh_name, bh_complete_address, bh_longitude, bh_latitude FROM boarding_house WHERE bho_id = ?`,
    [ownerId],
    (err, result) => {
      if (!err) {
        if (result.length <= 0) {
          res.send({
            message: "Empty response, or simply does not exist!",
          });
        } else {
          let featureCollections = {
            type: "FeatureCollection",
            features: [],
          };
          featureCollections.features = Array.from(result, (mark) => {
            return {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [mark.bh_longitude, mark.bh_latitude],
              },
              properties: {
                id: mark.boardinghouse_id,
                title: mark.bh_name,
                description: mark.bh_complete_address,
              },
            };
          });
          res.send(featureCollections);
        }
      } else {
        console.log(err);
      }
    }
  );
};
