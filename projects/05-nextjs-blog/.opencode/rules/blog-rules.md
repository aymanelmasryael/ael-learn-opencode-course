# Next.js Blog Rules

## Architecture
- App Router with file-based routing
- TypeScript strict mode — no `any` types
- Server components by default, client components only for interactivity
- Tailwind CSS with darkMode: "class"

## Pages
- `/` — landing page with featured posts
- `/blog` — all posts grid with pagination
- `/blog/[slug]` — individual article with MDX rendering
- `/about` — about page

## Components
- Navbar: sticky glassmorphism, mobile hamburger, dark mode toggle
- BlogCard: image, title, excerpt, date, tags, reading time
- SearchBar: real-time client-side filtering by title/tags
- Newsletter: email form with validation
