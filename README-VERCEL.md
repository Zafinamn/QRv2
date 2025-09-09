# Deploy QR Generator to Vercel

This QR Generator app is now ready to deploy on Vercel! Here's how to do it:

## Quick Deploy Steps

1. **Push to GitHub**
   - Create a new repository on GitHub
   - Push this code to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial QR Generator commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your QR Generator repository
   - Vercel will automatically detect the settings from `vercel.json`
   - Click "Deploy"

## What's Configured

- ✅ `vercel.json` configured for static deployment
- ✅ Build command: `vite build`
- ✅ Output directory: `dist/public`
- ✅ Frontend-only QR generator (no server needed)
- ✅ All QR generation happens client-side using the `qrcode` library

## Features That Work on Vercel

- Real-time QR code generation
- Transparent background option
- Multiple sizes and error correction levels
- PNG download functionality
- Responsive design
- Links to other QR generators

## Live Demo

Once deployed, your QR generator will be available at:
`https://YOUR_PROJECT_NAME.vercel.app`

The app is completely static and doesn't require any server-side functionality, making it perfect for Vercel's edge network.