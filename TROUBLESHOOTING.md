# 🔧 Troubleshooting Guide

## Backend Issues

### ❌ "Cannot connect to MongoDB"

**Symptoms:**
- Backend crashes on startup
- Error: "MongooseServerSelectionError"

**Solutions:**
1. Check MongoDB URI format:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database
   ```
2. Verify IP whitelist in MongoDB Atlas:
   - Go to Network Access
   - Add `0.0.0.0/0` (allow all)
3. Check username/password are correct
4. Test connection:
   ```bash
   cd backend
   node -e "require('mongoose').connect('YOUR_URI').then(() => console.log('✅ Connected')).catch(e => console.log('❌', e.message))"
   ```

### ❌ "Invalid JWT Secret"

**Symptoms:**
- Login fails
- Token verification errors

**Solutions:**
1. Generate new secret:
   ```bash
   cd backend
   node generate-secret.js
   ```
2. Add to `.env`:
   ```
   JWT_SECRET=your_generated_secret
   ```
3. Restart backend

### ❌ "Port already in use"

**Symptoms:**
- Error: "EADDRINUSE: address already in use :::5000"

**Solutions:**
1. Kill process on port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:5000 | xargs kill -9
   ```
2. Or change port in `.env`:
   ```
   PORT=5001
   ```

---

## Frontend Issues

### ❌ "Network Error / Cannot connect to API"

**Symptoms:**
- Login fails
- "Network Error" in console
- API calls fail

**Solutions:**
1. Check `REACT_APP_API_URL` in `.env`:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
2. Verify backend is running
3. Check backend URL is correct (include `/api`)
4. Restart frontend after changing `.env`

### ❌ "CORS Error"

**Symptoms:**
- "Access-Control-Allow-Origin" error in console
- API calls blocked

**Solutions:**
1. Add `FRONTEND_URL` to backend `.env`:
   ```
   FRONTEND_URL=http://localhost:3000
   ```
2. Restart backend
3. For production, use actual Netlify URL

### ❌ "Maps not loading"

**Symptoms:**
- Map shows gray box
- Console error about Google Maps

**Solutions:**
1. Get API key from Google Cloud Console
2. Enable "Maps JavaScript API"
3. Add to frontend `.env`:
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_key
   ```
4. Restart frontend

### ❌ "Google Login not working"

**Symptoms:**
- Google button doesn't work
- OAuth errors

**Solutions:**
1. Get OAuth Client ID from Google Cloud Console
2. Add authorized origins:
   - `http://localhost:3000`
   - Your production URL
3. Add to frontend `.env`:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=your_client_id
   ```
4. Restart frontend

---

## Deployment Issues

### ❌ Render: "Build failed"

**Solutions:**
1. Check `package.json` exists in backend folder
2. Verify build command: `npm install`
3. Check Node version compatibility
4. Review build logs in Render dashboard

### ❌ Render: "Application failed to respond"

**Solutions:**
1. Check environment variables are set
2. Verify MongoDB connection
3. Check logs in Render dashboard
4. Ensure PORT is set to 5000

### ❌ Netlify: "Build failed"

**Solutions:**
1. Check build command: `npm run build`
2. Verify publish directory: `frontend/build`
3. Check all dependencies in `package.json`
4. Review build logs in Netlify dashboard

### ❌ Netlify: "Page not found on refresh"

**Solutions:**
1. Check `_redirects` file exists in `frontend/public`:
   ```
   /*    /index.html   200
   ```
2. Or add to `netlify.toml`:
   ```toml
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

---

## Database Issues

### ❌ "No data after deployment"

**Solutions:**
1. Seed the database:
   ```bash
   cd backend
   node seedData.js
   ```
2. Check MongoDB Atlas connection
3. Verify database name in URI

### ❌ "Authentication failed"

**Solutions:**
1. Check database user permissions
2. Verify username/password in URI
3. Recreate database user if needed

---

## Common Errors

### ❌ "Module not found"

**Solutions:**
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### ❌ "Environment variables not loading"

**Solutions:**
1. Check `.env` file exists
2. Verify variable names (REACT_APP_ prefix for frontend)
3. Restart application after changes
4. Don't use quotes around values
5. No spaces around `=`

### ❌ "Socket.IO connection failed"

**Solutions:**
1. Check backend URL in `socket.js`
2. Verify CORS settings
3. Check firewall/network settings
4. Try polling transport first

---

## Testing Checklist

### Backend Health Check
```bash
# Test if backend is running
curl http://localhost:5000/api

# Should return 404 (route not found) but confirms server is up
```

### Frontend Health Check
```bash
# Check if frontend is running
curl http://localhost:3000

# Should return HTML
```

### Database Connection Test
```bash
cd backend
node -e "require('mongoose').connect(process.env.MONGODB_URI).then(() => console.log('✅ DB Connected')).catch(e => console.log('❌ Error:', e.message))"
```

---

## Debug Mode

### Enable Detailed Logging

**Backend:**
Add to `server.js`:
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

**Frontend:**
Check browser console (F12) for errors

---

## Performance Issues

### ❌ "Slow API responses"

**Solutions:**
1. Check MongoDB Atlas region (use closest)
2. Add database indexes
3. Optimize queries
4. Use connection pooling

### ❌ "Frontend loads slowly"

**Solutions:**
1. Build for production: `npm run build`
2. Enable compression
3. Optimize images
4. Use CDN for static assets

---

## Security Issues

### ❌ "JWT token expired"

**Solutions:**
1. Increase token expiry in backend
2. Implement refresh tokens
3. Clear localStorage and login again

### ❌ "Unauthorized access"

**Solutions:**
1. Check JWT_SECRET is set
2. Verify token in localStorage
3. Check auth middleware

---

## Getting Help

### Before Asking for Help:

1. ✅ Check this troubleshooting guide
2. ✅ Review error messages carefully
3. ✅ Check browser console (F12)
4. ✅ Review backend logs
5. ✅ Verify environment variables
6. ✅ Test locally first

### Provide This Information:

- Error message (full text)
- Steps to reproduce
- Environment (local/production)
- Browser/Node version
- Relevant code snippets
- Console/log output

---

## Quick Fixes

### Reset Everything (Local)
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
rm .env
cp .env.example .env
# Edit .env with your values
npm start

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
rm .env
cp .env.example .env
# Edit .env with your values
npm start
```

### Reset Database
```bash
cd backend
node seedData.js
```

### Clear Browser Data
1. Open DevTools (F12)
2. Application tab
3. Clear Storage
4. Reload page

---

## Still Having Issues?

1. Review [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
2. Check [ENV_VARIABLES.md](ENV_VARIABLES.md)
3. Follow [QUICKSTART.md](QUICKSTART.md) step-by-step
4. Verify [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
