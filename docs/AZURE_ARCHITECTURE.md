# Azure Architecture for BJJ Game Mapper

## Overview

This document outlines the Azure architecture and deployment strategy for the BJJ Game Mapper application, designed to support 5-10 beta users within a $500/month budget.

## Application Analysis

**Application Type**: Single Page Application (SPA)  
**Framework**: React 19 with TypeScript  
**Build Tool**: Vite  
**State Management**: Zustand  
**Data Storage**: Browser Local Storage (client-side)  
**Backend Requirements**: None  

## Recommended Azure Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Azure Static Web Apps                   │
│                                                             │
│  ┌───────────────────────────────────────────────────┐    │
│  │           Global CDN Distribution                 │    │
│  │  (Automatic with Azure Static Web Apps)           │    │
│  └───────────────────────────────────────────────────┘    │
│                                                             │
│  ┌───────────────────────────────────────────────────┐    │
│  │          Static Content Hosting                   │    │
│  │  - HTML, CSS, JavaScript                          │    │
│  │  - React Application Bundle                       │    │
│  └───────────────────────────────────────────────────┘    │
│                                                             │
│  ┌───────────────────────────────────────────────────┐    │
│  │         Built-in SSL/TLS Certificate              │    │
│  │  (Free custom domain SSL)                         │    │
│  └───────────────────────────────────────────────────┘    │
│                                                             │
│  ┌───────────────────────────────────────────────────┐    │
│  │        GitHub Actions Integration                 │    │
│  │  (Automatic CI/CD)                                │    │
│  └───────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS
                            ▼
                   ┌──────────────────┐
                   │   End Users      │
                   │  (5-10 users)    │
                   └──────────────────┘
                            │
                            │ Data Storage
                            ▼
                   ┌──────────────────┐
                   │  Browser Local   │
                   │    Storage       │
                   └──────────────────┘
```

### Architecture Components

#### 1. Azure Static Web Apps (Primary Service)

**Why Azure Static Web Apps?**
- Perfect for React SPAs with no backend
- Built-in global CDN for fast content delivery
- Free SSL certificates
- Automatic GitHub Actions deployment
- Custom domain support
- High availability and scalability
- Generous free tier

**Features Included:**
- Automatic build and deployment from GitHub
- Global content distribution
- Free SSL/TLS certificates
- Custom domain mapping
- Staging environments for pull requests
- Built-in authentication (if needed in future)
- API support via Azure Functions (if needed in future)

#### 2. GitHub Actions (CI/CD)

**Included Features:**
- Automatic deployment on push to main branch
- Preview deployments for pull requests
- Build optimization
- TypeScript compilation
- Vite production build

#### 3. Browser Local Storage

**Client-Side Data:**
- User's BJJ game maps stored locally
- Export/Import JSON functionality for backup
- No server-side database required
- Zero data storage costs

### Optional Future Enhancements

If you need to scale beyond the initial deployment:

1. **Azure Functions** - Add serverless API endpoints (e.g., for user authentication)
2. **Azure Cosmos DB** - Cloud sync for game maps across devices
3. **Azure Blob Storage** - Store technique videos/images
4. **Application Insights** - Advanced monitoring and analytics
5. **Azure Active Directory B2C** - User authentication and management

## Deployment Architecture

### Tier: Free Tier (Azure Static Web Apps)

**Recommended Plan**: Azure Static Web Apps - Free Tier

**Plan Specifications:**
- **Bandwidth**: 100 GB/month
- **Storage**: 0.5 GB
- **Custom Domains**: 2 included
- **Staging Environments**: 3 preview environments
- **API Support**: 2 Azure Functions apps
- **Build Minutes**: GitHub Actions (2,000 min/month free)

**Cost**: **$0/month** ✅

### Why Free Tier is Sufficient

For 5-10 beta users:
- **Bandwidth Usage**: Assuming 2 MB bundle size and 50 page loads per user per month:
  - 10 users × 50 loads × 2 MB = 1 GB/month
  - Well under 100 GB free tier limit
  
- **Storage**: Static assets ~5-10 MB total, well under 0.5 GB limit

- **Build Minutes**: Vite builds complete in ~1-2 minutes
  - Even with 100 deployments/month = 100-200 minutes
  - Under GitHub Actions 2,000 free minutes

## Alternative Architecture (If Free Tier Limitations Reached)

### Tier: Standard Tier

**Plan**: Azure Static Web Apps - Standard Tier

**Specifications:**
- **Bandwidth**: Unlimited
- **Storage**: Unlimited
- **Custom Domains**: Unlimited
- **Staging Environments**: Unlimited
- **Enhanced Features**: 
  - Password protection
  - SLA: 99.95% uptime
  - Advanced routing
  - Pre-rendering

**Cost**: **$9/month per environment** (1 production environment)

**Total Monthly Cost**: **~$9-18/month** (including any overages)

Still well within $500/month budget.

## High Availability & Performance

### Built-in Features

1. **Global CDN**: Content served from edge locations worldwide
2. **Automatic Scaling**: Handles traffic spikes automatically
3. **99.95% SLA**: On Standard tier (99.9% on Free tier)
4. **Zero-downtime Deployments**: Atomic swap deployments
5. **Automatic SSL Renewal**: Managed certificates

### Performance Optimizations

1. **Vite Production Build**:
   - Code splitting
   - Tree shaking
   - Minification
   - Gzip compression

2. **CDN Caching**:
   - Static assets cached at edge
   - Reduced latency for global users

3. **HTTP/2 Support**: Faster asset loading

## Security Features

1. **HTTPS Everywhere**: Automatic SSL/TLS
2. **DDoS Protection**: Built-in Azure DDoS protection
3. **Custom Security Headers**: Configurable via staticwebapp.config.json
4. **Content Security Policy**: Can be implemented
5. **Dependency Scanning**: GitHub Dependabot integration

## Scalability Path

The architecture can easily scale as user base grows:

1. **5-10 Users** (Current): Free Tier - $0/month
2. **10-100 Users**: Free Tier - $0/month (still sufficient)
3. **100-1,000 Users**: Standard Tier - $9/month
4. **1,000+ Users**: Standard Tier + potential backend - $20-50/month

All within $500/month budget with significant room for growth.

## Disaster Recovery

### Backup Strategy

1. **Source Code**: Stored in GitHub (version controlled)
2. **User Data**: Browser local storage + JSON export feature
3. **Deployment Rollback**: Git-based, can redeploy any previous commit
4. **Infrastructure**: Azure Static Web Apps can be recreated quickly

### Recovery Time Objective (RTO)

- **Service Outage**: < 5 minutes (Azure handles automatically)
- **Bad Deployment**: < 10 minutes (rollback via GitHub)
- **Complete Service Recreation**: < 30 minutes (redeploy from GitHub)

## Monitoring & Analytics

### Included Free Monitoring

1. **Azure Portal Metrics**:
   - Request count
   - Data transfer
   - HTTP errors
   - Response times

2. **GitHub Actions Logs**:
   - Build success/failure
   - Deployment status
   - Build duration

### Optional Monitoring (If Needed)

1. **Application Insights** (Free Tier Available):
   - 1 GB data/month free
   - User sessions tracking
   - Performance monitoring
   - Error tracking

## Summary

**Recommended Solution**: Azure Static Web Apps (Free Tier)

**Total Monthly Cost**: **$0/month** (stays within $500 budget with $500 headroom)

**Key Benefits**:
- ✅ Zero infrastructure cost for beta phase
- ✅ Professional-grade hosting with global CDN
- ✅ Automatic CI/CD from GitHub
- ✅ Free SSL certificates
- ✅ Staging environments for testing
- ✅ High availability (99.9%+ uptime)
- ✅ Easy scalability path as users grow
- ✅ $500/month headroom for future enhancements

**Public URL**: Will receive a URL like:
- `https://<app-name>.azurestaticapps.net`
- Or custom domain: `https://bjj-mapper.yourdomain.com`

This architecture provides enterprise-grade hosting for a fraction of the budget, allowing significant room for future growth and enhancements.
