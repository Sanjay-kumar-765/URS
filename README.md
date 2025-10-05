# URS - Umbrella Rental System

A comprehensive umbrella rental platform with real-time GPS tracking, wallet management, and seamless payment integration.

## Features

### 🔐 User Authentication
- Email/Phone registration and login
- Google OAuth integration ready
- JWT-based authentication

### 💰 Wallet System
- ₹300 minimum deposit requirement
- ₹100 instant cashback on first deposit
- Real-time wallet balance tracking
- Complete transaction history

### ☂️ Umbrella Management
- Unique umbrella IDs (UMB001, UMB002, etc.)
- Color-based filtering (red, blue, yellow, black, green)
- Real-time availability status
- GPS location tracking

### 💳 Payment Integration
- Razorpay payment gateway
- Cards, UPI, and QR code support
- Automatic umbrella unlocking after payment
- Invoice generation with rental details

### 📍 GPS Tracking
- Real-time umbrella location tracking
- Google Maps integration
- Live rental duration timer

### 💵 Pricing System
- ₹7 per hour (up to 7 hours)
- ₹70 per day (after 7 hours)
- Real-time cost calculation

## Tech Stack

### Backend
- **Node.js** + **Express.js**
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Razorpay** for payments
- **bcryptjs** for password hashing

### Frontend
- **React 18** with hooks
- **React Router** for navigation
- **Axios** for API calls
- **Google Maps API** for location services
- Modern CSS with animations

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Razorpay account
- Google Maps API key

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/urs
JWT_SECRET=your_jwt_secret_key_here
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Wallet
- `POST /api/wallet/deposit` - Create deposit order
- `POST /api/wallet/verify-deposit` - Verify payment
- `GET /api/wallet/transactions` - Get transaction history

### Umbrellas
- `GET /api/umbrellas` - Get all umbrellas
- `GET /api/umbrellas/:id` - Get umbrella by ID
- `POST /api/umbrellas` - Add new umbrella (Admin)
- `PATCH /api/umbrellas/:id/location` - Update GPS location

### Rentals
- `POST /api/rentals/start` - Start rental
- `POST /api/rentals/:id/pay` - Process payment
- `POST /api/rentals/:id/end` - End rental
- `GET /api/rentals/active` - Get active rental
- `GET /api/rentals/history` - Get rental history

## Database Schema

### User
- email, phone, googleId
- password (hashed)
- walletBalance, depositMade, cashbackReceived
- rentalHistory (references)

### Umbrella
- umbrellaId (unique)
- color, isAvailable, isActive
- location (latitude, longitude, address)
- currentRental (reference)

### Rental
- user, umbrella (references)
- startTime, endTime, duration
- totalAmount, paymentStatus, paymentId
- isActive, unlocked

### Transaction
- user (reference)
- type (deposit, cashback, rental, refund)
- amount, description, paymentId, status

## Usage Flow

1. **Registration**: User signs up with email/phone
2. **Deposit**: User deposits ₹300, gets ₹100 cashback
3. **Selection**: User browses and filters available umbrellas
4. **Rental**: User starts rental, makes payment
5. **Unlock**: Umbrella unlocks automatically after payment
6. **Tracking**: Real-time GPS tracking and cost calculation
7. **Return**: User ends rental, final amount deducted from wallet

## Features to Implement

- [ ] Google OAuth integration
- [ ] Push notifications
- [ ] Admin dashboard
- [ ] QR code scanning
- [ ] Offline mode support
- [ ] Advanced analytics
- [ ] Multi-language support

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

This project is licensed under the MIT License.