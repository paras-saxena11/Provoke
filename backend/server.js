require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/userRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const User = require("./models/userModel");
const stripe = require("stripe")(
  "sk_test_51MM7AsSGjzXbWRQSnOHqDYfXJdZcMVeb0ZmkPkBHOnc2zkTBIyQfN5WM7N7ODBeyZisognqlloIWZlhuIfVox7mA009jg6XLAu"
);

const app = express();

// Connect to MongoDB
connectDB();
// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api/auth", authRoutes);

app.post("/create-payment", async (req, res) => {
  const { amount, _id } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "INR",
      payment_method_types: ["card"],
    });

    // console.log(paymentIntent)
    res.status(200).json({ client_secret: paymentIntent.client_secret });
  } catch (e) {
    // console.log(e.message);
    res.status(400).json(e.message);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
