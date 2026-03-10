# Azure Deployment - Frequently Asked Questions (FAQ)

## General Questions

### Q: What is Azure Static Web Apps?

**A:** Azure Static Web Apps is a hosting service from Microsoft specifically designed for modern web applications (like React, Vue, Angular). It provides:
- Free hosting for static content
- Built-in global CDN for fast delivery
- Free SSL certificates
- Automatic deployment from GitHub
- Staging environments for testing

Perfect for apps like BJJ Game Mapper that don't need a backend server.

---

### Q: Why Azure instead of other hosting platforms?

**A:** For this project, Azure Static Web Apps offers:
- ✅ **Free tier** that meets all requirements (0-100+ users)
- ✅ **Generous bandwidth** (100 GB/month free)
- ✅ **Global CDN** included
- ✅ **GitHub integration** (auto-deploy on push)
- ✅ **Enterprise-grade** infrastructure
- ✅ **Easy scaling** path as users grow
- ✅ **Within budget** (uses $0 of $500/month)

Other platforms like Netlify or Vercel are also good, but Azure provides excellent value and is well-documented.

---

### Q: How much will this really cost?

**A:** For 5-10 beta users: **$0/month** (Free Tier covers everything)

Breakdown:
- Azure Static Web Apps: $0 (Free Tier)
- GitHub Actions: $0 (2,000 free minutes/month)
- SSL Certificate: $0 (Included)
- CDN: $0 (Included)
- Bandwidth: $0 (Well under 100 GB limit)

Even scaling to 100+ users typically stays at $0/month. You'd only pay ($9/month) if you need premium features like password protection or exceed the free tier limits.

---

## Deployment Questions

### Q: How long does initial deployment take?

**A:** 
- **Your time**: ~10 minutes (following the quick start guide)
- **Azure setup**: ~2-3 minutes (automatic)
- **First build & deploy**: ~2-5 minutes (automatic)
- **Total**: Under 15 minutes from start to live URL

---

### Q: Do I need to know Azure to deploy this?

**A:** No! The deployment guide walks you through every step with screenshots and explanations. You'll:
1. Click a few buttons in Azure Portal
2. Connect your GitHub account
3. Wait for automatic deployment
4. Get your public URL

No Azure expertise required. If you can create a GitHub account, you can deploy this.

---

### Q: What if I mess something up during deployment?

**A:** It's very difficult to break anything:
- Azure deployments are isolated (won't affect other services)
- You can delete and recreate the Static Web App anytime
- GitHub Actions are automatically configured
- Free tier means no unexpected charges
- You can always start over in minutes

---

### Q: Can I deploy from my forked repository?

**A:** Yes! The process is identical:
1. Fork the bjj-game-mapper repository to your account
2. Follow the deployment guide
3. Point Azure to your forked repository
4. Everything else works the same

---

### Q: How do I deploy updates after the initial deployment?

**A:** It's completely automatic:
1. Make changes to your code locally
2. `git push` to the main branch
3. GitHub Actions automatically builds and deploys
4. Live in 2-3 minutes

No manual deployment steps needed!

---

## Technical Questions

### Q: Does this support custom domains?

**A:** Yes! Azure Static Web Apps Free Tier includes:
- Up to 2 custom domains
- Free SSL certificates for custom domains
- Automatic certificate renewal

Example: `https://bjj-mapper.yourdomain.com`

See the deployment guide for custom domain setup instructions.

---

### Q: What about HTTPS/SSL certificates?

**A:** Fully automated and free:
- SSL certificate automatically created
- Valid, trusted certificate (not self-signed)
- Auto-renewal (never expires)
- Works for default Azure URL and custom domains
- Enforces HTTPS (redirects HTTP → HTTPS)

---

### Q: Will this work with React Router or other client-side routing?

**A:** Yes! The included `staticwebapp.config.json` handles this:
- All routes fallback to `index.html`
- Client-side routing works perfectly
- 404 pages properly handled
- No extra configuration needed

---

### Q: Can users still access the app if GitHub is down?

**A:** Yes! Once deployed:
- App is hosted on Azure (independent of GitHub)
- Users access via Azure URL
- GitHub only needed for deployments
- App stays live even if GitHub is unavailable

---

### Q: What happens to data if Azure goes down?

**A:** Data is safe:
- All user data stored in **browser local storage** (on user's device)
- Users can export data as JSON (backup)
- If Azure goes down, users still have their local data
- When Azure comes back up, everything works normally

Azure has 99.9% uptime SLA, so outages are rare and brief.

---

## Scaling Questions

### Q: What if we get more than 10 beta users?

**A:** No problem! The Free Tier supports:
- Up to 100+ users without any changes
- 100 GB bandwidth/month (plenty for hundreds of users)
- If you exceed limits, you can upgrade to Standard ($9/month)

Current architecture easily handles:
- 10 users: $0/month ✅
- 50 users: $0/month ✅
- 100 users: $0/month ✅
- 500 users: $9/month ✅

---

### Q: How do we scale if the app becomes popular?

**A:** Multiple scaling paths:

**Horizontal Scaling** (more users, same features):
- Free Tier → Standard Tier ($9/month)
- Handles 1,000+ users easily

**Vertical Scaling** (more features):
- Add Azure Functions for backend API
- Add Cosmos DB for cloud sync
- Add Blob Storage for file uploads

**Future Costs at Scale**:
- 1,000 users: $9-20/month
- 10,000 users: $50-100/month
- 100,000 users: $200-400/month

All within $500/month budget with room to grow.

---

### Q: Can we add user authentication later?

**A:** Yes! Azure Static Web Apps includes:
- Built-in authentication providers (GitHub, Google, Microsoft, etc.)
- Can be added without code changes
- No additional cost
- See Azure docs for enabling auth

Or you could add:
- Azure AD B2C for full user management
- Custom auth with Azure Functions
- Third-party auth (Auth0, etc.)

---

## Data & Privacy Questions

### Q: Where is user data stored?

**A:** Currently: **Browser Local Storage** only
- Data stays on user's device
- Not stored on any server
- Users own their data
- Privacy-friendly (no tracking)

Future options:
- Cloud sync via Azure Cosmos DB
- Still user-controlled with export/import

---

### Q: Is user data backed up?

**A:** Currently: **User-controlled backups**
- Users can export data as JSON
- Can re-import on any device
- Recommended: Users should export regularly

Future options:
- Automatic cloud backup
- Multi-device sync
- Version history

---

### Q: Are we GDPR compliant?

**A:** Currently: Very simple compliance
- No data collected by server
- All data local to user's browser
- No cookies (except technical)
- No tracking or analytics

If you add cloud features:
- Azure provides GDPR compliance tools
- Cosmos DB can be configured for GDPR
- You'd need a privacy policy

---

## Monitoring & Maintenance Questions

### Q: How do we monitor if the app is working?

**A:** Multiple monitoring options:

**Included Free**:
- Azure Portal metrics (requests, data transfer, errors)
- GitHub Actions logs (build success/failure)
- Browser DevTools (client-side errors)

**Optional (Free Tier Available)**:
- Application Insights (1 GB/month free)
- User session tracking
- Performance monitoring
- Error tracking

---

### Q: How do we know if we're approaching the free tier limits?

**A:** Set up monitoring:
1. Azure Portal → Cost Management
2. Set budget alerts:
   - Alert at $5 (soft warning)
   - Alert at $10 (approaching limits)
3. Check monthly:
   - Bandwidth usage
   - Build minutes used

For 5-10 users, you'll be well under limits. Monitor becomes important at 50+ users.

---

### Q: What maintenance is required?

**A:** Minimal:

**Regular (Monthly)**:
- Check Azure Portal for any alerts
- Review usage metrics
- Update dependencies (`npm update`)

**As Needed**:
- Respond to GitHub Dependabot security alerts
- Update Node.js version in workflow (annually)
- Review and merge PRs

**Automated**:
- Deployment (every git push)
- SSL renewal (automatic)
- Security patches (via Dependabot)

---

## Troubleshooting Questions

### Q: The GitHub Actions build failed. What do I do?

**A:** 
1. Go to GitHub → Actions tab
2. Click the failed workflow
3. Read the error logs
4. Common issues:
   - **TypeScript error**: Fix code, commit, push
   - **Missing dependency**: Run `npm install`, commit `package-lock.json`
   - **Node version**: Update workflow to use Node 18+

5. Test locally: `npm run build`
6. If local build works, push the fix

See deployment guide troubleshooting section for details.

---

### Q: The app deployed but users see a blank page. Help!

**A:** Check these in order:

1. **Open browser console** (F12)
   - Look for JavaScript errors
   - Fix any errors in code

2. **Check Azure Portal**
   - Verify deployment status is "Ready"
   - Check if build succeeded

3. **Verify build output**
   - Check GitHub Actions logs
   - Ensure `dist` folder was created
   - Verify `index.html` exists in dist

4. **Clear browser cache**
   - Hard refresh (Ctrl+F5 or Cmd+Shift+R)
   - Try incognito mode

Usually it's a build error caught by checking the console.

---

### Q: How do I roll back a bad deployment?

**A:** Two methods:

**Method 1: Git Revert** (Recommended)
```bash
git revert HEAD
git push
```
This creates a new commit that undoes the bad changes.

**Method 2: Redeploy Old Version**
```bash
git reset --soft HEAD~1
git push --force
```
⚠️ Use cautiously, rewrites history.

**Method 3: Via Azure Portal**
- Navigate to Static Web App → Environments
- Can manage different environments
- Might need to trigger rebuild from older commit

---

### Q: Can I test changes before they go live?

**A:** Yes! Multiple ways:

**Option 1: Pull Request Previews** (Recommended)
- Create a PR instead of pushing to main
- GitHub Actions builds a preview
- Get a unique preview URL
- Test thoroughly before merging

**Option 2: Local Testing**
```bash
npm run build
npm run preview
```
Test the production build locally.

**Option 3: Separate Environment**
- Create a second Azure Static Web App
- Point it to a `staging` branch
- Test there before merging to `main`

---

## Cost & Billing Questions

### Q: How can I be sure I won't get unexpected charges?

**A:** Multiple safeguards:

1. **Free Tier Limits**
   - Hard limits (100 GB bandwidth)
   - You'd need to exceed limits to be charged

2. **Budget Alerts**
   - Set up in Azure Portal
   - Email alerts at thresholds
   - Set alert at $5, $10, $50

3. **Cost Monitoring**
   - Check Azure Portal monthly
   - Cost analysis shows trends
   - See exact resource usage

4. **Conservative Architecture**
   - Using only free services
   - No auto-scaling costs
   - Predictable usage patterns

For 5-10 users, unexpected charges are nearly impossible.

---

### Q: What if we exceed the free tier bandwidth?

**A:** Two options:

**Option 1: Optimize**
- Enable better caching
- Optimize image sizes
- Reduce bundle size

**Option 2: Upgrade to Standard**
- $9/month
- Unlimited bandwidth
- Better performance
- Still well under budget

For reference: 100 GB supports ~50,000 page loads (2 MB bundle). You'd need significant traffic to exceed this.

---

### Q: Can we get enterprise support without enterprise costs?

**A:** Yes, several free support options:

**Free Support**:
- Azure documentation (excellent)
- Community forums
- Stack Overflow (Azure tag)
- GitHub issues (for this repo)

**Included Support**:
- Billing support (free)
- Subscription management (free)
- Basic Azure Portal support

**Paid Support** (if needed):
- Developer Support: $29/month
- Standard Support: $100/month
- Professional Direct: $1,000/month

For this project, free support should be sufficient.

---

## Future Planning Questions

### Q: What if we want to add new features later?

**A:** The architecture is designed for easy expansion:

**Can Add Without Breaking Changes**:
- Azure Functions (serverless API)
- Cosmos DB (cloud database)
- Blob Storage (file uploads)
- Application Insights (analytics)
- Azure AD B2C (user authentication)

All can be added incrementally without redeploying the app.

---

### Q: Can we move to a different cloud provider later?

**A:** Yes! The app is not locked to Azure:

**Portable Parts**:
- ✅ React app (works anywhere)
- ✅ GitHub repository (your code)
- ✅ User data (local storage, JSON exports)

**Azure-Specific Parts**:
- GitHub Actions workflow (easy to adapt)
- Azure configuration (can be replaced)

Migration to Netlify, Vercel, or AWS would take 1-2 hours.

---

### Q: What's the long-term roadmap for scaling?

**A:** Suggested phases:

**Phase 1: Beta (Current)**
- 5-10 users
- Free Tier
- $0/month

**Phase 2: Early Adoption**
- 10-100 users
- Free Tier
- $0/month
- Add Application Insights

**Phase 3: Growth**
- 100-1,000 users
- Standard Tier
- $9/month
- Add user authentication

**Phase 4: Scale**
- 1,000+ users
- Standard + Backend
- $50-100/month
- Add cloud sync, API, database

**Phase 5: Enterprise**
- 10,000+ users
- Full stack
- $200-400/month
- Advanced features, analytics

All phases remain within $500/month budget.

---

## Getting Help

### Q: Where can I get more help?

**Documentation**:
- 📖 Quick Start: `docs/AZURE_QUICK_START.md`
- 📖 Deployment Guide: `docs/AZURE_DEPLOYMENT_GUIDE.md`
- 📖 Architecture: `docs/AZURE_ARCHITECTURE.md`
- 📖 Costs: `docs/AZURE_COST_ESTIMATION.md`

**Official Resources**:
- Azure Static Web Apps Docs: https://docs.microsoft.com/azure/static-web-apps/
- GitHub Actions Docs: https://docs.github.com/actions
- Vite Docs: https://vitejs.dev

**Community**:
- Stack Overflow (tag: azure-static-web-apps)
- Azure Community Forums
- GitHub Issues (this repository)

**Support**:
- Azure Support Portal (billing help free)
- Consider Developer Support ($29/month) if needed

---

### Q: What if this FAQ doesn't answer my question?

**A:** 
1. Check the other documentation files in `/docs`
2. Search Azure Static Web Apps documentation
3. Ask in Azure community forums
4. Open a GitHub issue in this repository
5. Contact Azure support (billing questions free)

We're here to help! 🥋

---

**Last Updated**: 2026-02-08  
**Version**: 1.0
