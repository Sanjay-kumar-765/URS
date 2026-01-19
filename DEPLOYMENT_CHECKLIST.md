# 📋 Deployment Checklist

## Pre-Deployment Setup

### MongoDB Atlas
- [ ] Create MongoDB Atlas account
- [ ] Create new cluster (free tier)
- [ ] Create database user with password
- [ ] Whitelist all IPs (0.0.0.0/0)
- [ ] Get connection string
- [ ] Test connection

### Google Cloud Console (Optional but Recommended)
- [ ] Create Google Cloud project
- [ ] Enable Google Maps JavaScript API
- [ ] Create API key for Maps
- [ ] Enable Google OAuth 2.0
- [ ] Create OAuth 2.0 Client ID
- [ ] Add authorized origins

### GitHub
- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Verify all files are uploaded

## Backend Deployment (Render)

- [ ] Sign up for Render account
- [ ] Create new Web Service
- [ ] Connect GitHub repository
- [ ] Configure build settings:
  - [ ] Root Directory: `backend`
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
- [ ] Add environment variables:
  - [ ] MONGODB_URI
  - [ ] JWT_SECRET (generate random 32+ char string)
  - [ ] NODE_ENV=production
  - [ ] PORT=5000
  - [ ] FRONTEND_URL (add after frontend deployment)
- [ ] Deploy backend
- [ ] Copy backend URL
- [ ] Test backend: `https://your-backend.onrender.com/api`

## Frontend Deployment (Netlify)

- [ ] Sign up for Netlify account
- [ ] Create new site from Git
- [ ] Connect GitHub repository
- [ ] Configure build settings:
  - [ ] Base directory: `frontend`
  - [ ] Build command: `npm run build`
  - [ ] Publish directory: `frontend/build`
- [ ] Add environment variables:
  - [ ] REACT_APP_API_URL=https://your-backend.onrender.com/api
  - [ ] REACT_APP_GOOGLE_CLIENT_ID (if using Google OAuth)
  - [ ] REACT_APP_GOOGLE_MAPS_API_KEY (if using Maps)
- [ ] Deploy frontend
- [ ] Copy frontend URL

## Post-Deployment Configuration

- [ ] Update backend FRONTEND_URL environment variable with Netlify URL
- [ ] Redeploy backend
- [ ] Update Google OAuth authorized origins with Netlify URL
- [ ] Seed database with test data:
  ```bash
  cd backend
  node seedData.js
  ```

## Testing

- [ ] Visit frontend URL
- [ ] Test user registration
- [ ] Test user login
- [ ] Test wallet deposit
- [ ] Test umbrella browsing
- [ ] Test umbrella rental
- [ ] Test rental tracking
- [ ] Test rental completion
- [ ] Test profile update
- [ ] Check real-time updates
- [ ] Test on mobile device
- [ ] Test PWA installation

## Optional Enhancements

- [ ] Set up custom domain (Netlify)
- [ ] Enable HTTPS (automatic on Netlify/Render)
- [ ] Set up monitoring/logging
- [ ] Configure email notifications
- [ ] Add analytics
- [ ] Set up CI/CD pipeline

## Troubleshooting

### Backend Issues
- [ ] Check Render logs for errors
- [ ] Verify MongoDB connection
- [ ] Check environment variables
- [ ] Test API endpoints directly

### Frontend Issues
- [ ] Check browser console for errors
- [ ] Verify API URL is correct
- [ ] Check CORS settings
- [ ] Clear browser cache

### Database Issues
- [ ] Verify MongoDB Atlas IP whitelist
- [ ] Check database user permissions
- [ ] Test connection string locally

## Success Criteria

- [ ] Users can register and login
- [ ] Wallet system works
- [ ] Umbrellas can be rented
- [ ] Real-time tracking works
- [ ] Payments are processed
- [ ] App is responsive on mobile
- [ ] No console errors
- [ ] All features functional

## Notes

Backend URL: ___________________________________

Frontend URL: ___________________________________

MongoDB URI: ___________________________________

Test User: student1@cu.edu.in / password123

Deployment Date: ___________________________________
