# 🔐 Environment Variables Reference

## Backend Environment Variables

### Required Variables

**MONGODB_URI**
```
mongodb+srv://username:password@cluster.mongodb.net/urs
```
- Get from MongoDB Atlas
- Format: `mongodb+srv://username:password@cluster.mongodb.net/database_name`
- Ensure IP whitelist includes `0.0.0.0/0`

**JWT_SECRET**
```
your_random_secret_key_minimum_32_characters_long_for_security
```
- Generate random string (32+ characters)
- Use: https://randomkeygen.com/ or `openssl rand -base64 32`
- Keep this secret and secure

**PORT**
```
5000
```
- Default: 5000
- Render will set this automatically

**NODE_ENV**
```
production
```
- Set to `production` for deployment
- Set to `development` for local testing

**FRONTEND_URL**
```
https://your-app.netlify.app
```
- Your Netlify frontend URL
- Used for CORS configuration
- Add after frontend is deployed

### Optional Variables

**RAZORPAY_KEY_ID** (if using Razorpay)
```
rzp_test_xxxxxxxxxxxxx
```

**RAZORPAY_KEY_SECRET** (if using Razorpay)
```
your_razorpay_secret
```

**GOOGLE_CLIENT_ID** (if using Google OAuth backend validation)
```
xxxxx.apps.googleusercontent.com
```

---

## Frontend Environment Variables

### Required Variables

**REACT_APP_API_URL**
```
https://your-backend.onrender.com/api
```
- Your Render backend URL + `/api`
- For local: `http://localhost:5000/api`

### Optional Variables

**REACT_APP_GOOGLE_CLIENT_ID** (for Google OAuth login)
```
xxxxx.apps.googleusercontent.com
```
- Get from Google Cloud Console
- OAuth 2.0 Client ID

**REACT_APP_GOOGLE_MAPS_API_KEY** (for maps)
```
AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
- Get from Google Cloud Console
- Enable Maps JavaScript API

**REACT_APP_RAZORPAY_KEY_ID** (for payments)
```
rzp_test_xxxxxxxxxxxxx
```
- Get from Razorpay Dashboard

---

## Quick Setup Commands

### Generate JWT Secret
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

### Test MongoDB Connection
```bash
cd backend
node -e "require('mongoose').connect('YOUR_MONGODB_URI').then(() => console.log('✅ Connected')).catch(e => console.log('❌ Error:', e.message))"
```

---

## Environment Files Structure

### Local Development

**backend/.env**
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/urs
JWT_SECRET=your_32_char_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**frontend/.env**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GOOGLE_MAPS_API_KEY=your_maps_api_key
```

### Production (Render)

Add in Render Dashboard → Environment:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/urs
JWT_SECRET=your_32_char_secret_key_here
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-app.netlify.app
```

### Production (Netlify)

Add in Netlify Dashboard → Environment Variables:
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GOOGLE_MAPS_API_KEY=your_maps_api_key
```

---

## Security Best Practices

✅ **DO:**
- Use strong, random JWT secrets (32+ characters)
- Keep `.env` files in `.gitignore`
- Use different secrets for dev/prod
- Rotate secrets periodically
- Use environment variables for all sensitive data

❌ **DON'T:**
- Commit `.env` files to Git
- Share secrets in public channels
- Use simple/guessable secrets
- Hardcode credentials in code
- Reuse secrets across projects

---

## Verification

### Check Backend Environment
```bash
cd backend
node -e "console.log('MongoDB:', process.env.MONGODB_URI ? '✅ Set' : '❌ Missing'); console.log('JWT Secret:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');"
```

### Check Frontend Environment
```bash
cd frontend
npm start
# Check browser console for API URL
```

---

## Common Issues

**"Cannot connect to MongoDB"**
- Check MONGODB_URI format
- Verify IP whitelist (0.0.0.0/0)
- Check username/password

**"CORS error"**
- Verify FRONTEND_URL in backend
- Check REACT_APP_API_URL in frontend
- Ensure URLs match exactly

**"Invalid token"**
- Check JWT_SECRET is set
- Ensure same secret in all backend instances
- Clear browser localStorage

**"Maps not loading"**
- Verify REACT_APP_GOOGLE_MAPS_API_KEY
- Check API is enabled in Google Cloud
- Check API key restrictions
