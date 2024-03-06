// routes/searchRoutes.js
const express = require("express");
const router = express.Router();
const SearchController = require("../controllers/SearchController");

router.get("/suggest/:letter", SearchController.suggestTitles);

module.exports = router;
