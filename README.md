# Bond - Loyalty Infrastructure for Small Businesses

A premium, dark-themed loyalty platform built with Next.js 14, TypeScript, and Supabase.

## 🎨 Design System

### Theme Tokens
- **Background**: `#1C1C1C` (Deep Charcoal)
- **Foreground**: `#EAF9FB` (Beautiful White)
- **Muted**: `#A7B0B2` (Supporting text)
- **Surface**: `#232323` (Cards/sections)
- **Border**: `#2E2E2E` (Borders)
- **Accent**: `#00C9A7` → `#92FE9D` (Soft Gradient Aqua)

### Typography
- **Display**: Geist Display (tight leading for hero)
- **Body**: Geist Sans (comfortable line-length, 1.6 line-height)
- **Radius**: rounded-2xl cards, soft shadows on hover
- **Focus**: Visible rings with accent color

## 🚀 Features

### Landing Page
- **Elegant loader** with mask-reveal progress and reduced motion support
- **Cinematic hero** with staggered animations and parallax effects
- **Side rails** with scroll indicators and keyboard accessibility
- **Premium typography** with Geist font system
- **Responsive design** with mobile-first approach

### Authentication
- **Email + Password** authentication with Supabase
- **Google OAuth** integration
- **Password reset** functionality
- **Split-screen design** with branding on the right
- **Form validation** with proper error states

### Brand System
- **Unique logo** with molecular bond structure design
- **Aesthetic favicon** with gradient and glow effects
- **Multiple variants** for light/dark backgrounds
- **SVG-based** for crisp rendering at all sizes

## 🛠 Setup

### Environment Variables
Create a `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Installation
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
npm start
```

## 🎯 Performance & Accessibility

### Lighthouse Targets
- **Performance**: 90+
- **Accessibility**: 90+
- **Best Practices**: 90+
- **SEO**: 90+

### Accessibility Features
- Proper focus management with visible rings
- ARIA labels and semantic HTML
- Keyboard navigation support
- Reduced motion support (`prefers-reduced-motion`)
- High contrast mode compatibility
- Screen reader friendly

### Motion & Interactions
- **Smooth animations** with Framer Motion
- **Scroll-triggered** animations with viewport detection
- **Micro-interactions** on buttons and form elements
- **Parallax effects** for depth and engagement
- **Respects reduced motion** preferences

## 🏗 Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui + Aceternity UI patterns
- **Motion**: Framer Motion
- **Backend**: Supabase
- **Font**: Geist (Display + Sans)

### File Structure
```
app/
├── (auth)/auth/          # Authentication pages
├── layout.tsx            # Root layout with theme
├── page.tsx              # Landing page
└── globals.css           # Global styles with theme tokens

components/
├── brand/Logo.tsx        # Logo system
├── layout/               # Header, Footer
├── sections/             # Page sections
├── ui/                   # shadcn/ui components
└── auth/                 # Auth components

lib/
├── supabase.ts          # Supabase client
└── utils.ts             # Utility functions
```

## 🔐 Backend Integration

### Supabase Features
- **Authentication**: Email/password + OAuth
- **Row Level Security**: Proper data isolation
- **Real-time**: Live updates for loyalty data
- **Storage**: Logo uploads and assets
- **Edge Functions**: For complex business logic

### Route Protection
- Middleware handles auth redirects
- Protected routes: `/dashboard`, `/qr`, `/settings`
- Public routes: `/`, `/auth`
- Automatic redirects based on auth state

## 🎨 Design References

Inspired by:
- **StudioBonded**: Sensory, elegant interactions
- **Alma Digital**: Strong hero composition, side markers
- **Inertia**: Cinematic, restrained animations
- **Viralistic**: Premium typography, narrative flow

## 📝 Notes

### Motion & Accessibility
- All animations respect `prefers-reduced-motion`
- Loader shows only if TTI > 400ms
- Smooth scroll behavior with fallbacks
- Focus management for keyboard users

### Brand Guidelines
- Logo maintains 45° symmetry for balance
- Gradient direction consistent across components
- Typography hierarchy with proper contrast
- Consistent spacing using Tailwind scale

### Performance Optimizations
- Static generation where possible
- Optimized bundle sizes
- Lazy loading for non-critical components
- Efficient re-renders with proper dependencies
