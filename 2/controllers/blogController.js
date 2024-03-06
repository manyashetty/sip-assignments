const Blog = require("../modals/blog");
const cache = require("../cache");
const User = require("../modals/user");
const Review = require('../modals/review'); 

const BlogController = {
  createBlog: async (req, res) => {
    try {
      const { title, content, category, publish_date } = req.body;

      const newBlog = new Blog({
        title,
        content,
        category,
        publish_date: new Date(publish_date),
      });

      const savedBlog = await newBlog.save();

      res.status(201).json(savedBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllBlogs: async (req, res) => {
    try {
      const cacheKey = 'allBlogs';

      // Check if data is in the cache
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        console.log('Retrieving data from cache');
        return res.status(200).json(cachedData);
      }

      // If not in cache, fetch data from the database
      const blogs = await Blog.find();

      // Store data in cache for future requests
      cache.set(cacheKey, blogs, 60); // Cache for 60 seconds

      res.status(200).json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


  getBlogById: async (req, res) => {
    try {
      const blogId = req.params.blogId;
      const blog = await Blog.findById(blogId);

      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      res.status(200).json(blog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateBlog: async (req, res) => {
    try {
      const blogId = req.params.blogId;
      const { title, content, category } = req.body;

      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        { title, content, category },
        { new: true }
      );

      if (!updatedBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      // Update the cached data
      const cacheKey = "allBlogs";
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        const updatedBlogs = cachedData.map((blog) =>
          blog._id.toString() === blogId ? updatedBlog : blog
        );
        cache.set(cacheKey, updatedBlogs, 60);
      }

      res.status(200).json(updatedBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const blogId = req.params.blogId;

      const deletedBlog = await Blog.findByIdAndDelete(blogId);

      if (!deletedBlog) {
        return res.status(404).json({ error: "Blog not found" });
      }

      // Remove the deleted blog from the cached data
      const cacheKey = "allBlogs";
      const cachedData = cache.get(cacheKey);
      if (cachedData) {
        const updatedBlogs = cachedData.filter(
          (blog) => blog._id.toString() !== blogId
        );
        cache.set(cacheKey, updatedBlogs, 60);
      }

      res.status(200).json(deletedBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  searchBlogs: async (req, res) => {
    try {
      const query = req.params.query.toLowerCase();

      const searchResults = await Blog.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { content: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
        ],
      });

      res.json({ searchResults });
    } catch (error) {
      console.error("Error searching blogs:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  addUserToBlog: async (req, res) => {
    try {
      const { blogId, userId } = req.params;

      const blog = await Blog.findByIdAndUpdate(
        blogId,
        { $addToSet: { users: userId } },
        { new: true }
      );
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { blogs: blogId } },
        { new: true }
      );

      res.status(200).json({ blog, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getBlogStatistics: async (req, res) => {
    try {
      const statistics = await Review.aggregate([
        {
          $group: {
            _id: "$blogId",
            numberOfReviews: { $sum: 1 }, 
            overallRating: { $avg: "$rating" } 
          }
        },
        {
          $lookup: {
            from: "blogs", 
            localField: "_id",
            foreignField: "_id",
            as: "blog"
          }
        },
        {
          $unwind: "$blog"
        },
        {
          $project: {
            title: "$blog.title",
            category: "$blog.category",
            numberOfReviews: 1,
            overallRating: 1
          }
        }
      ]);
  
      res.json(statistics);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
,
  


getBlogsInDateRange: async (req, res) => {
  try {
    const { start, end } = req.params;
    const startDate = new Date(start);
    const endDate = new Date(end);

    const blogs = await Blog.find({
      publish_date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},
  getBlogsByCategory: async (req, res) => {
    try {
      const { category } = req.params;
      const blogs = await Blog.find({ category: category });

      res.json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  addUserToBlog: async (req, res) => {
    try {
      const { blogId, userId } = req.params;

      const blog = await Blog.findByIdAndUpdate(
        blogId,
        { $addToSet: { users: userId } },
        { new: true }
      );
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { blogs: blogId } },
        { new: true }
      );

      res.status(200).json({ blog, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getBlogsForUser: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId).populate("blogs");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user.blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = BlogController;
