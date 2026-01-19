# ⚡ Quick Reference: Vercel + Render

## 🎯 Deployment URLs
- **Backend (Render)**: https://render.com
- **Frontend (Vercel)**: https://vercel.com
- **Database**: https://cloud.mongodb.com

## 📋 Checklist

### 1. MongoDB (3 min)
- [ ] Create cluster
- [ ] Create user
- [ ] Whitelist `0.0.0.0/0`
- [ ] Copy connection string

### 2. Backend - Render (5 min)
- [ ] New Web Service
- [ ] Root: `backend`
- [ ] Build: `npm install`
- [ ] Start: `npm start`
- [ ] Add env vars (see below)
- [ ] Copy backend URL

### 3. Frontend - Vercel (5 min)
- [ ] Import from GitHub
- [ ] Root: `frontend`
- [ ] Build: `npm run build`
- [ ] Output: `build`
- [ ] Add env vars (see below)
- [ ] Copy frontend URL

### 4. Update & Seed (2 min)
- [ ] Add `FRONTEND_URL` to Render
- [ ] Redeploy backend
- [ ] Run `node seedData.js`

## 🔑 Environment Variables

### Render (Backend)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/urs
JWT_SECRET=random_32_character_secret_key_here
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-app.vercel.app
```

### Vercel (Frontend)
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

## 🧪 Test
1. Visit Vercel URL
2. Login: `student1@cu.edu.in` / `password123`
3. Test wallet, rent umbrella

## 🆘 Issues?
- CORS error → Check `FRONTEND_URL` in Render
- Can't connect → Verify `REACT_APP_API_URL` in Vercel
- Build fails → Check logs in dashboard

## 📚 Full Guide
See [VERCEL_RENDER_DEPLOY.md](VERCEL_RENDER_DEPLOY.md)
