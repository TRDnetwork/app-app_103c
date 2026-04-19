# 📨 Portfolio Pro Email Setup Guide

This guide walks you through setting up transactional email for your portfolio site using **Resend** and **Vercel serverless functions**.

---

## 🔐 1. Get Your Resend API Key

1. Go to [https://resend.com](https://resend.com) and sign up or log in.
2. Navigate to **API Keys** and create a new production key.
3. Copy the key (it looks like `re_12345678-...`).

> ⚠️ Never commit this key to Git. It's a secret.

---

## ☁️ 2. Set Environment Variables in Vercel

In your Vercel project dashboard:

1. Go to **Settings > Environment Variables**.
2. Add the following variables:

| Key               | Value                            |
|-------------------|----------------------------------|
| `RESEND_API_KEY`  | `re_12345678-...` (your key)     |
| `OWNER_EMAIL`     | `you@yourdomain.com` (your email)|

> ✅ Use `RESEND_API_KEY`, NOT `VITE_RESEND_API_KEY` — the latter would expose it to the browser.

---

## 🛠️ 3. Frontend Integration (Already Done)

The frontend already submits the contact form via:

```ts
fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify({ name, email, message, 'bot-field': '' }),
});
```

No client-side email library is used — all email logic is server-side.

---

## ✅ 4. Verify Your Sending Domain

1. In Resend Dashboard, go to **Domains**.
2. Click **Add Domain** and enter your domain (e.g., `portfolio-pro.com`).
3. Add the required DNS records (TXT and CNAME) to your domain provider.
4. Wait for verification (usually a few minutes).

> This ensures high deliverability and prevents your emails from being marked as spam.

---

## 🧪 5. Test the Contact Form

1. Deploy your site or run locally with Vercel CLI.
2. Fill out the contact form.
3. Check:
   - You receive the message at `OWNER_EMAIL`
   - The user gets a confirmation email
   - No errors in Vercel logs (`vercel logs` or dashboard)

---

## 📊 6. Monitor & Debug

- Check **Vercel Logs** for API errors: `https://vercel.com/your-username/portfolio-pro/logs`
- View sent emails in **Resend Dashboard > Emails**
- If emails fail, ensure:
  - `RESEND_API_KEY` is correct
  - Domain is verified
  - No network issues

---

## 🛡️ Security Notes

- **Honeypot field** (`bot-field`) helps block spam bots.
- **Rate limiting** can be added via Upstash Redis (optional).
- All validation happens server-side — never trust the client.

---

## 🎉 You're Live!

Your portfolio now accepts messages securely and professionally. No database, no complexity — just email that works.