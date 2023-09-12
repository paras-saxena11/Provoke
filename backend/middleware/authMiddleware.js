const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  const fetchedToken = req.header("Authorization");
  // console.log(fetchedToken);
  const token = fetchedToken.match(/"([^"]+)"/)[1];

  if (token) {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findOne({ _id: userId }).select("_id");
      req.token = token;
      // console.log(token);
      next();
    } catch (error) {
      res.status(401);
    }
  } else {
    res.status(404).json({ error: "Not Authorised!" });
  }
};

module.exports = authMiddleware;
