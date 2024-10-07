const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const teamRoutes = require('./routes/teamRoutes');
const authRoutes = require('./routes/authRoutes'); // Add this line for auth routes

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// API routes
app.use('/api/team', teamRoutes);
app.use('/api/auth', authRoutes); // Add this line to use the auth routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
