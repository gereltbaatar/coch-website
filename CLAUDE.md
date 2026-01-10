# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
yarn dev       # Start development server (preferred)
yarn build     # Production build
yarn start     # Start production server
yarn lint      # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19 and TypeScript
- **Styling**: Tailwind CSS 4 with shadcn/ui components (new-york style)
- **Database**: Supabase (direct client access, no API routes)
- **Images**: Cloudinary for uploads with webp optimization
- **Rich Text**: Tiptap 3 for blog content (stored as JSON, not HTML)
- **Icons**: lucide-react
- **Notifications**: sonner for toasts

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
- `Product` - buy_type: 'fb_messenger' | 'fb_post', images: string[]

### Tiptap Content Handling

Blog content is stored as Tiptap JSON. To render:
```typescript
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
// ... other extensions

const html = generateHTML(blog.content, [StarterKit, Link, Image, ...])
```

### Cloudinary Image Upload

Use `uploadToCloudinary()` from `/lib/cloudinary.ts`. Returns optimized webp URL with `/upload/f_webp,q_80/` transformation.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
```

## Important Notes

- User-facing content is in Mongolian; navigation/code in English
- Admin routes (`/admin/*`) have no auth middleware - open access
- Remote images allowed from: unsplash.com, ui-avatars.com, res.cloudinary.com
- Supabase RLS policies are permissive (allow all operations)
