# Free Staging Deployment Guide

## Option 1: Railway (Recommended - Easiest) 🚀

Railway auto-detects Laravel/Statamic and handles everything automatically.

### Steps:
1. Go to [railway.app](https://railway.app) and sign up (free tier available)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect Laravel and start building
5. Add environment variables in Railway dashboard:
   - `APP_KEY` (run `php artisan key:generate` locally and copy the key)
   - `APP_ENV=production`
   - `APP_DEBUG=false`
   - `APP_URL` (Railway will provide this after first deploy)
6. Deploy! Railway handles PHP, Composer, and npm automatically

**That's it!** Railway will give you a URL like `your-app.railway.app`

---

## Option 2: Render (Also Free) 🎨

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repo
4. Settings:
   - **Build Command**: `composer install --no-dev --optimize-autoloader && npm ci && npm run build`
   - **Start Command**: `php artisan serve --host=0.0.0.0 --port=$PORT`
   - **Environment**: PHP
5. Add environment variables (same as Railway)
6. Deploy!

---

## Option 3: Fix Vercel (If you want to stick with it)

The `vercel.json` has been updated. You'll also need to:

1. In Vercel dashboard, add these environment variables:
   - `APP_KEY` (generate with `php artisan key:generate`)
   - `APP_ENV=production`
   - `APP_DEBUG=false`

2. **Important**: Vercel has limitations with Laravel/Statamic:
   - File storage won't persist (use S3 or similar)
   - Some Laravel features may not work
   - Consider this a temporary solution

---

## Quick Setup Commands

Before deploying anywhere, make sure you have:

```bash
# Generate app key (if not already done)
php artisan key:generate

# Copy .env.example to .env (if deploying fresh)
cp .env.example .env

# The key will be in your .env file - copy it to your hosting platform
```

---

## Recommended: Railway

Railway is the easiest and most reliable for Laravel/Statamic. It's free for small projects and handles everything automatically.
