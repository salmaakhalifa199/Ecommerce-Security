const express = require("express");
const { validateCard } = require("../controller/Payment");


const route = express.Router();

route.post('/card', validateCard);

module.exports = route;