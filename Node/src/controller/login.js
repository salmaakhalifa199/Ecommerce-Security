const crypto = require("crypto");
const User = require("../models/User");
const { SECRET_KEY } = require("../configuration/encryptionConfig");
const { generateToken, verifyToken, generateRefreshToken } = require("../utils/authUtils");

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // compare passwords
    const hash = crypto.createHash("sha256").update(password).digest("hex");

    if (!(hash === user.password)) {
      throw new Error("Incorrect Password");
    }

    const token = generateToken(user);
    // req.session.token = token;
    console.log(SECRET_KEY);
    res.status(200).json({ user, token, encryptionKey: SECRET_KEY });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function refreshToken(req, res) {
  try {
    const { oldToken } = req.body;
    const decodedToken = verifyToken(oldToken);
    const userExist = await User.findById(decodedToken.id);
    if (!userExist) {
      throw new Error("user not found");
    }
    const newToken = generateRefreshToken(oldToken);
    res.status(200).json({token: newToken});
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
}

async function reqEncryptionKey(req, res) {
  res.status(200).json({ key: SECRET_KEY });
}

module.exports = { loginUser, refreshToken, reqEncryptionKey };
