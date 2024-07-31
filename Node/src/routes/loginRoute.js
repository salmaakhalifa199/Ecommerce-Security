const express = require("express");
const { loginUser, reqEncryptionKey, refreshToken } = require("../controller/login");

const router = express.Router();
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);
router.post("/encKey", reqEncryptionKey);

module.exports = router;