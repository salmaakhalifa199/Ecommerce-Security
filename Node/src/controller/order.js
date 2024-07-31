const Order = require("../models/Order");
const Product = require('../models/productModel');
const Cart = require("../models/Cart");

async function initOrders(req, res) {
  try {
    const { userId } = req.body;
  
    const userOrder = await Order.findOne({userId});
    if (userOrder) {
      return;
    }

      if (!req.body.orders) {
      req.body.orders = [];
    }

    const orders = await Order.create(req.body);
    res.status(201).json({ status: "success", orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


async function getOrders(req, res) {
  const { userId } = req.query;
  
  const userOrder = await Order.findOne({userId});
  if(!userOrder) {
    return res.status(400).json({error: "User Not Found"});
  }

  return res.status(200).json({orders: userOrder.orders});
}

async function addOrder(req, res) {
  const { userId } = req.params;
  console.log("user id at add order: ", userId)
  const userCart = await Cart.findOne({ userId });

  if (!userCart) {
    return res.status(404).json({ error: "User doesn't exist" });
  }

  let totalPrice = 0;
  let numberOfItems = 0;
  for (const item of userCart.items) {
    const product = await Product.findOne({ _id: item.productId });
    if (product) {
      totalPrice += product.priceAfterDiscount * item.quantity;
      numberOfItems += item.quantity;
    }
  }
  
  const userOrder = await Order.findOne({userId})
  userOrder.orders.push({
    numberOfItems,
    totalPrice,
    paymentMethod: req.body.paymentMethod,
  })

  await userOrder.save();
  res.status(200).json({status: 'success', order: userOrder.orders});
}

module.exports = { initOrders, getOrders, addOrder };