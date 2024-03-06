// index.js
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const blogRoutes = require('./routes/blogRoute');
const reviewRoutes = require('./routes/reviewRoute')
const searchRoutes = require('./routes/SearchRoute');
const  connectToDatabase  = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/review',reviewRoutes);

// Connect to MongoDB
connectToDatabase();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
