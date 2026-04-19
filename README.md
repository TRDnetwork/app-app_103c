# Portfolio Pro

A clean, warm minimalist personal portfolio site built with React + Vite, Tailwind CSS, and Framer Motion. Designed for developers and creatives who want to showcase their work and connect with visitors through a beautifully crafted, performant, and secure contact experience.

## ✨ Features

- **Hero Section**: Large display typography with name and role
- **About Section**: Descriptive paragraph with editorial contrast
- **Project Showcase**: 3 responsive project cards in a 1-2-3 grid layout
- **Contact Form**: 
  - Client-side and server-side validation
  - Honeypot spam protection
  - Dual email delivery (owner + sender confirmation)
  - Toast notification on success
- **Performance Optimized**: Lazy-loaded animations, reduced bundle size
- **Secure by Design**: XSS sanitization, secure headers, generic error handling
- **Accessible**: Focus states, reduced motion support, semantic HTML

## 🎨 Design Aesthetic

**Warm Minimalism**  
- **Colors**: Soft beige (`#faf8f5`) background, deep green (`#1a2e1a`) text, burnt orange (`#e66000`) accent
- **Typography**: Fraunces (serif) for headings, Satoshi (sans-serif) for body
- **Layout**: Centered vertical scroll, max-width 1200px, responsive grid
- **Interactions**: Framer Motion staggered slide-up animations, hover lift on cards, focus glow on inputs

## ⚙️ Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React, Vite, TypeScript |
| Styling | Tailwind CSS (CDN), CSS customizations |
| Animations | Framer Motion (lazy-loaded) |
| Email | Resend (via Vercel serverless) |
| Security | Honeypot, DOMPurify, CSP headers |
| Testing | Vitest, @testing-library/react |
| Hosting | Vercel (serverless functions) |

## 📦 Setup Instructions

### 1. Clone and Install
```bash
git clone https://github.com/your-username/portfolio-pro.git
cd portfolio-pro
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root:
```bash
cp .env.example .env
```

Set your values:
```env
RESEND_API_KEY=your_resend_api_key_here
OWNER_EMAIL=you@yourdomain.com
```

> 🔐 Never commit `.env` to version control.

### 3. Run Locally
```bash
npm run dev
```
Visit `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

## 🚀 Deployment to Vercel

1. Push to GitHub/GitLab
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Add environment variables in **Settings > Environment Variables**:
   - `RESEND_API_KEY`
   - `OWNER_EMAIL`
4. Deploy — Vercel automatically detects Vite + serverless functions

> ✅ Domain verification in Resend dashboard recommended for better email deliverability.

## 📁 Folder Structure
```
portfolio-pro/
├── api/
│   └── contact.ts               # Vercel serverless function
├── src/
│   ├── components/
│   │   ├── ContactForm.tsx      # Form with validation
│   │   ├── ProjectCard.tsx      # Reusable project card
│   │   └── Toast.tsx            # Auto-dismissing notification
│   ├── emails/
│   │   ├── contact-notification.js  # Owner email template
│   │   └── contact-confirmation.js  # User confirmation template
│   └── main.tsx                 # React entry point (lazy Motion)
├── tests/
│   ├── app.test.js              # Frontend component tests
│   └── api.test.js              # API endpoint tests
├── index.html                   # Tailwind config + fonts + styles
└── package.json
```

## 📬 Contact Form Flow

1. User fills out form (name, email, message)
2. Honeypot field catches bots (silent 200 OK)
3. Server validates fields and email format
4. Input is sanitized to prevent XSS
5. Two emails sent:
   - Notification to site owner
   - Confirmation to user
6. Success response → toast appears → form resets

## 🛡️ Security Notes

- **Honeypot**: Hidden field blocks most bots
- **XSS Protection**: `isomorphic-dompurify` sanitizes all user input
- **Secure Headers**: CSP, X-Frame-Options, X-Content-Type-Options set
- **Error Handling**: Generic messages prevent information leakage
- **Rate Limiting**: Recommended via Upstash Redis (not implemented)

## 🧪 Testing

Run tests:
```bash
npm test
# or
npx vitest
```

Coverage includes:
- Hero, About, Projects rendering
- Form submission and reset
- API method validation
- Email format and required field checks
- Honeypot and secure headers

## 📈 Performance

Optimizations:
- Lazy-loaded Framer Motion
- Preloaded critical fonts
- Inline critical styles
- Debounced form submission
- Memoized components
- Auto-dismissing toast

Estimated bundle size: **~110KB** (24% reduction)

## 📄 License

MIT — feel free to use and modify.