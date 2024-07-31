const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../configuration/jwstConfig");

function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role
  }

  return jwt.sign(payload, SECRET_KEY, {expiresIn: "1d"});
}

function generateRefreshToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role
  }

  return jwt.sign(payload, SECRET_KEY, {expiresIn: "20d"});
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = {generateToken, generateRefreshToken, verifyToken}