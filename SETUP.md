# DubaiFilmMaker CMS Setup Guide

This guide will help you set up the CMS system and integrate it with the frontend website.

## Prerequisites

- Node.js 18+ installed
- Supabase account (free tier works)
- Git (optional)

## Step 1: Database Setup

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Create a new project
3. Wait for the database to be provisioned (takes ~2 minutes)

### 1.2 Run Database Schema

1. In your Supabase project, go to **SQL Editor**
2. Copy the contents of `database/schema.sql`
3. Paste and run it in the SQL Editor
4. Copy the contents of `database/add_public_access.sql`
5. Paste and run it in the SQL Editor

### 1.3 Get API Keys

1. Go to **Project Settings** → **API**
2. Copy the following:
   - `Project URL` (e.g., `https://xxxxx.supabase.co`)
   - `anon public` key
   - `service_role` key (keep this secret!)

## Step 2: CMS Configuration

### 2.1 Install Dependencies

```bash
cd dubaifilmmaker-cms
npm install
```

### 2.2 Configure Environment Variables

Create a `.env.local` file in the `dubaifilmmaker-cms` folder:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

Replace the values with your actual Supabase credentials.

### 2.3 Start Development Server

```bash
npm run dev
```

The CMS will be available at `http://localhost:3000`

## Step 3: Add Initial Projects

### 3.1 Access Admin Panel

1. Open `http://localhost:3000/admin/projects`
2. Click **"New Project"**
3. Fill in the project details:
   - Title
   - Client
   - Category
   - Data Category (for filtering: corporate, business, tourism, government)
   - Poster Image URL
   - Video URL
   - Credits (JSON format)

### 3.2 Credits Format

Credits should be in JSON array format:

```json
[
  {"role": "Client", "name": "Company Name"},
  {"role": "Director", "name": "Director Name"},
  {"role": "Production Company", "name": "DubaiFilmMaker"},
  {"role": "Editor", "name": "Editor Name"}
]
```

### 3.3 Publish Projects

- Toggle the **"Published"** status to make projects visible on the frontend
- Use **Order Index** to control the display order (lower numbers appear first)

## Step 4: Frontend Integration

### 4.1 Configure API Endpoint

Edit `assets/js/api-config.js` in the main website folder:

```javascript
const API_CONFIG = {
  USE_CMS_API: true,  // Set to true to use CMS
  CMS_API_URL: 'http://localhost:3000/api/projects',  // Update with your CMS URL
  LOCAL_JSON_URL: 'data/project.json'
};
```

### 4.2 Test Integration

1. Make sure the CMS is running (`npm run dev` in dubaifilmmaker-cms)
2. Open the main website (`index.html`)
3. Check browser console for "Fetching projects from: http://localhost:3000/api/projects"
4. Projects should load from the database

### 4.3 Fallback to Local JSON

If the CMS API fails, the system automatically falls back to `data/project.json`. This ensures the website always works even if the CMS is down.

## Step 5: Production Deployment

### 5.1 Deploy CMS to Vercel

```bash
cd dubaifilmmaker-cms
npm run build
```

Deploy to Vercel:
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### 5.2 Update Frontend API URL

After deploying, update `api-config.js`:

```javascript
const API_CONFIG = {
  USE_CMS_API: true,
  CMS_API_URL: 'https://your-cms.vercel.app/api/projects',
  LOCAL_JSON_URL: 'data/project.json'
};
```

## Troubleshooting

### Projects not loading from API

1. Check browser console for errors
2. Verify CMS is running: `http://localhost:3000/api/projects`
3. Check Supabase RLS policies are set correctly
4. Verify environment variables in `.env.local`

### CORS errors

The API endpoint includes CORS headers. If you still get errors:
1. Check the `CMS_API_URL` is correct
2. Ensure the CMS is running
3. Try accessing the API directly in browser

### Database connection errors

1. Verify Supabase credentials in `.env.local`
2. Check Supabase project is active
3. Ensure database schema was run successfully

## Features

### CMS Features
- ✅ Create, edit, delete projects
- ✅ Upload images and videos
- ✅ Manage project credits
- ✅ Publish/unpublish projects
- ✅ Reorder projects
- ✅ Filter by category
- ✅ About page content management
- ✅ Contact information management

### Frontend Features
- ✅ Dynamic project loading from API
- ✅ Automatic fallback to local JSON
- ✅ Hash-based routing for project details
- ✅ Dynamic homepage slider
- ✅ Dynamic project grid
- ✅ Credits display on project detail page

## API Endpoints

### GET /api/projects

Returns all published projects in the format expected by the frontend.

**Response:**
```json
{
  "projects": [
    {
      "id": 1,
      "title": "Project Title",
      "client": "Client Name",
      "category": "Category",
      "data_cat": "corporate",
      "poster_image": "https://...",
      "poster_image_srcset": "https://...",
      "video_url": "https://...",
      "link": "works/project-detail.html#id=1",
      "credits": [
        {"role": "Client", "name": "Company"}
      ]
    }
  ]
}
```

## Support

For issues or questions:
1. Check the browser console for errors
2. Check the CMS terminal for server errors
3. Verify database schema is up to date
4. Review this setup guide

## Next Steps

1. Add authentication to the CMS admin panel
2. Add image upload functionality
3. Add video upload to cloud storage
4. Add analytics tracking
5. Add SEO metadata management
