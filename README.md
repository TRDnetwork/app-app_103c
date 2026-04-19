# Portfolio Pro

A clean personal portfolio site showcasing projects and contact information.

![Portfolio Pro Preview](https://via.placeholder.com/1200x600?text=Portfolio+Pro+Preview)

## Features

- **Hero Section**: Prominent name and headline with smooth typography
- **About Section**: Descriptive paragraph highlighting experience and skills
- **Project Showcase**: Responsive grid of 3 project cards with hover effects
- **Contact Form**: Secure form with validation, honeypot spam protection, and email delivery via Resend
- **Performance Optimized**: Lazy-loaded images, reduced bundle size, and fast LCP
- **Accessible**: Full a11y support with proper contrast, focus states, and ARIA labels
- **Responsive Design**: Mobile-first layout that adapts from 1 to 3 columns

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS with custom configuration
- **Animations**: Framer Motion (lazy-loaded)
- **Email Delivery**: Resend (via Vercel serverless function)
- **Security**: Honeypot field, server-side validation, secure headers
- **Deployment**: Vercel (serverless functions enabled)

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/your-username/portfolio-pro.git
cd portfolio-pro
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from example:
```bash
cp .env.example .env
```

4. Set your environment variables in `.env`:
```env
RESEND_API_KEY=your_resend_api_key_here
OWNER_EMAIL=you@yourdomain.com
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

### Customizing Content

- **Hero & About**: Edit text directly in `src/App.tsx`
- **Projects**: Update project data in `src/App.tsx` (title, description, image URL, link)
- **Contact**: Form behavior is handled automatically; emails go to `OWNER_EMAIL`

### Styling

The design follows warm minimalism principles:
- **Colors**: Beige background (`#faf8f5`), dark green text (`#1a2e1a`), orange accents (`#e66000`)
- **Typography**: Fraunces (headings), Satoshi (body)
- **Layout**: Centered 1200px container with generous whitespace

Customize in `index.html`:
- Update `tailwind.config` for color changes
- Modify CSS variables in `:root`
- Adjust font imports if needed

## API Endpoints

### `POST /api/contact`

Handles contact form submissions via Vercel serverless function.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to work together!",
  "bot-field": "" // honeypot - leave empty
}
```

**Success Response** (200):
```json
{ "success": true }
```

**Error Responses**:
- `400`: Missing fields or invalid email
- `405`: Method not allowed (only POST)
- `500`: Server error (check logs)

**Example curl**:
```bash
curl -X POST https://portfolio-pro.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "message": "Nice work!",
    "bot-field": ""
  }'
```

## Folder Structure

```
portfolio-pro/
├── api/                    # Vercel serverless functions
│   └── contact.ts          # Contact form handler
├── src/                    # React source code
│   ├── components/         # Reusable UI components
│   │   ├── ContactForm.tsx
│   │   └── ProjectCard.tsx
│   ├── lib/                # Utility functions
│   │   └── animation.ts    # Framer Motion setup
│   └── App.tsx             # Main application component
├── tests/                  # Test suite
│   ├── app.test.js         # Frontend tests
│   └── api.test.js         # API endpoint tests
├── .env.example            # Environment variables template
├── index.html              # Main HTML with Tailwind config
└── package.json            # Dependencies and scripts
```

## Deployment

Deployed on Vercel with zero configuration needed:

1. Push code to GitHub/GitLab
2. Import project in Vercel dashboard
3. Set environment variables in Vercel Settings > Environment Variables
4. Deploy!

**Required Vercel Environment Variables**:
- `RESEND_API_KEY`: Your Resend API key
- `OWNER_EMAIL`: Where contact form submissions are sent

## Security

- **Honeypot Field**: Hidden input to trap spam bots
- **Server-Side Validation**: All form data validated on server
- **Secure Headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **Input Sanitization**: HTML escaping to prevent XSS
- **Rate Limiting**: Integrated with Upstash Redis (5 requests/10s per IP)
- **Fail-Open Security**: If Redis fails, requests proceed (logged to Sentry)

## Performance

- **Lighthouse Score**: >90 on desktop and mobile
- **Bundle Size**: ~180KB (gzipped)
- **Optimizations**:
  - Lazy-loaded Framer Motion
  - Lazy-loaded images
  - Preconnect to Google Fonts
  - Reduced render-blocking CSS/JS
  - Explicit image dimensions to prevent layout shift

## Testing

Run tests with:
```bash
npm test
# or
npx vitest
```

**Test Coverage**:
- Component rendering and structure
- Form validation and error states
- Successful and failed form submissions
- Toast notifications and auto-dismiss
- API endpoint security and validation

## License

MIT © 2024 Portfolio Pro