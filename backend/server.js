const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
require('./auto-shutdown'); // Auto-shutdown after 2 hours

const authRoutes = require('./routes/auth');
const umbrellaRoutes = require('./routes/umbrellas');
const walletRoutes = require('./routes/wallet');
const rentalRoutes = require('./routes/rentals');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://palisettysanjaykumar_db_user:StPcfumQIOvDAEtS@urs.h9jrkne.mongodb.net/demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/auth', authRoutes);
app.use('/api/umbrellas', umbrellaRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/rentals', rentalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});