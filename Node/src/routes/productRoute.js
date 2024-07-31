const express = require("express");
const { getProducts, getOneProduct, deleteProduct, addProduct } = require('../controller/product');


const router = express.Router();
// router.post("/addCategory", addCategory);
router.route('/').get(getProducts).post(addProduct);
router.route('/:id').get(getOneProduct).delete(deleteProduct);

module.exports = router;