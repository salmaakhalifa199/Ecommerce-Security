const mongoose = require("mongoose");
// const databaseConnection = require("../configuration/dbConfig");

const userShema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email:
    {
        type: String
        , unique: true
    },
    password: String,
    role: {
        type: String,
        enum: ["admin", "customer"],
        default: "customer"
    }

});
module.exports = mongoose.model("User", userShema); 