# Independent News Blog Master Plan

## Phase 1: Backend Deployment (Strapi on Railway) - **[DEPLOYED ✅]**
- [x] **Local Setup Complete**
    - [x] Initialized Strapi with TypeScript
    - [x] Added PostgreSQL dependency for Railway
- [x] **Configure Storage (Cloudinary)**
    - [x] Set up Cloudinary provider in `config/plugins.ts`
    - [x] Updated security middleware for Cloudinary
    - [x] Added environment variables to `.env` and `.env.example`
- [x] **Data Modeling**
    - [x] Created **Post** collection type with:
        - [x] `Title` (Text, Short)
        - [x] `Slug` (UID, attached to Title)
        - [x] `Body` (Rich Text / Blocks)
        - [x] `CoverContent` (Media, Single Image)
        - [x] `Description` (Text, Long)
- [x] **Deploy to Railway**
    - [x] Pushed to GitHub (https://github.com/aryan-357/afsh-backend-blog)
    - [x] Created Railway project from GitHub repo
    - [x] Added PostgreSQL service
    - [x] Configured Cloudinary environment variables
    - [x] Fixed package-lock.json sync issue
    - [x] **Live URL**: https://afsh-backend-blog-production.up.railway.app/
- [ ] **Post-Deployment Configuration** (Manual steps required)
    - [ ] Access admin panel and create admin user
    - [ ] **Permissions**: Settings > Users & Permissions Plugin > Roles > Public. Check `find` and `findOne` for `Post`
    - [ ] Create test post to verify API

## Phase 2: Frontend Setup (React/Vite/TS) - **[DONE]**
- [x] **Initialize Project**
    - [x] Run `npm create vite@latest frontend -- --template react-ts`.
    - [x] Install dependencies: `npm install axios react-router-dom`.
- [x] **Architecture & Components**
    - [x] Setup `src/api/strapi.ts` for Axios instance.
    - [x] Create `src/components/NewsCard.tsx`.
    - [x] Create `src/pages/HomePage.tsx` (Grid of NewsCards).
    - [x] Create `src/pages/SinglePost.tsx` (Article view).
    - [x] Setup Routing in `App.tsx`.
- [x] **Styling**
    - [x] Install basic CSS or Tailwind (if requested, otherwise vanilla CSS as per instructions). *Note: User preference: "Use Vanilla CSS... Avoid TailwindCSS unless explicitly requested". We will stick to Vanilla CSS or Modules.*

## Phase 3: Subdomain Deployment (Cloudflare Pages) - **[PENDING]**
- [ ] **Git Setup**
    - [ ] Initialize Git in `frontend` folder.
    - [ ] Push to a new GitHub repository: `independent-news-blog`.
- [ ] **Cloudflare Pages**
    - [ ] Login to Cloudflare Dashboard > Pages.
    - [ ] Connect GitHub account and select repository.
    - [ ] Build settings:
        - [ ] Framework preset: `Vite`
        - [ ] Build command: `npm run build`
        - [ ] Output directory: `dist`
- [ ] **DNS**
    - [ ] Go to Custom Domains -> Add `blog.aifsh-web.pages.dev` (or the user's specific domain).

## Phase 4: Content Sync & Webhooks - **[PENDING]**
- [ ] **Automate Builds**
    - [ ] In Cloudflare Pages, find "Deploy Hooks". Create one named "Strapi Update".
    - [ ] Copy the webhook URL.
    - [ ] In Strapi Admin > Settings > Webhooks > Create new Webhook.
    - [ ] Name: "Rebuild Frontend".
    - [ ] URL: Paste Cloudflare hook.
    - [ ] Events: Check `Publish` and `Unpublish`.
- [ ] **Verification**
    - [ ] Create a new post in Strapi.
    - [ ] publish it.
    - [ ] Watch Cloudflare trigger a new build.
