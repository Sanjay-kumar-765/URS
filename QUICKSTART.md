# 🚀 Quick Start - Deploy in 10 Minutes

## Option 1: Local Development (Fastest)

### Step 1: Setup Environment
```bash
# Run setup script
setup.bat  # Windows
# or
bash setup.sh  # Mac/Linux
```

### Step 2: Configure Backend
Edit `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/urs
JWT_SECRET=your_secret_key_min_32_characters_long
PORT=5000
```

### Step 3: Configure Frontend
Edit `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 4: Start Application
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm start
```

Visit: http://localhost:3000

---

## Option 2: Deploy to Cloud (Production)

### Prerequisites
- GitHub account
- MongoDB Atlas account (free)
- Render account (free)
- Netlify account (free)

### Step 1: MongoDB Atlas
1. Create cluster at https://cloud.mongodb.com
2. Create database user
3. Whitelist IP: `0.0.0.0/0`
4. Copy connection string

### Step 2: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/urs.git
git push -u origin main
```

### Step 3: Deploy Backend (Render)
1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Settings:
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
5. Add Environment Variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=random_32_char_string
   NODE_ENV=production
   ```
6. Deploy → Copy URL

### Step 4: Deploy Frontend (Netlify)
1. Go to https://netlify.com
2. New site from Git
3. Connect GitHub repo
4. Settings:
   - Base: `frontend`
   - Build: `npm run build`
   - Publish: `frontend/build`
5. Environment Variables:
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com/api
   ```
6. Deploy → Copy URL

### Step 5: Update Backend CORS
In Render dashboard, add environment variable:
```
FRONTEND_URL=https://your-app.netlify.app
```
Redeploy backend.

### Step 6: Seed Database
```bash
cd backend
node seedData.js
```

### Done! 🎉
Visit your Netlify URL and start using RainShield!

---

## Test Credentials (After Seeding)
- Email: `student1@cu.edu.in`
- Password: `password123`

---

## Troubleshooting

**Backend won't start:**
- Check MongoDB connection string
- Ensure JWT_SECRET is set

**Frontend can't connect:**
- Verify REACT_APP_API_URL is correct
- Check backend CORS settings

**Maps not loading:**
- Get Google Maps API key from Google Cloud Console
- Add to frontend environment variables

---

## Need Help?
See `DEPLOYMENT_GUIDE.md` for detailed instructions.
