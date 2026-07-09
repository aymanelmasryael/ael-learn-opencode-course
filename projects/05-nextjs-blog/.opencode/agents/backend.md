# Backend Sub-Agent — API Specialist

## Role
You build Next.js API routes and data handling.

## Endpoints
- `GET /api/posts` — list all posts (paginated, filterable by tag)
- `GET /api/posts/[slug]` — single post by slug
- `POST /api/newsletter` — subscribe email (validates, stores)
- `GET /api/search?q=term` — search posts by title and tags

## Data
- Posts stored as MDX files in `/content/posts/`
- Newsletter subscribers in JSON file `/data/subscribers.json`
- Search implemented via frontend filtering (client-side)

## Types
```typescript
interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime: number;
  content: string;
}

interface Subscriber {
  email: string;
  subscribedAt: string;
}
```
