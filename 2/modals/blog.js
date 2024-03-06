// models/blog.js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  publish_date:{type : Date,required : true},
  // Add an array of user references to represent the many-to-many relationship
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
