const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  blogId: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);


module.exports = Review;