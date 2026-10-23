# Wanderline — Next.js travel site

Routes: / · /leisure · /leisure/[tour] · /mice · /about · /blogs · /blogs/[post] · /gallery · /contact · /admin

```bash
npm install
cp .env.example .env.local     # then set ADMIN_PASSWORD
npm run dev                    # http://localhost:3000   (dashboard: /admin)
npm run build && npm start
```

## Backend (minimal)
- Every form on the site posts to `/api/enquiry` and is saved to `data/store/enquiries.json` (override with `DATA_DIR`).
- `/admin` is protected by one password, `ADMIN_PASSWORD` in `.env.local`. Login sets a signed, httpOnly cookie (7 days).
- Dashboard: filter, search, view, change status (new / contacted / closed), delete, export CSV.
- Login attempts and form submissions are rate-limited per IP.
- Hosting note: the JSON file needs a writable disk (VPS, Docker volume, local). Serverless hosts such as Vercel have an
  ephemeral disk — swap `lib/store.ts` for a database there. Everything else stays the same.
- Content lives in `data/tours.ts`, `data/blogs.ts` and `data/gallery.ts`.
