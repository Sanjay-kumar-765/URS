# URS - Umbrella Rental System

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)

A comprehensive enterprise-grade umbrella rental platform featuring real-time GPS tracking, digital wallet management, and secure payment integration. Built with modern web technologies to provide seamless user experience and robust backend infrastructure.

## 🚀 Key Features

### Authentication & Security
- **Multi-factor Authentication**: Email/Phone registration with secure password hashing (bcrypt)
- **OAuth 2.0 Integration**: Google Sign-In for seamless authentication
- **JWT Token Management**: Secure session handling with token-based authentication
- **Role-based Access Control**: Protected routes and API endpoints

### Digital Wallet System
- **Secure Payment Processing**: Razorpay integration for Cards, UPI, Net Banking
- **Promotional Offers**: ₹100 instant cashback on first deposit of ₹300+
- **Real-time Balance Updates**: Live wallet synchronization across devices
- **Transaction History**: Comprehensive audit trail with detailed records
- **Automated Refunds**: Instant refund processing for cancelled rentals

### Smart Umbrella Management
- **Unique Identification**: QR-coded umbrellas with unique IDs (UMB001-UMB999)
- **Advanced Filtering**: Search by color, location, and availability
- **Real-time Availability**: Live status updates via WebSocket connections
- **GPS Tracking**: Precise location monitoring with Google Maps API
- **Multi-rental Support**: Rent multiple umbrellas simultaneously

### Payment & Billing
- **Flexible Payment Options**: Cards, UPI, QR codes, and wallet balance
- **Dynamic Pricing**: ₹7/hour (up to 7 hours), ₹70/day (8+ hours)
- **Automated Invoicing**: Digital receipts with rental details
- **Instant Unlock**: Automatic umbrella release post-payment verification

### Location Services
- **Real-time GPS Tracking**: Live umbrella location with 10-second updates
- **Interactive Maps**: Google Maps integration with custom markers
- **Drop-off Locations**: Flexible return points across campus
- **Geofencing**: Automated alerts for out-of-zone umbrellas

### Analytics & Monitoring
- **Live Dashboard**: Real-time rental statistics and metrics
- **Usage Analytics**: Rental patterns and user behavior insights
- **Revenue Tracking**: Automated financial reporting
- **System Health**: Performance monitoring and error tracking

## 🛠️ Technology Stack

### Backend Architecture
```
├── Runtime: Node.js 18+
├── Framework: Express.js 4.x
├── Database: MongoDB Atlas (Cloud)
├── ODM: Mongoose 7.x
├── Authentication: JWT + Google OAuth 2.0
├── Payment Gateway: Razorpay
├── Real-time: Socket.IO
├── Security: bcryptjs, helmet, cors
└── API: RESTful architecture
```

### Frontend Stack
```
├── Library: React 18.x
├── State Management: Context API + Hooks
├── Routing: React Router v6
├── HTTP Client: Axios
├── Maps: Google Maps JavaScript API
├── OAuth: @react-oauth/google
├── Real-time: Socket.IO Client
├── Styling: Modern CSS3 with animations
└── Build Tool: Create React App
```

### DevOps & Deployment
```
├── Version Control: Git
├── Hosting: Render / Vercel / Netlify
├── Database: MongoDB Atlas
├── Environment: dotenv
└── Process Manager: PM2 (production)
```

## 📦 Installation & Setup

### Prerequisites

Ensure you have the following installed:
- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v9.0.0 or higher (comes with Node.js)
- **MongoDB Atlas Account**: [Sign up](https://www.mongodb.com/cloud/atlas)
- **Razorpay Account**: [Register](https://razorpay.com/)
- **Google Cloud Console**: [Access](https://console.cloud.google.com/)

### Backend Configuration

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your credentials:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   ```

4. **Seed database (optional)**
   ```bash
   npm run seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Configuration

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key_id
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   REACT_APP_GOOGLE_CLIENT_ID=your_google_oauth_client_id
   ```

4. **Start development server**
   ```bash
   npm start
   ```
   Application runs on `http://localhost:3000`

## 🔐 Environment Configuration

### Backend Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|----------|
| `PORT` | Server port number | Yes | `5000` |
| `MONGODB_URI` | MongoDB connection string | Yes | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT signing | Yes | `your_secure_random_string` |
| `RAZORPAY_KEY_ID` | Razorpay API key ID | Yes | `rzp_test_xxxxx` |
| `RAZORPAY_KEY_SECRET` | Razorpay API secret | Yes | `xxxxxxxxxxxxx` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes | `xxxxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes | `GOCSPX-xxxxx` |

### Frontend Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|----------|
| `REACT_APP_API_URL` | Backend API base URL | Yes | `http://localhost:5000/api` |
| `REACT_APP_RAZORPAY_KEY_ID` | Razorpay key for frontend | Yes | `rzp_test_xxxxx` |
| `REACT_APP_GOOGLE_MAPS_API_KEY` | Google Maps API key | Yes | `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` |
| `REACT_APP_GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes | `xxxxx.apps.googleusercontent.com` |

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | No |
| `POST` | `/api/auth/login` | User login | No |
| `POST` | `/api/auth/google` | Google OAuth login | No |
| `GET` | `/api/auth/profile` | Get user profile | Yes |
| `PUT` | `/api/auth/profile` | Update user profile | Yes |
| `DELETE` | `/api/auth/profile` | Delete user account | Yes |

### Wallet Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/wallet/deposit` | Create deposit order | Yes |
| `POST` | `/api/wallet/verify-deposit` | Verify payment | Yes |
| `GET` | `/api/wallet/transactions` | Get transaction history | Yes |

### Umbrella Operations

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/umbrellas` | Get all umbrellas | No |
| `GET` | `/api/umbrellas?color=red` | Filter by color | No |
| `GET` | `/api/umbrellas/:id` | Get umbrella details | No |
| `POST` | `/api/umbrellas` | Add new umbrella | Yes (Admin) |
| `PUT` | `/api/umbrellas/:id` | Update umbrella | Yes (Admin) |
| `PATCH` | `/api/umbrellas/:id/location` | Update GPS location | Yes |

### Rental Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/rentals/start` | Start single rental | Yes |
| `POST` | `/api/rentals/start-multiple` | Start multiple rentals | Yes |
| `POST` | `/api/rentals/:id/pay` | Process payment | Yes |
| `POST` | `/api/rentals/pay-all` | Pay for all active rentals | Yes |
| `POST` | `/api/rentals/:id/end` | End rental | Yes |
| `GET` | `/api/rentals/active` | Get active rentals | Yes |
| `GET` | `/api/rentals/history` | Get rental history | Yes |

## 🗄️ Database Schema

### User Model
```javascript
{
  email: String (unique, required),
  phone: String,
  googleId: String,
  password: String (hashed with bcrypt),
  walletBalance: Number (default: 0),
  depositMade: Boolean (default: false),
  cashbackReceived: Boolean (default: false),
  rentalHistory: [ObjectId] (ref: 'Rental'),
  createdAt: Date,
  updatedAt: Date
}
```

### Umbrella Model
```javascript
{
  umbrellaId: String (unique, required),
  color: String (enum: ['red', 'blue', 'yellow', 'black', 'green']),
  isAvailable: Boolean (default: true),
  isActive: Boolean (default: true),
  location: {
    latitude: Number (required),
    longitude: Number (required),
    address: String
  },
  currentRental: ObjectId (ref: 'Rental'),
  createdAt: Date,
  updatedAt: Date
}
```

### Rental Model
```javascript
{
  user: ObjectId (ref: 'User', required),
  umbrella: ObjectId (ref: 'Umbrella', required),
  startTime: Date (default: Date.now),
  endTime: Date,
  duration: Number (hours),
  totalAmount: Number,
  paymentStatus: String (enum: ['pending', 'completed', 'failed']),
  paymentId: String,
  isActive: Boolean (default: true),
  unlocked: Boolean (default: false),
  dropOffLocation: {
    address: String,
    latitude: Number,
    longitude: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction Model
```javascript
{
  user: ObjectId (ref: 'User', required),
  type: String (enum: ['deposit', 'cashback', 'rental', 'refund']),
  amount: Number (required),
  description: String,
  paymentId: String,
  status: String (enum: ['pending', 'completed', 'failed']),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔄 User Journey

### 1. Registration & Onboarding
- User registers via email/phone or Google OAuth
- Account verification and profile setup
- Secure password creation with validation

### 2. Wallet Setup
- Initial deposit of ₹300 or more
- Automatic ₹100 cashback credited
- Payment via Razorpay (Cards/UPI/Net Banking)

### 3. Umbrella Discovery
- Browse available umbrellas on interactive map
- Filter by color, location, and distance
- View real-time availability status

### 4. Rental Initiation
- Select single or multiple umbrellas
- Review pricing and rental terms
- Confirm rental and proceed to payment

### 5. Payment Processing
- Choose payment method (Wallet/Card/UPI)
- Secure payment via Razorpay gateway
- Instant payment verification

### 6. Umbrella Unlock
- Automatic unlock post-payment
- QR code scanning for verification
- Rental timer starts immediately

### 7. Active Rental
- Real-time GPS tracking on map
- Live cost calculation display
- Duration timer with notifications

### 8. Return Process
- Navigate to designated drop-off point
- End rental via app
- Select drop-off location on map

### 9. Billing & Invoice
- Final amount calculation
- Automatic wallet deduction
- Digital invoice generation and email

## 🚧 Roadmap

### Phase 1: Core Enhancements (Q1 2025)
- [ ] Push notifications (Firebase Cloud Messaging)
- [ ] QR code scanning for umbrella verification
- [ ] Offline mode with local storage sync
- [ ] Progressive Web App (PWA) support

### Phase 2: Admin Features (Q2 2025)
- [ ] Comprehensive admin dashboard
- [ ] Real-time analytics and reporting
- [ ] Umbrella maintenance tracking
- [ ] User management system
- [ ] Revenue analytics and forecasting

### Phase 3: Advanced Features (Q3 2025)
- [ ] AI-based demand prediction
- [ ] Dynamic pricing algorithm
- [ ] Multi-language support (i18n)
- [ ] Dark mode theme
- [ ] Accessibility improvements (WCAG 2.1)

### Phase 4: Scale & Optimization (Q4 2025)
- [ ] Microservices architecture
- [ ] Redis caching layer
- [ ] CDN integration
- [ ] Load balancing
- [ ] Automated testing (Jest, Cypress)

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/URS.git
   cd URS
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style
   - Add tests for new features
   - Update documentation

4. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve bug"
   git commit -m "docs: update README"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Provide clear description
   - Reference related issues
   - Wait for code review

### Code Style Guidelines
- Use ESLint and Prettier configurations
- Follow Airbnb JavaScript Style Guide
- Write meaningful commit messages
- Add JSDoc comments for functions

### Testing
```bash
# Run backend tests
cd backend && npm test

# Run frontend tests
cd frontend && npm test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Development Team** - Initial work and maintenance

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Razorpay for payment gateway
- Google Cloud Platform for Maps and OAuth
- Open source community for amazing libraries

## 📞 Support

For support, email support@urs.com or join our Slack channel.

## 🔗 Links

- [Documentation](https://docs.urs.com)
- [API Reference](https://api.urs.com/docs)
- [Issue Tracker](https://github.com/yourusername/URS/issues)
- [Changelog](CHANGELOG.md)

---

**Made with ❤️ by the URS Team**