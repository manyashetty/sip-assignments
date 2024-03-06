const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  Name: String,
  Email: String,
  Password: String,
});

const Author = mongoose.model('Authentication', AuthorSchema);

module.exports = Author;
