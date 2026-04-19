# 📨 Email Setup for Portfolio Pro

This guide walks you through setting up transactional email for your portfolio site using **Resend** and **Vercel serverless functions**.

---

## 🔧 Step 1: Get Your Resend API Key

1. Go to [https://resend.com](https://resend.com) and sign up or log in.
2. Navigate to **API Keys** and create a new API key.
3. Copy the key (e.g., `re_12345678-...`).

> 🔐 Never commit this key to Git. It’s used only server-side.

---

## 🌐 Step 2: Set Environment Variables in Vercel

In your Vercel project dashboard:

1. Go to **Settings > Environment Variables**.
2. Add the following variables:

| Key               | Value                        |
|-------------------|------------------------------|
| `RESEND_API_KEY`  | `re_12345678-...` (your key) |
| `OWNER_EMAIL`     | `you@yourdomain.com`         |

> ✅ Use `RESEND_API_KEY`, NOT `VITE_RESEND_API_KEY` — the latter would expose it to the browser.

---

## 🛠️ Step 3: Verify Your Sending Domain

1. In the Resend dashboard, go to **Domains**.
2. Click **Add Domain** and enter your domain (e.g., `your-portfolio.com`).
3. Follow DNS verification steps (add TXT/CNAME records to your domain provider).
4. Once verified, emails will have better deliverability and won’t land in spam.

> 📨 Unverified domains use `onboarding@resend.dev` as sender — fine for testing, not for production.

---

## 📥 Step 4: Frontend Integration

Your contact form should `POST` to `/api/contact`:

```ts
await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message }),
});
```

> ❌ Do **not** import Resend or email templates on the client.
>
> ✅ The serverless function handles everything securely.

---

## ✅ Step 5: Test the Flow

1. Submit the contact form locally or on your deployed site.
2. Check:
   - You receive the notification email.
   - The user gets a confirmation email.
   - Vercel logs show no errors (`/api/contact`).

Use Vercel’s **Logs** tab in the dashboard to debug any issues.

---

## 🚀 Optional Enhancements

- **Rate Limiting**: Use Upstash Redis to prevent spam (e.g., 1 submission per IP/hour).
- **Sentry Logging**: Catch and report email errors.
- **React Email**: Switch to JSX-based templates with [React Email](https://react.email).

---

## 📚 Resources

- Resend Docs: https://resend.com/docs
- Vercel Serverless Functions: https://vercel.com/docs/functions
- Tailwind Inline Styling Tips: https://tailwindcss.com/docs/adding-custom-styles#handling-css-pseudo-elements

Let your visitors connect — reliably and securely.