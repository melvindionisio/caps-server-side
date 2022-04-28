const express = require("express");
const Router = express.Router();

const reviewsController = require("../controller/reviews.controller");
const AddReview = reviewsController.addReview;
const GetAllReviews = reviewsController.getAllReviews;
const DeleteReview = reviewsController.deleteReview;
const DeleteAllBhReview = reviewsController.deleteAllReview;
const GetReview = reviewsController.getReview;
const ApproveReview = reviewsController.approveReview;
const GetAllPendingReviews = reviewsController.getAllPendingReviews;
const GetBhPendingReviews = reviewsController.getBhPendingReviews;

Router.post("/add/:bhId", AddReview);
// GET
Router.get("/bh/:bhId", GetAllReviews);
Router.get("/bh/pending/:bhId", GetBhPendingReviews);
Router.get("/pending-reviews", GetAllPendingReviews);
Router.get("/:reviewId", GetReview);
Router.put("/:reviewId", ApproveReview);
Router.delete("/:reviewId", DeleteReview);
Router.delete("/delete/boardinghouse/:bhId", DeleteAllBhReview);

module.exports = Router;
