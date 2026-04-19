# 📨 Portfolio Pro Email Setup Guide

This guide walks you through setting up transactional email for your portfolio site using **Resend** and Vercel serverless functions.

---

## 🔧 Step 1: Get Your Resend API Key

1. Go to [https://resend.com](https://resend.com) and sign up / log in.
2. Navigate to **API Keys** and create a new production key.
3. Copy the key (it looks like `re_abc123...`).

> ⚠️ Never commit this key to version control.

---

## 🌐 Step 2: Set Environment Variables in Vercel

In your Vercel project dashboard:

1. Go to **Settings > Environment Variables**.
2. Add the following variables:

| Key               | Value                        |
|-------------------|------------------------------|
| `RESEND_API_KEY`  | `re_abc123...` (your key)    |
| `OWNER_EMAIL`     | `you@yourdomain.com`         |

> ✅ Use `RESEND_API_KEY`, NOT `VITE_RESEND_API_KEY` — the latter would expose it to the browser.

---

## 🛠️ Step 3: Verify Your Sending Domain (Critical!)

1. In Resend dashboard, go to **Domains**.
2. Click **Add Domain** and enter your domain (e.g., `portfolio-pro.com`).
3. Add the DNS records (TXT and CNAME) to your domain provider.
4. Wait for verification (usually a few minutes).

> ✅ Verified domains improve email deliverability and prevent spam filtering.

---

## 📣 Step 4: Frontend Integration (Already Done)

The frontend calls the serverless function securely:

```ts
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message, 'bot-field': '' }),
});
```

- No client-side email SDKs
- No API keys in browser
- Honeypot and validation handled server-side

---

## 🧪 Step 5: Test the Flow

1. Submit the contact form on your live site.
2. Check:
   - You receive the notification email
   - The user gets a confirmation email
   - No errors in **Vercel Logs > Functions > contact**

---

## 📎 Optional: Use React Email (Advanced)

If you want to manage templates in JSX with React Email:

```bash
npm install @react-email/components @react-email/render
```

Then replace the HTML strings in `api/contact.ts` with `render()` calls from your `.tsx` templates.

---

## 🚨 Troubleshooting

| Issue                          | Solution |
|-------------------------------|--------|
| 500 error on submit           | Check `RESEND_API_KEY` and `OWNER_EMAIL` in Vercel env |
| Emails in spam                | Verify your domain in Resend |
| Honeypot not working          | Ensure frontend sends `'bot-field': ''` |
| Rate limiting (future)        | Integrate Upstash Redis via `@upstash/ratelimit` |

---

✅ You're all set! Your portfolio now securely handles contact form submissions with professional email delivery.