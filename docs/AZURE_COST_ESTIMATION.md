# Azure Cost Estimation for BJJ Game Mapper

## Executive Summary

**Recommended Plan**: Azure Static Web Apps - Free Tier  
**Estimated Monthly Cost**: **$0/month**  
**Budget Available**: $500/month  
**Budget Utilization**: 0% (100% headroom for future growth)

---

## Detailed Cost Breakdown

### Current Architecture (5-10 Beta Users)

#### Primary Service: Azure Static Web Apps (Free Tier)

| Component | Specification | Cost |
|-----------|--------------|------|
| **Hosting Plan** | Free Tier | $0/month |
| **Bandwidth** | 100 GB/month included | $0/month |
| **Storage** | 0.5 GB included | $0/month |
| **SSL Certificate** | Free automatic SSL | $0/month |
| **Custom Domains** | 2 domains included | $0/month |
| **Staging Environments** | 3 preview environments | $0/month |
| **CDN Distribution** | Global CDN included | $0/month |

**Subtotal**: **$0/month**

#### CI/CD: GitHub Actions

| Component | Specification | Cost |
|-----------|--------------|------|
| **Build Minutes** | 2,000 min/month free | $0/month |
| **Storage** | 500 MB free | $0/month |

**Subtotal**: **$0/month**

#### Data Storage: Browser Local Storage

| Component | Specification | Cost |
|-----------|--------------|------|
| **Client-Side Storage** | Browser LocalStorage | $0/month |

**Subtotal**: **$0/month**

---

### **TOTAL MONTHLY COST: $0/month** ✅

---

## Usage Projections

### Current Beta Phase (5-10 Users)

**Assumptions:**
- 10 beta users
- Each user visits 5 times per week
- Each visit loads 2 MB of assets
- 50% cache hit rate after first visit

**Calculations:**

```
Monthly Page Views:
10 users × 5 visits/week × 4 weeks = 200 visits/month

Initial Load:
200 visits × 2 MB = 400 MB

Cached Visits (50% after first visit):
100 visits × 2 MB = 200 MB
100 visits × 0.2 MB (cached) = 20 MB

Total Bandwidth: 400 MB + 20 MB = 420 MB/month
```

**Free Tier Limit**: 100 GB/month  
**Usage**: 0.42 GB/month  
**Utilization**: **0.4%** of free tier ✅

### Build & Deployment

**Assumptions:**
- 20 deployments per month
- Each build takes 2 minutes
- Using GitHub Actions free tier

**Calculations:**

```
Build Minutes:
20 deployments × 2 minutes = 40 minutes/month
```

**Free Tier Limit**: 2,000 minutes/month  
**Usage**: 40 minutes/month  
**Utilization**: **2%** of free tier ✅

---

## Scaling Projections

### Scenario 1: Light Growth (10-50 Users)

**Monthly Cost**: **$0/month** (Free Tier)

| Metric | Usage | Free Tier Limit | Status |
|--------|-------|-----------------|--------|
| Bandwidth | ~2 GB/month | 100 GB/month | ✅ Safe |
| Build Minutes | ~80 min/month | 2,000 min/month | ✅ Safe |

### Scenario 2: Moderate Growth (50-100 Users)

**Monthly Cost**: **$0/month** (Free Tier)

| Metric | Usage | Free Tier Limit | Status |
|--------|-------|-----------------|--------|
| Bandwidth | ~4 GB/month | 100 GB/month | ✅ Safe |
| Build Minutes | ~100 min/month | 2,000 min/month | ✅ Safe |

### Scenario 3: Significant Growth (100-500 Users)

**Monthly Cost**: **$0-9/month**

At this scale, you might consider upgrading to Standard tier for:
- Enhanced features (password protection, advanced routing)
- 99.95% SLA vs 99.9%
- Unlimited bandwidth and storage

| Component | Cost |
|-----------|------|
| Azure Static Web Apps (Standard) | $9/month |
| GitHub Actions (still free) | $0/month |
| **Total** | **$9/month** |

**Budget Utilization**: 1.8% ($9 of $500)

### Scenario 4: Enterprise Scale (500+ Users)

**Monthly Cost**: **$9-50/month**

At this scale, you might add:
- Application Insights for monitoring
- Azure Functions for backend API
- Potential database for cloud sync

| Component | Cost |
|-----------|------|
| Azure Static Web Apps (Standard) | $9/month |
| Application Insights | $0-10/month (1 GB free, then ~$2/GB) |
| Azure Functions (Optional) | $0-20/month (consumption plan) |
| Azure Cosmos DB (Optional) | $0-25/month (free tier + usage) |
| **Total** | **$9-50/month** |

**Budget Utilization**: 10% ($50 of $500)

---

## Cost Optimization Strategies

### Already Optimized (Current Architecture)

✅ **Using Free Tier**: Azure Static Web Apps Free Tier  
✅ **No Database**: Client-side storage only  
✅ **No Backend**: Static SPA, no server costs  
✅ **Free CI/CD**: GitHub Actions free tier  
✅ **Free SSL**: Included certificates  
✅ **Free CDN**: Global distribution included  

### Future Optimization Options

If costs ever become a concern:

1. **Leverage Free Tiers**
   - Azure Functions: 1M executions/month free
   - Cosmos DB: 1,000 RU/s free tier
   - Application Insights: 1 GB data/month free

2. **Resource Tagging**
   - Tag all resources with `project:bjj-game-mapper`
   - Easy cost tracking and management

3. **Budget Alerts**
   - Set budget at $500/month
   - Alert at 50% ($250), 80% ($400), 90% ($450)

4. **Auto-shutdown for Dev**
   - If you add development environments, auto-shutdown when not in use

---

## Cost Comparison with Alternatives

### Azure Static Web Apps (Recommended)

| Feature | Free Tier | Standard Tier |
|---------|-----------|---------------|
| **Cost** | $0/month | $9/month |
| **Bandwidth** | 100 GB/month | Unlimited |
| **Storage** | 0.5 GB | Unlimited |
| **Custom Domains** | 2 | Unlimited |
| **SSL** | ✅ Free | ✅ Free |
| **CDN** | ✅ Global | ✅ Global |
| **SLA** | 99.9% | 99.95% |

### Alternative Hosting Options

| Platform | Cost/Month | Pros | Cons |
|----------|------------|------|------|
| **Azure Static Web Apps** | $0-9 | Free tier, Azure integration, global CDN | Azure-specific |
| **Netlify** | $0-19 | Easy setup, generous free tier | Bandwidth limits on free |
| **Vercel** | $0-20 | Great DX, free for hobby | Commercial use requires Pro |
| **Azure App Service** | $13-55 | Full platform features | Overkill for static site |
| **AWS S3 + CloudFront** | $1-5 | Pay-per-use | More complex setup |
| **GitHub Pages** | $0 | Free, simple | No dynamic features |

**Winner for this use case**: Azure Static Web Apps (Free Tier) ✅

---

## 12-Month Cost Projection

### Conservative Estimate (Staying on Free Tier)

| Month | Users | Bandwidth | Cost |
|-------|-------|-----------|------|
| 1-3 | 5-10 | <1 GB | $0 |
| 4-6 | 10-20 | ~2 GB | $0 |
| 7-9 | 20-30 | ~3 GB | $0 |
| 10-12 | 30-50 | ~4 GB | $0 |

**Year 1 Total**: **$0**

### Growth Scenario (Upgrading to Standard)

| Quarter | Users | Plan | Cost/Month | Quarterly Total |
|---------|-------|------|------------|-----------------|
| Q1 | 5-10 | Free | $0 | $0 |
| Q2 | 10-50 | Free | $0 | $0 |
| Q3 | 50-100 | Standard | $9 | $27 |
| Q4 | 100-200 | Standard | $9 | $27 |

**Year 1 Total**: **$54** (avg $4.50/month)

### Aggressive Growth + Features

| Quarter | Users | Additional Services | Cost/Month | Quarterly Total |
|---------|-------|-------------------|------------|-----------------|
| Q1 | 5-10 | None | $0 | $0 |
| Q2 | 10-50 | App Insights | $5 | $15 |
| Q3 | 50-150 | + Functions | $15 | $45 |
| Q4 | 150-500 | + Cosmos DB | $30 | $90 |

**Year 1 Total**: **$150** (avg $12.50/month)

**All scenarios well within $500/month budget** ✅

---

## ROI Analysis

### Cost per User

**Current (Free Tier)**:
- 5 users: $0/user/month
- 10 users: $0/user/month
- 50 users: $0/user/month
- 100 users: $0/user/month

**If Upgraded to Standard**:
- 100 users: $0.09/user/month
- 500 users: $0.02/user/month

### Value Delivered

For **$0-9/month**, you get:
- ✅ Professional hosting infrastructure
- ✅ Global CDN with <100ms latency
- ✅ 99.9%+ uptime SLA
- ✅ Free SSL certificates
- ✅ Automatic deployments
- ✅ Staging environments
- ✅ Custom domain support
- ✅ DDoS protection
- ✅ Scalability to thousands of users

**Equivalent AWS/GCP cost**: $50-100/month
**Equivalent managed hosting**: $20-50/month
**Azure Static Web Apps**: $0-9/month ✅

---

## Budget Allocation Recommendation

Given $500/month budget:

### Current Phase (Beta)

```
Infrastructure:         $0/month  (0%)
Development Reserve:    $0/month  (0%)
Monitoring:            $0/month  (0%)
Reserve for Growth:    $500/month (100%)
────────────────────────────────────
Total Allocated:       $0/month
Budget Remaining:      $500/month ✅
```

### Future Allocation (If Scaling)

```
Infrastructure:         $9/month   (2%)
App Insights:          $10/month   (2%)
Azure Functions:       $20/month   (4%)
Cosmos DB:             $25/month   (5%)
Reserve/Contingency:   $436/month  (87%)
────────────────────────────────────
Total Allocated:       $64/month
Budget Remaining:      $436/month ✅
```

**Recommendation**: Start with Free Tier, monitor growth, scale as needed.

---

## Cost Monitoring Setup

### Azure Cost Management

**Set up in Azure Portal:**

1. **Budget Alert at $10/month**
   - Email notification at 80% ($8)
   - Prevents unexpected costs

2. **Budget Alert at $100/month**
   - Email notification at 50% ($50)
   - Early warning for scaling

3. **Budget Alert at $500/month**
   - Email notification at 80% ($400)
   - Critical threshold

### Monitoring Tools

**Free Tools Included:**
- Azure Portal Cost Analysis
- GitHub Actions usage tracking
- Resource utilization metrics

**Recommended Reviews:**
- Weekly: Check GitHub Actions usage
- Monthly: Review Azure Portal metrics
- Quarterly: Analyze growth trends

---

## Summary

### Current State (Beta Phase)

| Metric | Value |
|--------|-------|
| **Monthly Cost** | $0 |
| **Budget Used** | 0% |
| **Budget Available** | $500 (100%) |
| **Users Supported** | 5-10 (up to 100+) |
| **Bandwidth Available** | 100 GB/month |
| **Current Usage** | <1 GB/month |

### Scaling Capacity

With $500/month budget, you can support:
- **Free Tier**: 5-100+ users ($0/month)
- **Standard Tier**: 100-1,000 users ($9/month)
- **With Backend**: 1,000-10,000+ users ($50-200/month)
- **Enterprise**: 10,000+ users ($200-500/month)

### Recommendations

1. ✅ **Start with Free Tier** - Perfect for beta testing
2. ✅ **Monitor usage monthly** - Set up cost alerts
3. ✅ **Scale when needed** - Upgrade to Standard at 100+ users
4. ✅ **Add features incrementally** - Only add services when necessary
5. ✅ **Keep 50%+ budget reserve** - For unexpected growth

### Final Cost Estimate

**Year 1 Total Cost**: **$0-100**  
**Budget Compliance**: **100% within budget** ✅  
**Recommended Starting Cost**: **$0/month** (Free Tier)

---

**Last Updated**: 2026-02-08  
**Valid For**: BJJ Game Mapper - Azure Static Web Apps Deployment
