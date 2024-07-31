const User = require('../models/User');
const crypto = require("crypto");

async function signupUser(req, res) {
    try {
        const { firstName, lastName, email, password } = req.body;
        hash = crypto.createHash("sha256").update(password).digest("hex");
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hash,
            role: "customer"
        });
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User Created Successfully", user: savedUser })
    }
    catch (err) {
        res.status(400).json({
            message: "Account already exists"
        })
    }
}

module.exports = { signupUser };