const User = require("../models/User");

async function getUserById(req, res) {
  try {
    const { id: userID } = req.user;
    const user = await User.findById(userID);
    if (!user) {
      res.status(404).json({ message: "user not found!" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({message: "Internal server error", type: error.message})
  }
}

module.exports = { getUserById };