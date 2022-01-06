const express = require("express");
const db = require("../connection");
const Router = express.Router();

const reviewsController = require("../controller/reviews.controller");

const AddReview = reviewsController.addReview;
const GetReview = reviewsController.getReview;
const GetAllReviews = reviewsController.getAllReviews;
const UpdateReview = reviewsController.updateReview;
const DeleteReview = reviewsController.deleteReview;

// GET
Router.post("/:bhId", AddReview);
Router.get("/boardinghouse/:bhId", GetAllReviews);
Router.get("/:reviewId", GetReview);
Router.delete("/:reviewId", DeleteReview);

module.exports = Router;
