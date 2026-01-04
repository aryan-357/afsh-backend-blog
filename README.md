# Independent News Blog - Backend (Strapi)

This is the Strapi backend for the independent news blog.

## 🚀 Quick Start (Local Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env`
   - Fill in the required values (see Configuration section below)

3. **Run development server:**
   ```bash
   npm run develop
   ```

4. **Access Admin Panel:**
   - Navigate to `http://localhost:1337/admin`
   - Create your first admin user

## 📦 Configuration

### Required Environment Variables

#### Cloudinary (Media Storage)
```env
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

Get these from [Cloudinary Dashboard](https://cloudinary.com/console)

#### Database (For Railway - PostgreSQL)
```env
DATABASE_CLIENT=postgres
DATABASE_HOST=${PGHOST}
DATABASE_PORT=${PGPORT}
DATABASE_NAME=${PGDATABASE}
DATABASE_USERNAME=${PGUSER}
DATABASE_PASSWORD=${PGPASSWORD}
DATABASE_SSL=false
```

## 🚂 Railway Deployment

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial Strapi setup"
   git push origin main
   ```

2. **Deploy on Railway:**
   - Go to [Railway](https://railway.app/)
   - Create a new project
   - Connect your GitHub repository
   - Add PostgreSQL service to the project
   - Add environment variables in Railway dashboard:
     - `CLOUDINARY_NAME`
     - `CLOUDINARY_KEY`
     - `CLOUDINARY_SECRET`
   - Railway will auto-detect Strapi and deploy

3. **Configure Permissions:**
   - Access Railway deployment URL + `/admin`
   - Go to **Settings > Users & Permissions Plugin > Roles > Public**
   - Enable `find` and `findOne` for `Post` collection

## 📝 Content Type: Post

The backend includes a `Post` content type with:
- **title** (Text) - Post title
- **slug** (UID) - URL-friendly identifier
- **body** (Blocks) - Rich text content
- **coverContent** (Media) - Cover image/video
- **description** (Text) - SEO description

## 🔗 API Endpoints

Once deployed, your API will be available at:
- **Get all posts:** `GET /api/posts`
- **Get single post:** `GET /api/posts/:id`
- **Get by slug:** `GET /api/posts?filters[slug][$eq]=your-slug`
