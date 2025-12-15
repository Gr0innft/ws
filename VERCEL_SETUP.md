# Vercel Deployment Setup Guide

## Step 1: Configure Build Settings in Vercel Dashboard

When you import your repo in Vercel, make sure these settings are configured:

### Build & Development Settings:
- **Framework Preset**: Other
- **Build Command**: `composer install --no-dev --optimize-autoloader && npm ci && npm run build`
- **Output Directory**: `public`
- **Install Command**: `composer install --no-dev --optimize-autoloader && npm ci`

## Step 2: Add Environment Variables

Go to your project settings → Environment Variables and add:

### Required Variables:
```
APP_KEY=base64:YOUR_APP_KEY_HERE
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-project.vercel.app
```

### How to get APP_KEY:
Run this locally in your project:
```bash
php artisan key:generate
```
Then copy the `APP_KEY` value from your `.env` file.

### Optional (if using database):
```
DB_CONNECTION=sqlite
# or configure your database credentials
```

## Step 3: Important Notes

⚠️ **Vercel Limitations for Laravel/Statamic:**

1. **File Storage**: Vercel's file system is read-only. If your Statamic site needs to write files (uploads, cache, etc.), you'll need to:
   - Use external storage (S3, etc.)
   - Or use a different hosting platform

2. **PHP Runtime**: Vercel uses serverless PHP functions, which may have limitations with Laravel's full feature set.

3. **Content Files**: Your Statamic content files in `/content` should be fine since they're in your repo.

## Step 4: Deploy

After setting up environment variables, trigger a new deployment. The build should complete and your site should be accessible.

## Troubleshooting

If deployment still fails:
1. Check the build logs in Vercel dashboard
2. Make sure `APP_KEY` is set correctly
3. Verify all environment variables are added
4. Check that `composer.json` and `package.json` are in the root directory

## Alternative: If Vercel Doesn't Work Well

Consider these free alternatives that work better with PHP:
- **Render.com** - Free tier, better PHP support
- **Fly.io** - Free tier, great for Laravel
- **DigitalOcean App Platform** - Free trial
