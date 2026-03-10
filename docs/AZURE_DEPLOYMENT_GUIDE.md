# Azure Deployment Guide for BJJ Game Mapper

This guide provides step-by-step instructions to deploy the BJJ Game Mapper application to Azure Static Web Apps.

## Prerequisites

Before you begin, ensure you have:

1. ✅ **Azure Account** - [Create free account](https://azure.microsoft.com/free/) (includes $200 free credit)
2. ✅ **GitHub Account** - Repository access to bjj-game-mapper
3. ✅ **Azure CLI** (Optional) - [Install Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli)

## Deployment Method 1: Azure Portal (Recommended for Beginners)

### Step 1: Create Azure Static Web App

1. **Sign in to Azure Portal**
   - Navigate to [https://portal.azure.com](https://portal.azure.com)
   - Sign in with your Azure account

2. **Create Resource**
   - Click **"Create a resource"** in the left sidebar
   - Search for **"Static Web App"**
   - Click **"Create"**

3. **Configure Basic Settings**

   **Project Details:**
   - **Subscription**: Select your subscription
   - **Resource Group**: Create new → `bjj-game-mapper-rg`
   - **Region**: Choose closest to your users (e.g., `East US`, `West Europe`)

   **Static Web App Details:**
   - **Name**: `bjj-game-mapper` (or your preferred name)
   - **Plan Type**: Select **Free** for beta testing
   - **Region for Azure Functions**: Choose same as above

4. **Configure Deployment**

   **GitHub Account:**
   - Click **"Sign in with GitHub"**
   - Authorize Azure Static Web Apps
   - **Organization**: Select your GitHub username/org
   - **Repository**: Select `bjj-game-mapper`
   - **Branch**: Select `main` (or your default branch)

   **Build Details:**
   - **Build Presets**: Select **"React"**
   - **App location**: `/` (root of repository)
   - **Api location**: *(leave empty)*
   - **Output location**: `dist`

5. **Review + Create**
   - Click **"Review + create"**
   - Review all settings
   - Click **"Create"**

6. **Wait for Deployment**
   - Azure will:
     - Create the Static Web App resource
     - Add a GitHub Actions workflow to your repository
     - Trigger the first deployment
   - This process takes 2-5 minutes

### Step 2: Verify Deployment

1. **Check GitHub Actions**
   - Go to your GitHub repository
   - Click **"Actions"** tab
   - You should see a workflow running: "Azure Static Web Apps CI/CD"
   - Wait for the green checkmark (build takes ~2-3 minutes)

2. **Get Your Public URL**
   - Return to Azure Portal
   - Navigate to your Static Web App resource
   - Find the **URL** in the Overview page
   - Example: `https://bjj-game-mapper.azurestaticapps.net`
   - Click the URL to view your deployed app! 🎉

### Step 3: Configure Custom Domain (Optional)

If you have a custom domain:

1. **In Azure Portal**
   - Navigate to your Static Web App
   - Click **"Custom domains"** in left menu
   - Click **"+ Add"**
   - Select domain type: **"Custom domain on other DNS"**

2. **Add DNS Records**
   - In your domain provider (GoDaddy, Namecheap, etc.):
   - Add a **CNAME** record:
     ```
     Type: CNAME
     Name: bjj-mapper (or @ for root domain)
     Value: <your-app>.azurestaticapps.net
     TTL: 3600
     ```

3. **Validate Domain**
   - Back in Azure Portal, enter your domain name
   - Click **"Validate"**
   - Azure will verify DNS configuration
   - Click **"Add"**
   - SSL certificate will be provisioned automatically (5-10 minutes)

## Deployment Method 2: Azure CLI (For Developers)

### Step 1: Install and Login

```bash
# Install Azure CLI (if not already installed)
# macOS
brew install azure-cli

# Windows
# Download from: https://aka.ms/installazurecliwindows

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login to Azure
az login

# Set your subscription (if you have multiple)
az account list --output table
az account set --subscription "Your Subscription Name"
```

### Step 2: Create Static Web App

```bash
# Create resource group
az group create \
  --name bjj-game-mapper-rg \
  --location eastus

# Create Static Web App with GitHub integration
az staticwebapp create \
  --name bjj-game-mapper \
  --resource-group bjj-game-mapper-rg \
  --source https://github.com/chadtoney/bjj-game-mapper \
  --location eastus \
  --branch main \
  --app-location "/" \
  --output-location "dist" \
  --login-with-github

# Get the deployment token (save this securely)
az staticwebapp secrets list \
  --name bjj-game-mapper \
  --resource-group bjj-game-mapper-rg \
  --query "properties.apiKey" \
  --output tsv
```

### Step 3: Get App URL

```bash
# Get the URL of your deployed app
az staticwebapp show \
  --name bjj-game-mapper \
  --resource-group bjj-game-mapper-rg \
  --query "defaultHostname" \
  --output tsv
```

## Deployment Method 3: Manual GitHub Actions Setup

If you want more control over the GitHub Actions workflow:

### Step 1: Get Deployment Token

1. Create Static Web App in Azure Portal (steps above)
2. Navigate to **"Manage deployment token"**
3. Copy the deployment token

### Step 2: Add GitHub Secret

1. In GitHub repository, go to **Settings** → **Secrets and variables** → **Actions**
2. Click **"New repository secret"**
3. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
4. Value: Paste the deployment token
5. Click **"Add secret"**

### Step 3: Use Provided Workflow

The workflow file `.github/workflows/azure-static-web-apps.yml` is already included in this repository. It will:
- Trigger on push to main branch
- Build the React app with Vite
- Deploy to Azure Static Web Apps

## Post-Deployment Configuration

### Environment Variables (If Needed in Future)

To add environment variables:

1. **In Azure Portal**:
   - Navigate to your Static Web App
   - Click **"Configuration"** in left menu
   - Click **"+ Add"**
   - Add your variables (prefix with `VITE_` for Vite)

2. **In Code**:
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

### Staging Environments

Azure Static Web Apps automatically creates staging environments for pull requests:

1. Create a pull request in GitHub
2. Wait for GitHub Actions to build
3. A preview URL will be added as a comment on the PR
4. Test your changes before merging!

### Rolling Back a Deployment

If something goes wrong:

1. **Via GitHub**:
   - Find the last working commit
   - Revert to that commit or create a new commit
   - Push to trigger redeployment

2. **Via Azure Portal**:
   - Navigate to Static Web App
   - Click **"Environments"**
   - You can manage environments here

## Monitoring Your Deployment

### Check Application Status

1. **Azure Portal**:
   - Navigate to your Static Web App
   - View **"Overview"** for metrics:
     - Request count
     - Data transfer
     - Build status

2. **GitHub Actions**:
   - Check **"Actions"** tab for build history
   - View logs for any build failures

### View Logs

```bash
# Using Azure CLI
az staticwebapp show \
  --name bjj-game-mapper \
  --resource-group bjj-game-mapper-rg

# View environment details
az staticwebapp environment list \
  --name bjj-game-mapper \
  --resource-group bjj-game-mapper-rg
```

## Updating Your Application

Every time you push to the `main` branch:
1. GitHub Actions automatically triggers
2. Application builds with `npm run build`
3. Deploys to Azure Static Web Apps
4. Live in 2-3 minutes

No manual deployment needed! ✨

## Troubleshooting

### Build Fails in GitHub Actions

**Check:**
1. View the Actions log in GitHub
2. Common issues:
   - Node version mismatch → Check workflow uses Node 18+
   - Missing dependencies → Ensure `package-lock.json` is committed
   - TypeScript errors → Run `npm run build` locally first

**Fix:**
```bash
# Test build locally
npm install
npm run build

# If successful, commit any changes
git add .
git commit -m "Fix build issues"
git push
```

### App Not Loading After Deployment

**Check:**
1. Verify build output location is `dist` in Azure configuration
2. Check that `index.html` exists in the `dist` folder
3. View browser console for errors
4. Check Azure Portal for deployment status

### 404 on Routes (If Using React Router in Future)

Add to `staticwebapp.config.json`:
```json
{
  "navigationFallback": {
    "rewrite": "/index.html"
  }
}
```

## Cost Monitoring

### View Your Costs

1. **Azure Portal**:
   - Navigate to **"Cost Management + Billing"**
   - Click **"Cost analysis"**
   - Filter by resource group: `bjj-game-mapper-rg`

2. **Set Budget Alerts**:
   - Click **"Budgets"**
   - Create budget: $500/month
   - Set alert at 80% ($400)

### Expected Costs

For 5-10 users:
- **Static Web App (Free Tier)**: $0/month
- **GitHub Actions**: $0/month (2,000 free minutes)
- **Bandwidth**: $0/month (under 100 GB free tier)

**Total**: **$0/month** ✅

## Cleanup (If Needed)

To delete all resources and stop any charges:

```bash
# Delete resource group (removes all resources)
az group delete \
  --name bjj-game-mapper-rg \
  --yes \
  --no-wait
```

Or via Azure Portal:
1. Navigate to Resource Groups
2. Select `bjj-game-mapper-rg`
3. Click **"Delete resource group"**
4. Confirm deletion

## Next Steps

After successful deployment:

1. ✅ **Share the URL** with your 5-10 beta users
2. ✅ **Monitor usage** in Azure Portal
3. ✅ **Collect feedback** from users
4. ✅ **Iterate** - Every git push auto-deploys!
5. ✅ **Consider custom domain** for professional look

## Getting Help

- **Azure Documentation**: [Azure Static Web Apps Docs](https://docs.microsoft.com/azure/static-web-apps/)
- **GitHub Issues**: Report issues in the repository
- **Azure Support**: Available in Azure Portal (subscription-based)

## Summary

Your BJJ Game Mapper is now:
- 🌐 **Publicly accessible** via Azure URL
- 🔒 **Secure** with free SSL certificate
- 🚀 **Auto-deploying** on every git push
- 📊 **Monitored** via Azure Portal
- 💰 **Free** on Azure Free Tier
- 🌍 **Globally distributed** via CDN

**Deployment Time**: ~10 minutes for initial setup, ~2 minutes for subsequent updates

**Public URL**: `https://bjj-game-mapper.azurestaticapps.net` (or your custom domain)

**You're ready to share with beta users!** 🥋🎉
