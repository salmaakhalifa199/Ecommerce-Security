const { default: slugify } = require('slugify');
const productModel = require('../models/productModel');
const expressAsyncHandler = require('express-async-handler');

// http://localhost:5000/api/product (post)
exports.addProduct = expressAsyncHandler(
    async (req, res) => {
        if (!req.body.priceAfterDiscount) {
            req.body.priceAfterDiscount =  req.body.price;
        }
        req.body.slug = slugify(req.body.title);
        const product = await productModel.create(req.body);
        res.status(201).json({
            message: "Product added successfully",
            data: product
        });
    }
);

// http://localhost:5000/api/product (get)
exports.getProducts = expressAsyncHandler(
    async (req, res) => {
        const allProducts = await productModel.find({}).populate('category');
        res.status(201).json({
                message: "Products returned successfully",
                numOfProducts: allProducts.length,
                data: allProducts
            });
    }
);

// http://localhost:5000/api/product/{id} (get)
exports.getOneProduct = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params;
        const product = await productModel.findById(id).populate('category');
        if (!product) {
            res.status(404).json({
                message: "Product not found"
            });
        }
        else {
            res.status(201).json({
                message: "Product returned successfully",
                data: product
            });
        }
    }
);

// http://localhost:5000/api/product/{id} (delete)
exports.deleteProduct = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params;
        const product = await productModel.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({
                message: "Product not found"
            });
        }
        else {
            res.status(201).json({
                message: "Product deleted successfully",
                data: product
            });
        }
    }
);





























// categoryModel.create({ name, slug: slugify(name) })
//     .then(category => res.status(201).json({
//         message: "Category added successfully",
//         data: category
//     }))
//     .catch(err => res.status(400).json({
//         message: "Faild to add category",
//         errmsg: err.message,
//     }));

// const newCategory = new categoryModel({ name });
// newCategory
//     .save()
//     .then((doc) => {
//         res.json(doc);
//     })
//     .catch((err) => {
//         res.json(err);
//     });