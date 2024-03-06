const mongoose = require("mongoose");

const designSchema = new mongoose.Schema({
  blogTitle: String,
  blogContent: String,
  authorId: String,
});

const Design = mongoose.model('Design', designSchema);

module.exports = Design;
