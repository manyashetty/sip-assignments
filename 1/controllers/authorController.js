const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Author = require("../modal/Auther");

const saltRounds = 10;
const jwtSecret = 'bfshbdbfdhbfdf'; 

const registerAuthor = async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;
    const existingEmail = await Author.findOne({ Email });

    if (existingEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const newAuthor = new Author({ Name, Email, Password: hashedPassword });
    const savedAuthor = await newAuthor.save();
    res.json(savedAuthor);
  } catch (error) {
    console.log("Error registering author", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginAuthor = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const author = await Author.findOne({ Email });

    if (!author) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(Password, author.Password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ Name: author.Name, authorId: author._id }, jwtSecret);

    res.json({ message: 'Successfully logged in', author, token });
  } catch (error) {
    console.log("Error authenticating author", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { registerAuthor, loginAuthor };
