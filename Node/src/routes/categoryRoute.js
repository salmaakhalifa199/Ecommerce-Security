const express = require("express");
const { addCategory, getCategoris, getOneCategory, deleteCategory } = require('../controller/category');


const router = express.Router();
// router.post("/addCategory", addCategory);
router.route('/').post(addCategory).get(getCategoris);
router.route('/:id').get(getOneCategory).delete(deleteCategory);

module.exports = router;