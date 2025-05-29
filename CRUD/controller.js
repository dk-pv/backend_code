const express = require("express");
const router = express.Router();
const User = require("./schema");
//all users 
router.get("/all", async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

// user each
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "user not find" });
    }
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ message: "invalid ID format" });
  }
});

 // add user
router.post("/add", async (req, res) => {
  const { email, name } = req.body;
  try {
    const user = new User({ email, name });
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: "filed to create user" });
  }
});

// delete
router.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid ID format", error: error.message });
  }
});

// upadte
router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    const updatedUser = await user.save();

    return res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Invalid ID format", error: error.message });
  }
});

module.exports = router;
