const express = require("express");
const Router = express.Router();

const reviewsController = require("../controller/reviews.controller");
const AddReview = reviewsController.addReview;
const GetAllReviews = reviewsController.getAllReviews;
const DeleteReview = reviewsController.deleteReview;
const GetReview = reviewsController.getReview;

Router.post("/add/:bhId", AddReview);
// GET
Router.get("/bh/:bhId", GetAllReviews);
Router.get("/:reviewId", GetReview);
Router.delete("/:reviewId", DeleteReview);

module.exports = Router;
