# API Documentation

## `/api/contact` — Contact Form Endpoint

Handles contact form submissions, validates input, sanitizes data, and sends emails via Resend.

### Method
```
POST
```

### Request Body
```json
{
  "name": "string",
  "email": "string",
  "message": "string",
  "bot-field": "string" // honeypot (optional)
}
```

### Required Fields
- `name`: User's full name
- `email`: Valid email address
- `message`: Message content

> The `bot-field` is a honeypot field. If present and non-empty, the request is treated as spam.

### Responses

#### ✅ `200 OK` — Success
Sent when:
- Valid submission (emails sent)
- Honeypot triggered (silent success)

```json
{ "success": true }
```

#### ❌ `400 Bad Request` — Validation Error
```json
{ "message": "All fields are required." }
```
or
```json
{ "message": "Please enter a valid email address." }
```

#### ❌ `405 Method Not Allowed`
```json
{ "message": "Method not allowed" }
```

#### ❌ `500 Internal Server Error`
```json
{ "message": "Something went wrong. Please try again later." }
```

### Headers Set
- `Content-Security-Policy: default-src 'self'; frame-ancestors 'none';`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`

### Example Request (curl)
```bash
curl -X POST https://your-portfolio.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "message": "Love your work! Let's collaborate."
  }'
```

### Email Templates

#### 1. Owner Notification
- **From**: `onboarding@resend.dev`
- **To**: `OWNER_EMAIL` environment variable
- **Subject**: `New Contact Form Submission from {name}`
- **Template**: `src/emails/contact-notification.js`

#### 2. User Confirmation
- **From**: `onboarding@resend.dev`
- **To**: User's email
- **Subject**: `Thank you for reaching out!`
- **Template**: `src/emails/contact-confirmation.js`

### Security & Validation Flow
1. Method check (only POST allowed)
2. Honeypot check (`bot-field`)
3. Required field validation
4. Email format regex check
5. Input sanitization with `isomorphic-dompurify`
6. Dual email delivery
7. Generic error handling

> ✅ All sensitive operations occur server-side. No API keys exposed to client.