# Azure Deployment Quick Start Guide

Get your BJJ Game Mapper live on Azure in under 10 minutes! ⚡

## TL;DR - Fastest Path to Deployment

1. **Sign up for Azure** (if you don't have an account)
   - Go to [azure.microsoft.com/free](https://azure.microsoft.com/free/)
   - Get $200 free credit + free services for 12 months

2. **Create Azure Static Web App** (via Azure Portal)
   - Search for "Static Web App" → Click "Create"
   - Connect your GitHub repository
   - Azure does the rest automatically!

3. **Wait 2-5 minutes**
   - Azure creates your app
   - GitHub Actions builds and deploys
   - You get a public URL!

4. **Done!** 🎉
   - Share the URL with your beta users
   - Every git push auto-deploys

---

## Step-by-Step (10 Minutes)

### Step 1: Azure Portal (3 minutes)

1. Go to [portal.azure.com](https://portal.azure.com)
2. Click **"Create a resource"**
3. Search **"Static Web App"**
4. Fill in:
   - **Name**: `bjj-game-mapper`
   - **Plan**: **Free**
   - **Repository**: Connect GitHub, select `bjj-game-mapper`
   - **Branch**: `main`
   - **Build Preset**: **React**
   - **App location**: `/`
   - **Output location**: `dist`
5. Click **"Review + Create"** → **"Create"**

### Step 2: Wait for Deployment (5 minutes)

Azure automatically:
- ✅ Creates the Static Web App
- ✅ Adds GitHub Actions workflow
- ✅ Builds your app
- ✅ Deploys to global CDN

Watch progress in:
- Azure Portal: See resource creation
- GitHub Actions: Watch the build

### Step 3: Get Your URL (1 minute)

1. In Azure Portal, go to your Static Web App
2. Copy the **URL** from Overview
3. Example: `https://bjj-game-mapper.azurestaticapps.net`

### Step 4: Test & Share (1 minute)

1. Click your URL
2. Verify the app loads
3. Share with beta users! 🥋

---

## What You Get (For Free!)

✅ **Public URL** - Accessible worldwide  
✅ **HTTPS/SSL** - Secure by default  
✅ **Global CDN** - Fast for everyone  
✅ **Auto-deploy** - Push to git = live update  
✅ **99.9% Uptime** - Enterprise reliability  
✅ **Staging URLs** - Test PRs before merge  
✅ **Custom Domain** - Optional professional URL  

**Cost**: $0/month for 5-100+ users

---

## Troubleshooting

### GitHub Actions Failed?

1. Go to GitHub → Actions tab
2. Click the failed workflow
3. Common fixes:
   - Ensure `package-lock.json` is committed
   - Check Node version (should be 18+)
   - Run `npm run build` locally to test

### App Not Loading?

1. Check Azure Portal → Static Web App → Overview
2. Verify deployment status is "Ready"
3. Check browser console for errors
4. Verify output location is `dist` in workflow

### Need Help?

- 📖 Full Guide: See `docs/AZURE_DEPLOYMENT_GUIDE.md`
- 🏗️ Architecture: See `docs/AZURE_ARCHITECTURE.md`
- 💰 Costs: See `docs/AZURE_COST_ESTIMATION.md`

---

## Next Steps

After deployment:

1. **Test thoroughly** - Try all features
2. **Add custom domain** (optional) - See full deployment guide
3. **Share with users** - Get feedback
4. **Monitor usage** - Check Azure Portal metrics
5. **Keep deploying** - Every push goes live automatically!

---

## Advanced Options

### Want to Use Azure CLI Instead?

```bash
# Login to Azure
az login

# Create resource group
az group create --name bjj-game-mapper-rg --location eastus

# Create Static Web App (will prompt for GitHub auth)
az staticwebapp create \
  --name bjj-game-mapper \
  --resource-group bjj-game-mapper-rg \
  --source https://github.com/chadtoney/bjj-game-mapper \
  --location eastus \
  --branch main \
  --app-location "/" \
  --output-location "dist" \
  --login-with-github
```

### Want to Add a Custom Domain?

See the **Custom Domain** section in `docs/AZURE_DEPLOYMENT_GUIDE.md`

### Want to Monitor Costs?

1. Azure Portal → Cost Management + Billing
2. Create budget alert for $500/month
3. Current cost: $0/month (Free Tier)

---

## Architecture Summary

```
GitHub (code) 
    ↓ (push to main)
GitHub Actions (build) 
    ↓ (deploy)
Azure Static Web Apps (host)
    ↓ (HTTPS + CDN)
Global Users (access via URL)
```

**Simple. Automated. Free.** ✨

---

## Support

- **Azure Docs**: [docs.microsoft.com/azure/static-web-apps](https://docs.microsoft.com/azure/static-web-apps/)
- **GitHub Issues**: Report problems in repository
- **Azure Support**: Available in Azure Portal

---

**Ready to deploy?** Start with Step 1 above! 🚀
