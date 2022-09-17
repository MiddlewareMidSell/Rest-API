const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const   orderSchema = new Schema(
  {
    id: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true,
        ref: "User",
    },
    products: [
        {
            productId: {
                type: Number,
                required: true,
                trim: true,
            },
            quantity: {
                type: Number,
                required: true,
                trim: true,
            },
        },
    ],
    total: {
        type: Number,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        trim: true,
    },
    deliveryType: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: false,
        trim: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;