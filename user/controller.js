const express = require("express");
const User = require("./schema");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    return res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    return res.status(400).json({ message: "user is already registred" , error: error.message});
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    if (password === user.password) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
       return res.status(200).json({
        message: "login successfully",
        user: {
          name: user.name,
          id: user._id,
          email: user.email,
        },
        token,
       })
    } else {
      return res.status(400).json({ message: "invalid password" });
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server problem"  , error: error.message});
  }
});

module.exports = router
