const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orders: [{
    numberOfItems: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    creationDate: {
      type: Date,
      default: Date.now
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "cash",
      enum: ["cash", "card"]
    },
  }]
});

module.exports = mongoose.model("Order", orderSchema); 