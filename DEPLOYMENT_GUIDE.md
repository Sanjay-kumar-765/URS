# RainShield Deployment Guide

## Prerequisites
- MongoDB Atlas account
- Render account (for backend)
- Netlify account (for frontend)
- Google Cloud Console (for OAuth & Maps)

## Step 1: MongoDB Atlas Setup
1. Go to https://cloud.mongodb.com
2. Create a cluster (free tier)
3. Create database user
4. Whitelist all IPs: `0.0.0.0/0`
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/urs`

## Step 2: Google Cloud Setup
1. Go to https://console.cloud.google.com
2. Create new project
3. Enable APIs:
   - Google Maps JavaScript API
   - Google OAuth 2.0
4. Create credentials:
   - OAuth 2.0 Client ID (for login)
   - API Key (for maps)
5. Add authorized origins:
   - `http://localhost:3000`
   - `https://your-netlify-app.netlify.app`

## Step 3: Deploy Backend to Render
1. Push code to GitHub
2. Go to https://render.com
3. New > Web Service
4. Connect GitHub repo
5. Settings:
   - Name: `rainshield-backend`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node
6. Add Environment Variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_random_secret_key_here
   PORT=5000
   NODE_ENV=production
   ```
7. Deploy
8. Copy the URL: `https://rainshield-backend.onrender.com`

## Step 4: Seed Database
1. After backend is deployed, run locally:
   ```bash
   cd backend
   npm install
   node seedData.js
   ```

## Step 5: Deploy Frontend to Netlify
1. Go to https://netlify.com
2. New site from Git
3. Connect GitHub repo
4. Settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
5. Add Environment Variables:
   ```
   REACT_APP_API_URL=https://rainshield-backend.onrender.com/api
   REACT_APP_GOOGLE_CLIENT_ID=your_google_oauth_client_id
   ```
6. Deploy
7. Copy URL: `https://your-app.netlify.app`

## Step 6: Update CORS
Update backend `server.js` to allow your Netlify URL:
```javascript
app.use(cors({
  origin: ['https://your-app.netlify.app', 'http://localhost:3000'],
  credentials: true
}));
```

## Step 7: Test
1. Visit your Netlify URL
2. Register/Login
3. Add money to wallet
4. Rent an umbrella
5. Track rental
6. End rental

## Troubleshooting
- **CORS errors**: Check backend CORS settings
- **API not connecting**: Verify REACT_APP_API_URL
- **Maps not loading**: Check Google Maps API key
- **Login fails**: Verify Google OAuth credentials
- **Database errors**: Check MongoDB connection string

## Local Development
```bash
# Backend
cd backend
npm install
npm start

# Frontend (new terminal)
cd frontend
npm install
npm start
```

Visit: http://localhost:3000
