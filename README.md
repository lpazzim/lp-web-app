**User:**

Explain the project and create a readme.md for this project

---

**Assistant:**

# LP Web App

A modern, multilingual personal landing page built with **Next.js 16 (App Router)**, featuring dynamic content from Notion, smooth animations, and full testing suite.

## ✨ Features

- **Multilingual Support** (EN/PT) with `next-intl`
- **Dynamic Content** from Notion (blog posts, projects, experiences)
- **Smooth Animations** with GSAP & Framer Motion
- **Responsive Design** with Tailwind CSS v4 & shadcn/ui components
- **Contact Form** with proper validation
- **Blog with MDX** rendering from Notion
- **Full Test Coverage** with Jest & React Testing Library
- **SEO Optimized** with Next.js metadata
- **TypeScript** end-to-end

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 16 (App Router) |
| **Styling** | Tailwind CSS v4, shadcn/ui, clsx, cva |
| **Animations** | GSAP, Framer Motion |
| **CMS** | Notion API + notion-to-md |
| **i18n** | next-intl |
| **UI Components** | shadcn/ui, lucide-react, Radix UI |
| **Testing** | Jest, React Testing Library |
| **Utils** | markdown-it, lodash-like utils |

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Notion integration setup (see `.env.example`)

### Installation
```bash
# Clone & install
git clone <repo>
cd lp-web-app
pnpm install  # or npm/yarn

# Copy env
cp .env.example .env.local
# Add your Notion API token to .env.local
```

### Development
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000)

### Build & Deploy
```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
app/
├── [locale]/          # Internationalized routes
│   ├── page.tsx       # Homepage
│   ├── about/page.tsx
│   ├── blog/          # Dynamic blog routes
│   └── layout.tsx     # Locale layout
components/
├── ui/                # shadcn/ui components
├── content/           # Hero, Projects, Experience
└── __tests__/         # Component tests
lib/
├── content/           # Notion data fetchers
├── notion.ts          # Notion client
├── md.ts              # Markdown utils
└── utils.ts           # Shared utilities
```

## 🌐 Internationalization

Supports English (`en`) and Portuguese (`pt`) with automatic locale detection.

Messages: `./messages/{locale}.json`

## 🔧 Notion Integration

1. Create Notion integration at [my-integrations](https://www.notion.so/my-integrations)
2. Share your databases/pages with the integration
3. Add `NOTION_API_TOKEN` to `.env.local`
4. Update database IDs in `lib/content/*.ts`

## 🧪 Testing

```bash
pnpm test              # All tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Coverage report
```

## 📱 Pages & Features

- **Homepage** (`/en`, `/pt`): Hero, projects grid, experience timeline
- **Blog** (`/en/blog`, `/pt/blog`): Dynamic posts from Notion
- **About** (`/en/about`): Detailed experience showcase
- **Contact Form**: Formspree/EmailJS ready (configure in `ContactForm.tsx`)

## 🎨 Customization

- **Theme**: Edit `tailwind.config.ts` & `globals.css`
- **Components**: `shadcn` CLI via `components.json`
- **Content**: Update Notion databases
- **Animations**: Tweak GSAP params in components

## 🔍 Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm start` | Production server |
| `pnpm lint` | ESLint |
| `pnpm test` | Run tests |

## 🚀 Deployment

### Vercel (Recommended)
```bash
pnpm build
vercel --prod
```

### Other Platforms
- Netlify, Railway, Render
- Ensure Node 20+ & build command: `pnpm build`

## 🤝 Contributing

1. Fork & clone
2. `pnpm install`
3. Create feature branch
4. Add tests
5. `pnpm test && pnpm lint`
6. PR to `main`



