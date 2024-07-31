const crypto = require("crypto");

const SESSION_KEY = crypto.randomBytes(32).toString('hex');


module.exports = { SESSION_KEY };