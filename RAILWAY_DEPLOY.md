# 🚂 Deploy Frontend to Railway

## Quick Deploy (5 minutes)

### Step 1: Go to Railway
1. Visit https://railway.app
2. Click "Login" → Sign in with GitHub
3. Click "New Project"

### Step 2: Deploy from GitHub
1. Click "Deploy from GitHub repo"
2. Select your `URS` repository
3. Click "Deploy Now"

### Step 3: Configure Frontend
1. Click on the deployed service
2. Go to "Settings" tab
3. **Root Directory:** `frontend`
4. **Build Command:** `npm run build`
5. **Start Command:** `npx serve -s build -l $PORT`

### Step 4: Add Environment Variable
1. Go to "Variables" tab
2. Click "New Variable"
3. Add:
   - **Key:** `REACT_APP_API_URL`
   - **Value:** `https://urs-r5xp.onrender.com/api`
4. Click "Add"

### Step 5: Redeploy
1. Go to "Deployments" tab
2. Click "Redeploy" (or push to GitHub)
3. Wait 2-3 minutes
4. Copy your Railway URL

---

## 📋 Configuration Summary

**Root Directory:** `frontend`
**Build Command:** `npm run build`
**Start Command:** `npx serve -s build -l $PORT`

**Environment Variable:**
```
REACT_APP_API_URL=https://urs-r5xp.onrender.com/api
```

---

## ✅ After Deployment

### Update Backend CORS
1. Go to Render dashboard
2. Open your backend service
3. Add environment variable:
   - **Key:** `FRONTEND_URL`
   - **Value:** Your Railway URL (e.g., `https://urs-production.up.railway.app`)
4. Redeploy backend

### Seed Database
```bash
cd backend
node seedData.js
```

---

## 🧪 Test Your App

1. Visit your Railway URL
2. Login with: `student1@cu.edu.in` / `password123`
3. Test all features

---

## 🆘 Troubleshooting

**Build fails:**
- Check build logs in Railway dashboard
- Verify `package.json` exists in frontend folder

**Can't connect to API:**
- Verify `REACT_APP_API_URL` is set correctly
- Check backend is running on Render

**CORS error:**
- Add `FRONTEND_URL` to Render backend
- Redeploy backend

---

## 💰 Cost
Railway offers:
- $5 free credit/month
- Pay only for usage after that
- Frontend typically costs $1-2/month

---

## 🎯 Complete Setup

✅ Backend: https://urs-r5xp.onrender.com
✅ Frontend: Your Railway URL
✅ Database: MongoDB Atlas

**You're done!** 🎉
