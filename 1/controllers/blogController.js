const Design = require("../modal/blogUser")

const getBlogs =  async (req, res) => {
  try {
    const design = await Design.find();
    res.json(design);
  } catch (error) {
    console.log("Error fetching blogs", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Design.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addBlogs= async (req, res) => {
  try {
    const { id, blogTitle, blogContent, authorId } = req.body;
    let saved;
    if (req.body) {
      const newNote = new Design({ id, blogContent, blogTitle, authorId });
      saved = await newNote.save();
    }
    res.send(saved);
  } catch (error) {
    console.log("Error fetching notes", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateBlogs=async (req, res) => {
  try {
    let updated;
    if (req.body) {
      updated = await Design.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
    }
    res.json(updated);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const deleted = await Design.findOneAndDelete({ _id: blogId });

    if (!deleted) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {getBlogs, getBlogById,addBlogs,updateBlogs,deleteBlog};
