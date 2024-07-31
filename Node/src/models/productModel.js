const mongoose = require("mongoose");
// const mongoose = require("../configuration/dbConfig");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "To short product title"],
        maxLength: [100, "To long product title"]
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        minLength: [30, "To short product title"],
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required"]
    },
    sold: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        trim: true,
        max: [1000, "To long product price"]
    },
    priceAfterDiscount: {
        type: Number,
        trim: true,
        max: [1000, "To long product price"],
    },
    color: [String],
    imageCover: {
        type: String,
        required: [true, "Cover image is required"]
    },
    images: [String],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "Category must be from exisiting categories"],
    },
    brand: {
        type: String,
        // required: [true, "Product brand is required"],
        minLength: [3, "To short product title"],
        maxLength: [100, "To long product title"]
    },
    ratingsAverage: {
        type: Number,
        required: [true, "Product rating is required"],
        min: [1, "Rating must be between 1 and 5"],
        max: [5, "Rating must be between 1 and 5"]
    }

}, { timestamps: true });

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;