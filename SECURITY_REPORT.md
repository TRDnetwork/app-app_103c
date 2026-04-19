# Security Scan Report

## Critical Issues
- **Exposed API Keys** — `RESEND_API_KEY` is referenced in `api/contact.ts` but relies on environment variables. While not hardcoded, the file assumes the key is set in Vercel env. No explicit validation or error handling if missing.  
  **Fix**: Add runtime check and fail securely if `RESEND_API_KEY` is missing.

- **XSS (Cross-Site Scripting)** — In `api/contact.ts`, user input (`name`, `email`, `message`) is directly interpolated into HTML email templates without sanitization.  
  **Fix**: Sanitize `message` and `name` before inserting into HTML to prevent script injection in email body.

## Warnings
- **Missing Rate Limiting** — The `/api/contact` endpoint has no rate limiting. Could be abused for spam despite honeypot.  
  **Fix**: Integrate Upstash Rate Limiting (aligned with team context).

- **Insecure Headers** — No Content Security Policy (CSP), X-Frame-Options, or X-Content-Type-Options in serverless function response.  
  **Fix**: Add secure headers in API response.

- **Data Exposure in Error Messages** — Internal error message `"Failed to send message. Please try again later."` leaks implementation detail (`resend.emails.send`).  
  **Fix**: Use generic error message.

## Passed Checks
- SQL Injection: Not applicable — no database queries.
- CORS Misconfiguration: Not applicable — Vercel handles CORS securely by default.
- Authentication Issues: Not applicable — no auth routes.
- Path Traversal: Not applicable — no file system access.
- Insecure Dependencies: No `package.json` found — minimal attack surface.
- Form Validation: Client and server validation present.
- Honeypot: Properly implemented with silent success.

---