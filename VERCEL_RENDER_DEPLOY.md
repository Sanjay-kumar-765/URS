# 🚀 Deploy to Vercel + Render

## Quick Deploy (15 minutes)

### Step 1: MongoDB Atlas (3 min)
1. Go to https://cloud.mongodb.com
2. Create free cluster
3. Create user & whitelist `0.0.0.0/0`
4. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/urs`

### Step 2: Deploy Backend to Render (5 min)
1. Go to https://render.com
2. New → **Web Service** (NOT Static Site) → Connect GitHub
3. Settings:
   - Root: `backend`
   - Build: `npm install`
   - Start: `npm start`
4. Environment Variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=generate_random_32_chars
   NODE_ENV=production
   PORT=5000
   ```
5. Deploy → Copy URL: `https://your-backend.onrender.com`

### Step 3: Deploy Frontend to Vercel (5 min)
1. Go to https://vercel.com
2. Import Project → GitHub
3. Settings:
   - Root Directory: `frontend`
   - Framework: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Environment Variables:
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com/api
   ```
5. Deploy → Copy URL: `https://your-app.vercel.app`

### Step 4: Update Backend CORS (1 min)
1. In Render, add environment variable:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
2. Redeploy backend

### Step 5: Seed Database (1 min)
```bash
cd backend
node seedData.js
```

## Done! 🎉
Visit your Vercel URL and test the app.

**Test Login:**
- Email: `student1@cu.edu.in`
- Password: `password123`

---

## Detailed Vercel Setup

### Configure Project
1. **Import from GitHub**
   - Click "Add New" → "Project"
   - Select repository
   - Click "Import"

2. **Configure Build**
   - Framework Preset: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Environment Variables**
   Click "Environment Variables":
   
   | Name | Value |
   |------|-------|
   | REACT_APP_API_URL | `https://your-backend.onrender.com/api` |
   | REACT_APP_GOOGLE_CLIENT_ID | (optional) |
   | REACT_APP_GOOGLE_MAPS_API_KEY | (optional) |

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Copy deployment URL

### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as shown
4. Wait for SSL certificate

---

## Vercel CLI Deployment

### Install Vercel CLI
```bash
npm i -g vercel
```

### Deploy
```bash
cd frontend
vercel
```

Follow prompts:
- Set up and deploy? Yes
- Which scope? Your account
- Link to existing project? No
- Project name? rainshield-frontend
- Directory? ./
- Override settings? No

### Set Environment Variables
```bash
vercel env add REACT_APP_API_URL
# Paste: https://your-backend.onrender.com/api

vercel env add REACT_APP_GOOGLE_CLIENT_ID
# Paste your Google Client ID
```

### Deploy to Production
```bash
vercel --prod
```

---

## Troubleshooting

### "Build Failed"
- Check `vercel.json` exists in frontend folder
- Verify `package.json` has `vercel-build` script
- Check build logs in Vercel dashboard

### "Cannot connect to API"
- Verify `REACT_APP_API_URL` is set
- Check backend is running on Render
- Test backend: `https://your-backend.onrender.com/api`

### "CORS Error"
- Add `FRONTEND_URL` to Render backend
- Use exact Vercel URL (no trailing slash)
- Redeploy backend

### "Environment variables not working"
- Redeploy after adding variables
- Check variable names (REACT_APP_ prefix)
- Clear browser cache

---

## Monitoring

### Vercel Dashboard
- **Deployments**: View all deployments
- **Analytics**: Traffic & performance
- **Logs**: Runtime logs
- **Settings**: Environment variables

### Auto-Deploy
Vercel auto-deploys on:
- Push to main branch
- Pull request (preview)

---

## Performance

### Vercel Advantages
✅ Global CDN
✅ Automatic HTTPS
✅ Instant cache invalidation
✅ Preview deployments
✅ Zero config
✅ Fast builds

### Optimization
- Images optimized automatically
- Gzip compression enabled
- HTTP/2 enabled
- Edge caching

---

## Cost
- **Free Tier**: 100GB bandwidth/month
- **Hobby**: Free for personal projects
- **Pro**: $20/month for commercial

---

## Quick Commands

```bash
# Deploy
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm <deployment-url>
```

---

## Environment Variables Reference

### Required
```env
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

### Optional
```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GOOGLE_MAPS_API_KEY=your_maps_api_key
REACT_APP_RAZORPAY_KEY_ID=your_razorpay_key
```

---

## Success Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] Environment variables set
- [ ] CORS configured
- [ ] Database seeded
- [ ] Login works
- [ ] API calls successful
- [ ] No console errors

---

**Need help?** Check [TROUBLESHOOTING.md](../TROUBLESHOOTING.md)
