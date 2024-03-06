const jwt = require('jsonwebtoken');
const User = require('../modals/user');
require('dotenv').config();

const authenticateUser = async (req, res, next) => {
   try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      console.log('Received token:', token);
      console.log('Decoded token:', decoded);

      const user = await User.findOne({ _id: decoded.userId });

      console.log('User found:', user);

      if (!user) {
         throw new Error('User not found');
      }

      req.token = token;
      req.user = user;
      next();
   } catch (error) {
      console.error('Authentication error:', error);
      res.status(401).send({ error: 'Please authenticate.' });
   }
};

module.exports = { authenticateUser };