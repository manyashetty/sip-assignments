// controllers/SearchController.js
const Blog = require('../modals/blog');

const SearchController = {
  suggestTitles: async (req, res) => {
    try {
      const letter = req.params.letter.toLowerCase();
      const suggestions = await Blog.find({
        title: { $regex: `^${letter}`, $options: 'i' }, // Case-insensitive title search starting with the provided letter
      }).select('title');

      res.json({ suggestions });
    } catch (error) {
      console.error('Error suggesting titles:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = SearchController;
