const express = require("express");
const router = express.Router()
const bodyParser = require('body-parser');
const AuthorController = require('../controller/authorController');
const BlogController = require("../controller/blogController")

router.post("/blog/add",BlogController.addBlogs);
router.get("/blog/dis",BlogController.getBlogs);
router.get('/blog/dis/:id', BlogController.getBlogById);
router.put("/blog/update/:id",BlogController.updateBlogs);
router.delete("/blog/del/:id",BlogController.deleteBlog);


router.post('/register', bodyParser.json(), AuthorController.registerAuthor);
router.post('/login', bodyParser.json(), AuthorController.loginAuthor);

module.exports = router;
