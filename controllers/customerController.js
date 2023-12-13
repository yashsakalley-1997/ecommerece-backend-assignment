const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Find user's cart or create a new one
    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      userCart = new Cart({ userId, items: [] });
    }

    const existingItem = userCart.items.find(item => item.productId.equals(productId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      userCart.items.push({ productId, quantity });
    }

    await userCart.save();
    res.json(userCart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get user cart
exports.getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const userCart = await Cart.findOne({ userId }).populate('items.productId');

    res.json(userCart || { items: [] });
  } catch (error) {
    console.error('Error fetching user cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.placeOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find user's cart
    const userCart = await Cart.findOne({ userId }).populate('items.productId');

    if (!userCart || userCart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total price and create order items
    const orderItems = userCart.items.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price * item.quantity,
    }));

    // Create a new order
    const newOrder = new Order({
      userId,
      items: orderItems,
      // Add more order details as needed
    });

    // Save the order and clear the user's cart
    await newOrder.save();
    await Cart.deleteOne({ userId });

    res.json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};