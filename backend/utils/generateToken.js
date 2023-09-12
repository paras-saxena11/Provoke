const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  // res.cookie("jwtToken", token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "none",
  //   // domain: "https://qodeit-internbuddy.netlify.app/",
  //   // maxAge: 3 * 24 * 60 * 60 * 1000,
  // });
  return token;
};
module.exports = generateToken;
