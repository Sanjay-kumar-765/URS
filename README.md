# ☂️ RainShield - Umbrella Rental System

Fully responsive web application for umbrella rentals. Works perfectly on desktop, tablet, and mobile devices.

## 🚀 Quick Start

**1. Start Backend:**
```bash
cd backend
npm install
npm start
```

**2. Start Frontend:**
```bash
cd frontend
npm install
npm start
```

**3. Open:** http://localhost:3000

## ✨ Features

### Core Features
- 🔐 User authentication (Email/Phone + Google OAuth)
- 💰 Digital wallet system with ₹100 cashback on ₹300 deposit
- ☂️ Browse and rent umbrellas by color and location
- 📍 Real-time umbrella tracking with live updates
- 🗺️ Interactive map view for umbrella locations
- 📊 Rental history and dashboard analytics
- 💳 Secure payment integration
- 👤 User profile management

### UI/UX Features
- 🌐 Fully responsive design (mobile-first)
- 📱 PWA - Installable on phones like native app
- 🎨 Beautiful gradient UI with glassmorphism
- ⚡ Fast and lightweight
- 🌙 Smooth animations and transitions
- ♿ Accessibility compliant

### Pricing
- ₹7 per hour
- ₹70 per day
- One-time ₹300 deposit (get ₹100 cashback)

## 📱 Works on All Devices

The app automatically adjusts to:
- 📱 Phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1200px+)

## 🛠️ Tech Stack

**Frontend:**
- React 18.3.1
- React Router v6
- Axios for API calls
- Google OAuth integration
- Custom responsive CSS with animations

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing
- CORS enabled

**Deployment:**
- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas

## 📦 Production Build

```bash
cd frontend
npm run build
```

## 🎯 Project Structure

```
URS/
├── backend/
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth middleware
│   └── server.js         # Express server
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API & Auth services
│   │   └── utils/        # Helper functions
│   └── public/           # Static assets
├── SETUP.md             # Setup guide
└── README.md            # This file
```

## 🌟 Responsive Features

✅ Touch-friendly buttons (44px minimum)
✅ Fluid typography with clamp()
✅ Flexible grid layouts
✅ Mobile-first CSS approach
✅ Responsive images
✅ Adaptive navigation
✅ Breakpoints: 480px, 768px, 1024px, 1200px
✅ Landscape orientation support
✅ High DPI display optimization

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Environment variables for sensitive data

## 📱 Install as App on Phone

**Android (Chrome):**
1. Open app in Chrome
2. Tap menu (⋮) → "Add to Home Screen"
3. App icon appears on home screen!

**iPhone (Safari):**
1. Open app in Safari
2. Tap Share (□↑) → "Add to Home Screen"
3. App icon appears on home screen!

## 🚀 Deployment

**Frontend (Netlify):**
- Auto-deploys from Git
- Custom domain support
- HTTPS enabled

**Backend (Render):**
- Auto-deploys from Git
- Environment variables configured
- Always-on service

**Database (MongoDB Atlas):**
- Cloud-hosted MongoDB
- Automatic backups
- Secure connection

## 📝 Environment Variables

**Backend (.env):**
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

**Frontend (.env):**
```
REACT_APP_API_URL=your_backend_url
REACT_APP_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

## 🎨 Color Scheme

- Primary: Linear gradient (#667eea → #764ba2)
- Success: Linear gradient (#10b981 → #059669)
- Background: Purple gradient
- Cards: White with glassmorphism effect

## 🤝 Contributing

Feel free to fork, improve, and submit pull requests!

## 📄 License

MIT License - feel free to use for your projects!

---

Your app works beautifully on any device! 🎉
