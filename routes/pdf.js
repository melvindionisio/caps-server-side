const express = require("express");
const db = require("../connection");

const Router = express.Router();

const pdfController = require("../controller/pdf.controller");

Router.post("/generate", pdfController.generatePDF);
Router.get("/download", pdfController.downloadPDF);

module.exports = Router;
