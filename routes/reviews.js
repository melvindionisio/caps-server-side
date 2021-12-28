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
Router.get("/boardinghouse-id/:bhId", GetAllReviews);
Router.get("/:reviewId", GetReview);
Router.put("/:reviewId", UpdateReview);
Router.delete("/:reviewId", DeleteReview);

module.exports = Router;
