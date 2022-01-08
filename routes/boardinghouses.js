const express = require('express')
const Router = express.Router()

const boardinghousesController = require('../controller/boardinghouses.controller')
const RegisterBoardinghouse = boardinghousesController.registerBoardinghouse
const UpdateBoardinghouse = boardinghousesController.updateBoardinghouse
const GetAllBoardinghouse = boardinghousesController.getAllBoardinghouse
const GetAllBoardinghouseExport = boardinghousesController.getAllBoardinghouseExport
const GetTotalBoardinghouseByZone = boardinghousesController.getTotalBoardinghouseByZone
const GetTotalBoardinghouse = boardinghousesController.getTotalBoardinghouse
const GetBoardinghouseById = boardinghousesController.getBoardinghouseById
const GetBoardinghouseByOwnerId = boardinghousesController.getBoardinghouseByOwnerId
const GetAllBoardinghouseByZone = boardinghousesController.getAllBoardinghousesByZone
const GetBoardinghouseLocation = boardinghousesController.getBoardinghouseLocation
const GetAllBoardinghouseLocations = boardinghousesController.getAllBoardinghouseLocations
const UpdateBoardinghouseLocation = boardinghousesController.updateBoardinghouseCoordinates

const DeleteBoardinghouse = boardinghousesController.deleteBoardinghouse

// GET ALL THE BOARDING HOUSE INCLUDING THE OWNER
Router.get('/', GetAllBoardinghouse)
Router.get('/export', GetAllBoardinghouseExport)
Router.get('/by-zone/:zoneAddress', GetAllBoardinghouseByZone)

Router.get('/total', GetTotalBoardinghouse)
Router.get('/total/:zoneAddress', GetTotalBoardinghouseByZone)

Router.get('/:bhId', GetBoardinghouseById)
Router.get('/by-owner/:ownerId', GetBoardinghouseByOwnerId)

Router.get('/owner-map/map-marks/:ownerId', GetBoardinghouseLocation) // GETTING  COORDINATES FOR MAP MARKING - OWNER
Router.get('/seeker-map/map-marks', GetAllBoardinghouseLocations) // GETTING ALL COORDINATES FOR MAP MARKING - FOR SEEKER MAP

Router.post('/register/:ownerId', RegisterBoardinghouse) // ALONG WITH OWNER ACCOUNT CREATION ✅ DONE!
Router.put('/update/:boardinghouseId', UpdateBoardinghouse)

Router.put('/owner-map/update-coordinates/:ownerId', UpdateBoardinghouseLocation) // Updating existing boardinghouse coordinates

Router.delete('/delete/:ownerId', DeleteBoardinghouse)

module.exports = Router
