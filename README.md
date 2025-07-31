# CreatExp

A modern full-stack application built with Next.js, TypeScript, and Tailwind CSS.

## 🛠️ Tech Stack

- **Next.js 15.4.5** with App Router
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **@dnd-kit** for drag-and-drop functionality
- **shadcn/ui** for accessible UI components
- **Lucide React** for icons

## 📁 Project Structure

```
CREATEXP/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   ├── globals.css      # Global styles with Tailwind
│   │   └── favicon.ico      # App favicon
│   ├── components/
│   │   └── ui/              # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── select.tsx
│   │       └── textarea.tsx
│   └── lib/
│       └── utils.ts         # Utility functions (cn helper)
├── public/                  # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── components.json          # shadcn/ui configuration
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

## 📦 Key Dependencies

### Production Dependencies
- **@dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities** - Drag-and-drop functionality
- **@radix-ui** components - Accessible UI primitives
- **lucide-react** - Icon library
- **tailwind-merge & clsx** - Conditional styling utilities
- **class-variance-authority** - Component variant management

### Development Dependencies
- **TypeScript** - Type checking
- **ESLint** - Code linting
- **Tailwind CSS** - Utility-first CSS framework

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CREATEXP
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## 🎨 Adding Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for components. To add new components:

```bash
npx shadcn@latest add [component-name]
```

Example:
```bash
npx shadcn@latest add badge
npx shadcn@latest add table
npx shadcn@latest add form
```

## 🎯 Development

- Edit pages in `src/app/` directory
- Add components in `src/components/`
- The page auto-updates as you edit files (hot reload)
- This project uses [Geist](https://vercel.com/font) font family

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
