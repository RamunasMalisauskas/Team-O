const jwt = require("jsonwebtoken");
require("dotenv").config();

// validating the user input data by length
module.exports = {
  validateUserData: (req, res, next) => {
    const register = req.body;

    if (!register.email || register.email.length < 2) {
      res.status(400).json({ msg: "username is too short" });
    }

    if (!register.password || register.password.length < 6) {
      res.status(400).json({ msg: "username is too short" });
    }

    next();
  },

  //  validating if the user is logged in correclty (with token)
  LoggedIn: (req, res, next) => {
    try {
      // getting token from request header
      const token = req.headers.authorization.split(" ")[1];
      // vertifying recievde token by back-end secret key
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      // token is used to identify the correct session user so it is passed forward as userData
      req.userData = decodedToken;
      next();
    } catch (err) {
      return res.status(400).json({ msg: err + " /session invalidated" });
    }
  },
};
