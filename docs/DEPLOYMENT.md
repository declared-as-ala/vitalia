# VIAITALIA - Vercel & MongoDB Atlas Production Architecture

## 1. Cloud Infrastructure Overview

Production deployment is hosted on **Vercel** with a managed **MongoDB Atlas** database cluster:

```
┌────────────────────────────────────────────────────────┐
│                   Vercel Global CDN                    │
└───────────────┬────────────────────────┬───────────────┘
                │                        │
                ▼                        ▼
      ┌──────────────────┐     ┌──────────────────┐
      │   Vercel Web     │     │ Vercel Serverless│
      │   (Next.js App)  │     │   (NestJS API)   │
      └──────────────────┘     └────────┬─────────┘
                                        │
                                        ▼
                       ┌──────────────────────────────────┐
                       │       MongoDB Atlas Cluster      │
                       │ mongodb+srv://cluster0.mongodb...│
                       └──────────────────────────────────┘
```

## 2. Environment Variables Standard for Vercel

Configure the following environment variables in your Vercel Project Settings (`Settings -> Environment Variables`):

| Variable Name | Description | Value |
| :--- | :--- | :--- |
| `DATABASE_URL` | MongoDB Atlas Connection String | `mongodb+srv://ala:ala123@cluster0.tojwjkt.mongodb.net/viaitalia_db?retryWrites=true&w=majority` |
| `JWT_SECRET` | Secret key for JWT access tokens | `super_secret_viaitalia_jwt_key_2026_change_in_production` |
| `JWT_REFRESH_SECRET` | Secret key for refresh tokens | `super_secret_viaitalia_refresh_key_2026_change_in_production` |
| `NODE_ENV` | Environment mode | `production` |

## 3. Vercel One-Click Deployment Guide

1. Push your codebase to a GitHub / GitLab repository.
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the repository.
4. Set Root Directory to `./` or `apps/web`.
5. Add the `DATABASE_URL` environment variable pointing to your MongoDB Atlas cluster:
   `mongodb+srv://ala:ala123@cluster0.tojwjkt.mongodb.net/viaitalia_db?retryWrites=true&w=majority`
6. Click **Deploy**. Vercel will automatically build the Next.js frontend, NestJS API routes, and Prisma client!
