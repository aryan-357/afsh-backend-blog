# Post-Deployment Configuration Guide

Your Strapi backend is now live at: **https://afsh-backend-blog-production.up.railway.app/**

This guide will walk you through the essential configuration steps to make your API functional.

---

## Step 1: Create Admin User

### Access the Admin Panel
1. Open your browser and navigate to:
   ```
   https://afsh-backend-blog-production.up.railway.app/admin
   ```

2. You'll see the **"Welcome to Strapi"** screen

### Register Your Admin Account
Fill in the following details:
- **First name**: Your first name
- **Last name**: Your last name  
- **Email**: Your admin email (you'll use this to login)
- **Password**: Strong password (min 8 characters)
- **Confirm Password**: Same password

3. Click **"Let's start"**

✅ You're now logged into the Strapi admin panel!

---

## Step 2: Configure API Permissions (CRITICAL!)

> ⚠️ **Without this step, your frontend won't be able to fetch posts from the API!**

### Enable Public Access to Posts

1. In the left sidebar, click **Settings** (gear icon at bottom)

2. Under **USERS & PERMISSIONS PLUGIN**, click **Roles**

3. Click on the **Public** role

4. Scroll down to find **Post** in the permissions list

5. **Check these two boxes**:
   - ✅ `find` - Allows fetching all posts
   - ✅ `findOne` - Allows fetching a single post by ID

6. Click **Save** (top right corner)

### What This Does:
- Allows unauthenticated users (your website visitors) to read posts via the API
- Does NOT allow them to create, update, or delete posts (those require authentication)

---

## Step 3: Create Your First Post

### Navigate to Content Manager
1. In the left sidebar, click **Content Manager**
2. Under **COLLECTION TYPES**, click **Post**
3. Click **"Create new entry"** (top right)

### Fill in Post Details

**Title** (Required)
- Example: `Breaking News: First Post on Our Blog`
- The slug will auto-generate from this

**Slug** (Auto-generated)
- Will be created automatically from the title
- Example: `breaking-news-first-post-on-our-blog`
- You can edit it if needed

**Description** (Optional but recommended for SEO)
- Example: `This is our first news article covering the latest developments`
- Used for meta descriptions and previews

**Body** (Required - Rich Text Editor)
- Click in the body area to open the blocks editor
- Add paragraphs, headings, images, quotes, etc.
- Example content:
  ```
  This is the first article on our independent news blog. 
  We're excited to bring you the latest news and updates!
  ```

**Cover Content** (Optional - Media Upload)
- Click **"Add new assets"**
- Upload an image (JPEG, PNG, WebP)
- This will be stored in Cloudinary
- Recommended size: 1200x630px for best social media sharing

### Save and Publish

1. Click **Save** (top right) - This saves as a draft
2. Click **Publish** - This makes it publicly available via the API

✅ Your first post is now live!

---

## Step 4: Test Your API

### Test in Browser
Open this URL in your browser:
```
https://afsh-backend-blog-production.up.railway.app/api/posts?populate=*
```

### Expected Response
You should see JSON data like this:
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Breaking News: First Post on Our Blog",
        "slug": "breaking-news-first-post-on-our-blog",
        "description": "This is our first news article...",
        "body": [...],
        "coverContent": {
          "data": {
            "attributes": {
              "url": "https://res.cloudinary.com/..."
            }
          }
        },
        "createdAt": "2026-01-05T...",
        "updatedAt": "2026-01-05T...",
        "publishedAt": "2026-01-05T..."
      }
    }
  ]
}
```

### Test with cURL (Optional)
```bash
curl https://afsh-backend-blog-production.up.railway.app/api/posts?populate=*
```

---

## Useful API Endpoints

Once configured, you can use these endpoints:

### Get All Posts
```
GET /api/posts?populate=*
```

### Get Single Post by ID
```
GET /api/posts/1?populate=*
```

### Get Post by Slug
```
GET /api/posts?filters[slug][$eq]=your-slug-here&populate=*
```

### Pagination
```
GET /api/posts?pagination[page]=1&pagination[pageSize]=10&populate=*
```

### Sort by Date (Newest First)
```
GET /api/posts?sort=publishedAt:desc&populate=*
```

> 💡 **Tip**: Always use `?populate=*` to include related data like cover images!

---

## Troubleshooting

### "403 Forbidden" Error
- ❌ You didn't enable `find` and `findOne` permissions for Public role
- ✅ Go back to Step 2 and configure permissions

### "Empty data array" Response
- ❌ No posts are published yet
- ✅ Create and publish at least one post (Step 3)

### Cover Image Not Showing
- ❌ You didn't use `?populate=*` in your API request
- ✅ Add `?populate=*` to your URL

### Can't Access Admin Panel
- ❌ Railway deployment might have failed
- ✅ Check Railway logs for errors
- ✅ Verify environment variables are set correctly

---

## Next Steps

✅ **Phase 1 Complete!** Your backend is fully configured and ready.

**Ready for Phase 3?**
- Deploy your React frontend to Cloudflare Pages
- Connect it to this backend API
- Set up webhooks for automatic rebuilds

---

## Quick Reference

| Item | Value |
|------|-------|
| **Admin Panel** | https://afsh-backend-blog-production.up.railway.app/admin |
| **API Base URL** | https://afsh-backend-blog-production.up.railway.app/api |
| **Posts Endpoint** | /api/posts?populate=* |
| **Database** | PostgreSQL (Railway) |
| **Media Storage** | Cloudinary |
