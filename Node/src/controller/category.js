const { default: slugify } = require('slugify');
const categoryModel = require('../models/categoryModel');
const expressAsyncHandler = require('express-async-handler');

// http://localhost:5000/api/category (post)
exports.addCategory = expressAsyncHandler(
    async (req, res) => {
        const name = req.body.name;
        const category = await categoryModel.create({ name, slug: slugify(name) });
        res.status(201).json({
            message: "Category added successfully",
            data: category
        });
    }
);

// http://localhost:5000/api/category (get)
exports.getCategoris = expressAsyncHandler(
    async (req, res) => {
        const allCategories = await categoryModel.find({});
        res.status(201).json({
            message: "Categories returned successfully",
            numOfCategories: allCategories.length,
            data: allCategories
        });
    }
);

// http://localhost:5000/api/category/{id} (get)
exports.getOneCategory = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params;
        const category = await categoryModel.findById(id);
        if (!category) {
            res.status(404).json({
                message: "Category not found"
            });
        }
        else {
            res.status(201).json({
                message: "Category returned successfully",
                data: category
            });
        }
    }
);

// http://localhost:5000/api/category/{id} (delete)
exports.deleteCategory = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        if (!category) {
            res.status(404).json({
                message: "Category not found"
            });
        }
        else {
            res.status(201).json({
                message: "Category deleted successfully",
                data: category
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