# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19 and TypeScript
- **Styling**: Tailwind CSS 4 with shadcn/ui components (new-york style)
- **Database**: Supabase (direct client access, no API routes)
- **Images**: Cloudinary for uploads with webp optimization
- **Rich Text**: Tiptap 3 for blog content (stored as JSON, not HTML)
- **Icons**: lucide-react

## Architecture

### Directory Structure

- `/app` - Next.js App Router pages (admin/, blogs/, contact/, free/, services/)
- `/components` - Feature-based organization (ui/, home/, admin/, blog/, free/, navigation/)
- `/pages` - Page composition components (HomePage, FreePage, BlogPage, etc.)
- `/lib` - Utilities: supabase.ts (client + TypeScript interfaces), cloudinary.ts, utils.ts

### Key Patterns

- **State**: Local useState/useEffect only, no global state management
- **Data fetching**: Direct Supabase client calls in "use client" components
- **Styling**: Utility-first Tailwind with CSS variables for theming (--main: #8a8e75, --secondary: #f5f3ee)
- **Components**: Server components by default, "use client" directive for interactivity
- **Path aliases**: `@/*` maps to project root

### Database Schema (Supabase)

Key tables: `blogs`, `products`, `product_categories`, `comments`, `reactions`, `categories`

TypeScript interfaces defined in `/lib/supabase.ts`:
- `Blog` - content stored as TiptapContent JSON
- `Product` - buy_type: 'fb_messenger' | 'fb_post'

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
```

## Important Notes

- Blog content uses Tiptap JSON format - use `generateHTML()` from Tiptap to render
- Images: Use Cloudinary's webp format parameter for optimization
- User-facing content is in Mongolian; navigation in English
- Admin routes exist but have no auth middleware implemented
- Remote images allowed from: unsplash.com, ui-avatars.com, res.cloudinary.com
