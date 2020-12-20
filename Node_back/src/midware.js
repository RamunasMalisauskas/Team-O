const jwt = require("jsonwebtoken");
require("dotenv").config();

// validating the user input data by length
module.exports = {
  validateUserData: (req, res, next) => {
    const user = req.body;

    if (!user.email || user.email.length < 4) {
      res.status(400).json({ msg: "email is too short" });
    }

    if (!user.password || user.password.length < 6) {
      res.status(400).json({ msg: "username is too short" });
    }

    // validating if the user is admin or not
    const admin = user.email === process.env.ADMIN_EMAIL;
    // and sending bolean data forward
    req.admin = admin;

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
