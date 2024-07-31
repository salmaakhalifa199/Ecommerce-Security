const CryptoJS = require("crypto-js");
const datePassed = require('../utils/checkDate');
const valid = require('card-validator');
const { SECRET_KEY } = require("../configuration/encryptionConfig");

function validateCard(req, res) {
  try {
    const { ciphertext } = req.body;
    // console.log("key: ", SECRET_KEY);
    // Decrypt using 3DES
    const bytes = CryptoJS.TripleDES.decrypt(ciphertext, SECRET_KEY);
    if (!bytes) {
      return res.status(400).json({ error: "Failed to decrypt data" });
    }

    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // Add your validation logic here
    const numberValidation = valid.number(decryptedData.number);
    if (!numberValidation.isValid) {
      return res.status(400).json({ error: "Invalid card number" });
    }

    const inValidDate = datePassed(decryptedData.expiry);
    if (inValidDate) {
      return res.status(400).json({ error: "This card has expired."});
    }
    res.status(200).json(decryptedData);
  } catch (error) {
    console.error("Decryption error:", error.message);
    res.status(500).json({ error: "Failed to decrypt data" });
  }
}



module.exports = { validateCard };
