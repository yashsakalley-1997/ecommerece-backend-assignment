const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const cors = require("cors");
require('dotenv').config();

const app = express();
const PORT = 4000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const adminRoutes = require("./routes/adminRoutes")

// cors handling
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/admin',adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});