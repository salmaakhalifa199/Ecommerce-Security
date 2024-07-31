const express = require('express');
const { clearCart, addItem, removeItem, getCart, cartInit } = require('../controller/cart');

const route = express.Router();





route.post("/init", cartInit);
route.post("/addItem/:userId", addItem);
route.delete("/clearCart", clearCart);
route.delete("/removeItem/:userId", removeItem);
route.get("/getCart/:userId", getCart);

module.exports = route;