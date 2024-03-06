const express = require("express");
const router = express.Router();
const ReviewController = require("../controllers/reviewController");

router.post("/create", ReviewController.createReview);

router.get("/blog/:blogId", ReviewController.getReviewsByBlog);

module.exports = router;
