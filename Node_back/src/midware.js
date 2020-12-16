const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  validateUserData: (req, res, next) => {
    const register = req.body;

    if (register.username === register.password) {
      res.status(400).json({ msg: "username can't be same as password" });
    }

    if (!register.username || register.username.length < 2) {
      res.status(400).json({ msg: "username is too short" });
    }

    if (!register.password || register.password.length < 6) {
      res.status(400).json({ msg: "username is too short" });
    }

    next();
  },

  LoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.userData = decodedToken;
      next();
    } catch (err) {
      return res.status(400).json({ msg: err + " /session invalidated" });
    }
  },
};
