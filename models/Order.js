const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      name:{type:String,required:true},
      imageLink:{type:String,required:true}
    },
  ],
  status: { type: String, default: 'Pending' },
  // Add more order details as needed
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
