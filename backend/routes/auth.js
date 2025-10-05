const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ email, phone, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret');
    res.status(201).json({ token, user: { id: user._id, email: user.email, walletBalance: user.walletBalance } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email);
    
    const user = await User.findOne({ email }).populate('rentalHistory');
    console.log('User found:', !!user);
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    
    const isValidPassword = await user.comparePassword(password);
    console.log('Password valid:', isValidPassword);
    
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret');
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        email: user.email, 
        walletBalance: user.walletBalance,
        rentalHistory: user.rentalHistory,
        depositMade: user.depositMade
      } 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('rentalHistory');
    res.json({ 
      user: { 
        id: user._id, 
        email: user.email, 
        walletBalance: user.walletBalance,
        rentalHistory: user.rentalHistory,
        depositMade: user.depositMade
      } 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;