const mongoose = require('mongoose');

const connectDB = async () => {
  try {    
    const url = "mongodb+srv://yash:yash1234@cluster0.zvavu.mongodb.net/ecommerce-app"
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;