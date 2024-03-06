
const authMiddleware = (req, res, next) => {
    const config = {
      active: true, // if it's false, it will ask to authenticate
    };
  
    if (config.active) {
      next();
    } else {
      console.log("Need to be renewed");
      res.status(401).send("Unauthorized");
    }
  };
  
  module.exports = authMiddleware;
  