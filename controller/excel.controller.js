const db = require("../connection");
const fs = require("fs");
const excelJS = require("exceljs");

const User = [
   {
      fname: "Amir",
      lname: "Mustafa",
      email: "amir@gmail.com",
      gender: "Male",
   },
   {
      fname: "Ashwani",
      lname: "Kumar",
      email: "ashwani@gmail.com",
      gender: "Male",
   },
   {
      fname: "Nupur",
      lname: "Shah",
      email: "nupur@gmail.com",
      gender: "Female",
   },
   {
      fname: "Himanshu",
      lname: "Mewari",
      email: "himanshu@gmail.com",
      gender: "Male",
   },
   {
      fname: "Vankayala",
      lname: "Sirisha",
      email: "sirisha@gmail.com",
      gender: "Female",
   },
];

exports.generateExcel = async (req, res) => {
   const body = req.body;

   const workbook = new excelJS.Workbook(); // Create a new workbook
   const worksheet = workbook.addWorksheet("My Users"); // New Worksheet
   const path = "./documents"; // Path to download excel
   // Column for data in excel. key must match data key
   worksheet.columns = [
      { header: "S no.", key: "s_no", width: 10 },
      { header: "First Name", key: "fname", width: 10 },
      { header: "Last Name", key: "lname", width: 10 },
      { header: "Email Id", key: "email", width: 10 },
      { header: "Gender", key: "gender", width: 10 },
   ];
   // Looping through User data
   let counter = 1;
   User.forEach((user) => {
      user.s_no = counter;
      worksheet.addRow(user); // Add data in worksheet
      counter++;
   });
   // Making first line in excel bold
   worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
   });

   //save file
   try {
      const data = await workbook.xlsx
         .writeFile(`./controller/exports/users.xlsx`)
         .then(() => {
            res.send({
               status: "success",
               message: "file successfully generated",
               path: `${path}/users.xlsx`,
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
   res.sendFile(`${__dirname}\\exports\\users.xlsx`);
};
