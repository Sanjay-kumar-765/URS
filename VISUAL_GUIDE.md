# 📸 Visual Deployment Guide

This guide provides visual references for each deployment step.

## 🗂️ MongoDB Atlas Setup

### Step 1: Create Account
1. Go to https://cloud.mongodb.com
2. Click "Try Free"
3. Sign up with email or Google

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select cloud provider (AWS recommended)
4. Choose region (closest to you)
5. Click "Create Cluster"

### Step 3: Create Database User
1. Click "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `urs_user` (or your choice)
5. Password: Generate secure password
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Whitelist IP
1. Click "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. IP: `0.0.0.0/0`
5. Click "Confirm"

### Step 5: Get Connection String
1. Click "Database" (left sidebar)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy connection string
5. Replace `<password>` with your password
6. Replace `<dbname>` with `urs`

**Example:**
```
mongodb+srv://urs_user:MyPassword123@cluster0.xxxxx.mongodb.net/urs
```

---

## 🚀 Render Deployment

### Step 1: Create Account
1. Go to https://render.com
2. Click "Get Started"
3. Sign up with GitHub

### Step 2: Connect GitHub
1. Click "New +"
2. **Select "Web Service"** ⚠️ (NOT Static Site)
3. Click "Connect GitHub"
4. Authorize Render
5. Select your repository

**Why Web Service?**
- Backend is a Node.js server (not static files)
- Needs to run continuously
- Handles API requests

### Step 3: Configure Service
**Basic Settings:**
- Name: `rainshield-backend`
- Region: Oregon (or closest)
- Branch: `main`
- Root Directory: `backend`
- Runtime: Node
- Build Command: `npm install`
- Start Command: `npm start`

**Advanced Settings:**
- Auto-Deploy: Yes
- Health Check Path: `/api`

### Step 4: Environment Variables
Click "Environment" tab, add:

| Key | Value |
|-----|-------|
| MONGODB_URI | `mongodb+srv://...` |
| JWT_SECRET | `your_32_char_secret` |
| NODE_ENV | `production` |
| PORT | `5000` |

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for build (5-10 minutes)
3. Copy URL: `https://rainshield-backend.onrender.com`

---

## 🌐 Netlify Deployment

**Note: For Vercel deployment, see [VERCEL_RENDER_DEPLOY.md](../VERCEL_RENDER_DEPLOY.md)**

### Step 1: Create Account
1. Go to https://netlify.com
2. Click "Sign up"
3. Sign up with GitHub

### Step 2: New Site
1. Click "Add new site"
2. Select "Import an existing project"
3. Choose "GitHub"
4. Authorize Netlify
5. Select your repository

### Step 3: Build Settings
**Basic Settings:**
- Branch: `main`
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `frontend/build`

### Step 4: Environment Variables
Click "Site settings" → "Environment variables" → "Add a variable"

| Key | Value |
|-----|-------|
| REACT_APP_API_URL | `https://your-backend.onrender.com/api` |

### Step 5: Deploy
1. Click "Deploy site"
2. Wait for build (3-5 minutes)
3. Copy URL: `https://your-app.netlify.app`

### Step 6: Custom Domain (Optional)
1. Click "Domain settings"
2. Click "Add custom domain"
3. Follow DNS instructions

---

## 🔑 Google Cloud Console

### Step 1: Create Project
1. Go to https://console.cloud.google.com
2. Click project dropdown (top)
3. Click "New Project"
4. Name: `RainShield`
5. Click "Create"

### Step 2: Enable APIs
1. Click "APIs & Services" → "Library"
2. Search "Maps JavaScript API"
3. Click "Enable"
4. Search "Google+ API"
5. Click "Enable"

### Step 3: Create API Key (Maps)
1. Click "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "API Key"
3. Copy API key
4. Click "Restrict Key"
5. API restrictions: "Maps JavaScript API"
6. Save

### Step 4: Create OAuth Client ID
1. Click "Create Credentials" → "OAuth client ID"
2. Configure consent screen (if needed):
   - User Type: External
   - App name: RainShield
   - Support email: your email
   - Save
3. Application type: "Web application"
4. Name: `RainShield Web Client`
5. Authorized JavaScript origins:
   - `http://localhost:3000`
   - `https://your-app.netlify.app`
6. Click "Create"
7. Copy Client ID

---

## 📱 Testing Deployment

### Backend Health Check
1. Open browser
2. Go to: `https://your-backend.onrender.com/api`
3. Should see: `Cannot GET /api` (this is OK!)
4. Means server is running

### Frontend Check
1. Open browser
2. Go to: `https://your-app.netlify.app`
3. Should see: RainShield splash screen
4. Then login page

### Full Test Flow
1. **Register**: Create new account
2. **Login**: Sign in with credentials
3. **Wallet**: Add ₹300 (get ₹100 cashback)
4. **Browse**: View available umbrellas
5. **Rent**: Select and rent umbrella
6. **Track**: View rental tracking
7. **End**: Complete rental

---

## 🎨 Screenshots Reference

### Expected Screens:

**1. Splash Screen**
- Purple gradient background
- Umbrella emoji
- "RainShield" title
- Loading animation

**2. Login Page**
- Email input
- Password input
- "Let me in!" button
- Google login button
- Switch to register

**3. Dashboard**
- Wallet balance (top right)
- Navigation buttons
- Active rentals
- Rental history
- Statistics cards

**4. Umbrella Selection**
- Grid/Map view toggle
- Color filters
- Location filters
- Umbrella cards with:
  - Umbrella image
  - ID and color
  - Location
  - Availability status
  - Select checkbox

**5. Wallet**
- Current balance
- Add money form
- Payment method selection
- Transaction history

**6. Rental Tracking**
- Active rental details
- Real-time timer
- Current cost
- Map with umbrella location
- Pay & Unlock button
- End Rental button

**7. Profile**
- User information
- Edit profile form
- Wallet summary
- Delete account option

---

## 🔍 Verification Checklist

### Backend Verification
- [ ] Render dashboard shows "Live"
- [ ] Logs show "Server running"
- [ ] No error messages in logs
- [ ] Environment variables set
- [ ] MongoDB connected

### Frontend Verification
- [ ] Netlify dashboard shows "Published"
- [ ] Site preview works
- [ ] No build errors
- [ ] Environment variables set
- [ ] API URL correct

### Database Verification
- [ ] MongoDB Atlas shows connections
- [ ] Collections exist (users, umbrellas, etc.)
- [ ] Test data present (after seeding)

### Integration Verification
- [ ] Frontend can reach backend
- [ ] No CORS errors
- [ ] Login works
- [ ] API calls successful
- [ ] Real-time updates work

---

## 📊 Monitoring

### Render Dashboard
- **Logs**: View real-time server logs
- **Metrics**: CPU, memory usage
- **Events**: Deployment history
- **Settings**: Environment variables

### Netlify Dashboard
- **Deploys**: Build history
- **Functions**: Serverless functions (if any)
- **Analytics**: Site traffic
- **Settings**: Environment variables

### MongoDB Atlas
- **Metrics**: Database performance
- **Collections**: View data
- **Users**: Database access
- **Network**: IP whitelist

---

## 🎯 Success Indicators

### You know it's working when:
✅ Backend shows "Live" on Render
✅ Frontend loads without errors
✅ Login/Register works
✅ Wallet transactions process
✅ Umbrellas can be rented
✅ Maps display correctly
✅ Real-time updates appear
✅ Mobile responsive works
✅ PWA can be installed

---

## 📹 Video Tutorial (Recommended)

While this guide provides visual references, consider recording your own deployment process for future reference:

1. Screen record your deployment
2. Note any issues encountered
3. Document solutions
4. Share with team

---

## 🆘 Visual Troubleshooting

### If you see...

**"Build Failed" (Render/Netlify)**
→ Check build logs for specific error
→ Verify package.json exists
→ Check Node version

**Gray screen (Frontend)**
→ Check browser console (F12)
→ Verify API URL
→ Check CORS settings

**"Cannot connect" error**
→ Verify backend is running
→ Check network tab in DevTools
→ Verify URLs are correct

**Map shows gray box**
→ Check Google Maps API key
→ Verify API is enabled
→ Check browser console

---

## 📚 Additional Resources

- **Render Docs**: https://render.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **MongoDB Docs**: https://docs.mongodb.com
- **Google Cloud Docs**: https://cloud.google.com/docs

---

**Need help?** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
