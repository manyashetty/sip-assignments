const Review = require('../modals/review');

const ReviewController = {
  createReview: async (req, res) => {
    try {
      const { blogId, rating } = req.body;
      console.log("Hello created");
      const review = new Review({
        blogId,
        rating,
      });

      // Save the review to the database
      const savedReview = await review.save();

      res.status(201).json(savedReview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getReviewsByBlog: async (req, res) => {
    try {
      const { blogId } = req.params;
      const reviews = await Review.find({ blogId });

      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = ReviewController;