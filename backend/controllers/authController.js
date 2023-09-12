const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create the new user
    const user = new User({
      name,
      email,
      password,
    });

    // Generate a JWT
    const userId = user._id;
    const token = generateToken(res, userId);
    // Save the user to the database
    await user.save();

    // Return the email and access token
    res.status(201).json({ _id: user._id, email, name, accessToken: token });
  } catch (error) {
    console.log("Error during signup:", error);
    res.status(500).json({ message: "Signup failed", error: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT
    const userId = user._id;
    const token = generateToken(res, userId);
    const name = user.name;
    // console.log(token);

    // Return the email and access token
    await user.save();
    res.status(200).json({ _id: user._id, email, name, accessToken: token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

module.exports = {
  signup,
  login,
};
