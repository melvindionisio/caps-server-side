const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB,
   //port: process.env.DB_PORT,
   multipleStatements: true,
});

db.connect((err) => {
   if (!err) {
      console.log("📃 Database Connected");
   } else {
      console.log("❌ Connection Failed:" + err);
   }
});

module.exports = db;
