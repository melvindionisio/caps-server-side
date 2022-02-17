const db = require("../connection");
const fs = require("fs");
const excelJS = require("exceljs");

exports.generateExcel = async (req, res) => {
   const Boardinghouses = req.body;

   const workbook = new excelJS.Workbook(); // Create a new workbook
   const worksheet = workbook.addWorksheet("Registered Boardinghouse"); // New Worksheet
   const path = "./documents"; // Path to download excel

   // Column for data in excel. key must match data key
   worksheet.columns = [
      { header: "No.", key: "no", width: 10 },
      { header: "Boardinghouse Name", key: "name", width: 25 },
      { header: "Owner Name", key: "ownerName", width: 20 },
      { header: "Contacts", key: "contacts", width: 20 },
      { header: "Street", key: "street", width: 20 },
      { header: "Zone", key: "zone", width: 20 },
   ];
   //worksheet.mergeCells("E1:F1");

   // Looping through boardinghouse data
   let counter = 1;
   Boardinghouses.forEach((boardinghouse) => {
      boardinghouse.no = counter;
      worksheet.addRow(boardinghouse); // Add data in worksheet
      counter++;
   });

   // Making first line in excel bold
   worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
   });

   //save file
   try {
      const data = await workbook.xlsx
         .writeFile(`./controller/exports/boardinghouses.xlsx`)
         .then(() => {
            res.send({
               status: "success",
               message: "file successfully generated",
               path: `${path}\\boardinghouses.xlsx`,
            });
         });
   } catch (err) {
      res.send({
         status: "error",
         message: "Something went wrong",
      });
   }
};

//send file
exports.downloadExcel = (req, res) => {
   res.sendFile(`${__dirname}/exports/boardinghouses.xlsx`);
};
