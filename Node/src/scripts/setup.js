const User = require('../models/User');
const crypto = require('crypto');
const { generateToken } = require('../utils/authUtils');

async function createAdmin(req, res) {
    try {
        const adminExist = await User.findOne({ email: 'admin@test.com' });
        if (adminExist) {
            console.log('Admin account already exists');
        } else {
            const hashedAdminPassword = crypto.createHash("sha256").update("Admin123").digest("hex");
            const newAdmin = new User({
                firstName: "Admin",
                lastName: "123",
                email: "admin@test.com",
                password: hashedAdminPassword,
                role: "admin"
            });
            await newAdmin.save();
            const admin = await User.findOne({email: "admin@test.com"});
            generateToken(admin);
            console.log('Admin account created successfully');
        }
    }
    catch (err) {
        console.log(err.message);
    }
}

module.exports = { createAdmin };