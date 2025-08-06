# Vercel Environment Variables for PLP Frontend

## Required Environment Variables

### 1. API Base URL
```
NEXT_PUBLIC_API_URL=http://157.10.73.52:8085/api/v1
```
or if you have HTTPS:
```
NEXT_PUBLIC_API_URL=https://your-domain.com/api/v1
```

### 2. API Endpoints (if needed separately)
```
NEXT_PUBLIC_API_BASE_URL=http://157.10.73.52:8085
NEXT_PUBLIC_API_VERSION=v1
```

### 3. Authentication (if using JWT)
```
NEXT_PUBLIC_AUTH_URL=http://157.10.73.52:8085/api/v1/auth
```

### 4. File Upload URL (if handling uploads)
```
NEXT_PUBLIC_UPLOAD_URL=http://157.10.73.52:8085/api/v1/upload
```

### 5. WebSocket URL (if using real-time features)
```
NEXT_PUBLIC_WS_URL=ws://157.10.73.52:8085
```

## Additional Variables (Based on your backend features)

### If using different services:
```
NEXT_PUBLIC_ATTENDANCE_API=http://157.10.73.52:8085/api/v1/attendance
NEXT_PUBLIC_USERS_API=http://157.10.73.52:8085/api/v1/users
NEXT_PUBLIC_SUBJECTS_API=http://157.10.73.52:8085/api/v1/subjects
NEXT_PUBLIC_LESSONS_API=http://157.10.73.52:8085/api/v1/lessons
```

### For development/production environments:
```
NEXT_PUBLIC_ENV=production
NEXT_PUBLIC_DEBUG=false
```

### If using external services:
```
NEXT_PUBLIC_GEMINI_ENABLED=true
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your-google-maps-key
```

## How to Add to Vercel

1. Go to your Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable for Production, Preview, and Development environments

## Important Notes:

1. **NEXT_PUBLIC_ prefix**: In Next.js, environment variables that need to be accessible in the browser must start with `NEXT_PUBLIC_`

2. **CORS Configuration**: Make sure your backend allows requests from your Vercel domain:
   - Production: `https://your-app.vercel.app`
   - Preview: `https://your-app-*.vercel.app`
   - Development: `http://localhost:3000`

3. **HTTPS Consideration**: If your Vercel app uses HTTPS (which it does by default), and your backend is HTTP, you might face mixed content issues. Consider:
   - Using a reverse proxy
   - Getting an SSL certificate for your backend
   - Using Cloudflare as a proxy

## Example for Next.js app:

In your frontend code, use:
```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8085/api/v1';

// Example API call
const response = await fetch(`${API_URL}/health`);
```

## Security Considerations:

1. Never expose sensitive keys (like JWT secrets) in NEXT_PUBLIC_ variables
2. Use different API URLs for development and production
3. Implement proper CORS policies on your backend
4. Consider using environment-specific variables in Vercel