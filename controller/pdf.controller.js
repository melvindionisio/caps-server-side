const db = require("../connection");
const pdf = require("html-pdf");
const pdfTemplate = require("../documents");
const fs = require("fs");

exports.generatePDF = (req, res) => {
   pdf.create(pdfTemplate(req.body), {}).toFile(
      "./controller/result.pdf",
      (err) => {
         if (err) {
            res.send(Promise.reject());
         }
         res.send(Promise.resolve());
      }
   );
};

exports.downloadPDF = (req, res) => {
   res.sendFile(`${__dirname}\\result.pdf`);

   //delete after downloading
   //setTimeout(function () {
   //if (fs.existsSync(`${__dirname}\\result.pdf`)) {
   //fs.unlinkSync(`${__dirname}\\result.pdf`);
   //console.log("generated file deleted.");
   //}
   //}, 120000);
};
