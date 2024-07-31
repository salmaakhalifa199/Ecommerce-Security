const express = require('express');
const { initOrders, getOrders, addOrder } = require('../controller/order');

const route = express.Router();

route.post('/add/:userId', addOrder);
route.get('/get', getOrders);
route.post('/init', initOrders);

module.exports = route;