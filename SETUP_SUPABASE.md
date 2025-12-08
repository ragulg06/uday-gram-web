# Supabase Database Setup Guide

## Step 1: Get Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project or use existing one
3. Go to Project Settings > Database
4. Find the **Connection string** under "Connection parameters"
5. Copy the **URI** (it should look like: `postgresql://postgres.abcdefg:password@aws-0-xx.pooler.supabase.com:5432/postgres`)

## Step 2: Get API Keys

1. In Supabase, go to Project Settings > API
2. Copy the **Project URL** (should be: `https://actlmcvilznnzxawiyxs.supabase.co`)
3. Copy the **anon public** key
4. Copy the **service_role** key (for server-side operations)

## Step 3: Update Environment Variables

Replace the placeholder values in your `.env` file:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres.YOUR_PROJECT_REF:YOUR_DB_PASSWORD@aws-0-REGION.pooler.supabase.com:6543/postgres

# Supabase Configuration  
SUPABASE_PROJECT_REF=actlmcvilznnzxawiyxs
SUPABASE_URL=https://actlmcvilznnzxawiyxs.supabase.co
SUPABASE_DB_PASSWORD=YOUR_ACTUAL_DB_PASSWORD
SUPABASE_KEY=YOUR_ACTUAL_ANON_KEY

# Session Secret (JWT signing key)
SESSION_SECRET=agy-portal-secret-key-change-this-in-production

# Environment
NODE_ENV=development
```

## Step 4: Run Database Setup

After updating the `.env` file with real credentials:

```bash
npm run db:push
```

This will create all the required tables in your Supabase database.

## Step 5: Start the Application

```bash
npm run dev
```

## Database Tables Created

The system will create these tables:
- `users` - Authentication and user management
- `villages` - Village information and verification
- `committee_members` - Convergence committee data
- `infrastructure_indicators` - Format II data
- `household_surveys` - Format IIIA data
- `works` - Work tracking and progress
- `agencies` - Agency management
- `progress_reports` - Progress tracking
- `vdp_documents` - Village Development Plan documents

## Troubleshooting

If you get connection errors:
1. Verify your Supabase project is active
2. Check that the connection string is correct
3. Ensure your password doesn't contain special characters that need URL encoding
4. Make sure the region in the connection string matches your project region
