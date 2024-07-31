const Cart = require("../models/Cart");
const Product = require("../models/productModel");

async function cartInit(req, res) {
  try {
    const { userId } = req.body;

    const cartExist = await Cart.findOne({ userId });
    if (cartExist) {
      return;
    }

    if (!req.body.items) {
      req.body.items = [];
    }

    const cart = await Cart.create(req.body);
    res.status(201).json({ status: "success", cart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getCart(req, res) {
  try {
    const { userId } = req.params;

    const userCart = await Cart.findOne({ userId })
      .populate("items.productId")
      .lean();

    if (!userCart) {
      return res.status(404).json({ error: "User doesn't exist" });
    }

    const itemsMerged = userCart.items.map((item) => {
      const productId = item.productId; // product data object
      delete item.productId; // Remove productId field
      return { ...item, ...productId }; // Merge properties of productId into the item object
    });

    // Replace the items array in the userCart object with the new array
    userCart.items = itemsMerged;
    // console.log("updated cart", userCart, "this");

    const { totalPrice, numberOfItems } = userCart.items.reduce(
      (acc, product) => {
        acc.totalPrice += product.priceAfterDiscount * product.quantity;
        acc.numberOfItems += product.quantity;
        return acc;
      },
      { totalPrice: 0, numberOfItems: 0 }
    );

    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { totalPrice, numberOfItems },
      { new: true }
    ).populate('items.productId').lean();

    const UpdatedItemsMerged = updatedCart.items.map((item) => {
      const productId = item.productId; // product data object
      delete item.productId; // Remove productId field
      return { ...item, ...productId }; // Merge properties of productId into the item object
    });

    // Replace the items array in the updatedCart object with the new array
    updatedCart.items = UpdatedItemsMerged;

    console.log("this:", updatedCart.numberOfItems, updatedCart.totalPrice);
    res.status(200).json({
      status: "retrieved successfully",
      numberOfItems: updatedCart.numberOfItems,
      totalPrice: updatedCart.totalPrice,
      cart: updatedCart,
    });
  } catch (error) {
    res.status(400).json({ error: "Error retrieving the cart." });
  }
}

async function addItem(req, res) {
  try {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;
    const validProduct = await Product.findOne({ _id: productId });
    if (validProduct == null) {
      return res.status(400).json({ error: "Invalid Product ID." });
    }

    let cart = await Cart.findOne({ userId });
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex !== -1) {
      console.log("item quantity updated");
      cart.items[existingItemIndex].quantity = Number(quantity || 1);
    } else {
      console.log("item added but i don't know why");
      cart.items.push({ productId, quantity });
    }
    console.log(cart);
    await cart.save();
    return res.json(cart);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function removeItem(req, res) {
  try {
    const userId = req.params.userId;
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId });
    const filtered = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    cart.items = filtered;
    await cart.save();

    const updatedCart = await Cart.findOne(
      { userId },
    ).populate('items.productId').lean();

    const UpdatedItemsMerged = updatedCart.items.map((item) => {
      const productId = item.productId; // product data object
      delete item.productId; // Remove productId field
      return { ...item, ...productId }; // Merge properties of productId into the item object
    });

    // Replace the items array in the updatedCart object with the new array
    updatedCart.items = UpdatedItemsMerged;
    res.json({ status: "removed successfully", cart: updatedCart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function clearCart(req, res) {
  const { userId } = req.body;

  const userCart = await Cart.findOne({ userId });

  if (!userCart) {
    return res.status(404).json({ error: "No cart for this user" });
  } else {
    userCart.items = [];
    await userCart.save();
    res.status(200).json({ status: "cleared successfully", userCart });
  }
}

module.exports = { cartInit, clearCart, addItem, removeItem, getCart };
