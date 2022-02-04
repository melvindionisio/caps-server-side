const express = require("express");
const db = require("../connection");

const Router = express.Router();

const excelController = require("../controller/excel.controller");

Router.post("/generate", excelController.generateExcel);
Router.get("/download", excelController.downloadExcel);

module.exports = Router;
