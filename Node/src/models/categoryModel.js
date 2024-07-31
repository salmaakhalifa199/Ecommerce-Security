const mongoose = require("mongoose");
// const databaseConnection = require("../configuration/dbConfig");

const categoryShcema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category is required'],
        unique: [true, 'Category is unique'],
        minLength: [3, "To short category name"],
        maxLength: [100, "To long category name"]
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    image: String
},
    { timestamps: true });

const categoryModel = mongoose.model('Category', categoryShcema);

module.exports = categoryModel;