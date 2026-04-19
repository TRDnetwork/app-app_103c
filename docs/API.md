# Portfolio Pro API Documentation

## Overview

The Portfolio Pro site includes a single serverless API endpoint for handling contact form submissions. All endpoints are hosted on Vercel and follow REST conventions.

---

## Contact Form Endpoint

### `POST /api/contact`

Handles submission of the contact form with spam protection and email delivery.

#### Request

**URL**: `https://your-deployed-url.vercel.app/api/contact`

**Headers**:
```
Content-Type: application/json
```

**Body** (JSON):
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Sender's full name |
| `email` | string | Yes | Sender's email address |
| `message` | string | Yes | Message content |
| `bot-field` | string | No | Honeypot field - should be empty |

**Example Request**:
```json
{
  "name": "Alex Rivera",
  "email": "alex@example.com",
  "message": "I love your work and would like to collaborate!",
  "bot-field": ""
}
```

**Example curl Command**:
```bash
curl -X POST https://portfolio-pro.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex Rivera",
    "email": "alex@example.com",
    "message": "Let'\''s work together!",
    "bot-field": ""
  }'
```

#### Responses

**200 OK - Success**
```json
{
  "success": true
}
```
*Returned when:*
- Form is valid and emails are sent successfully
- Honeypot field is filled (silent success to fool bots)

**400 Bad Request**
```json
{
  "message": "Missing required fields"
}
```
*Returned when:*
- `name`, `email`, or `message` is missing
- `email` format is invalid

**405 Method Not Allowed**
```json
{
  "message": "Method not allowed"
}
```
*Returned when:*
- HTTP method is not POST

**500 Internal Server Error**
```json
{
  "message": "Failed to send message",
  "error": "Detailed error message"
}
```
*Returned when:*
- Resend email service fails
- Environment variables are missing
- Unexpected server error occurs

#### Security Features

1. **Honeypot Protection**:
   - Hidden `bot-field` traps automated spam bots
   - Returns 200 OK when field is filled (silent success)

2. **Input Validation**:
   - All fields required on server-side
   - Email format validated with regex
   - Input sanitized to prevent XSS

3. **Secure Headers**:
   ```http
   X-Content-Type-Options: nosniff
   X-Frame-Options: DENY
   X-XSS-Protection: 1; mode=block
   ```

4. **Rate Limiting**:
   - 5 requests per 10 seconds per IP address
   - Implemented via Upstash Redis
   - Fail-open: if Redis fails, request proceeds (logged to Sentry)

5. **Environment Security**:
   - `RESEND_API_KEY` never exposed to client
   - `OWNER_EMAIL` configurable via environment variable

#### Email Delivery

Two emails are sent on successful submission:

1. **Notification to Site Owner**:
   - From: `onboarding@resend.dev`
   - To: `OWNER_EMAIL` environment variable
   - Subject: `New message from [name] on Portfolio Pro`
   - Contains: Full message with sender details

2. **Confirmation to Sender**:
   - From: `onboarding@resend.dev`
   - To: `email` from form
   - Subject: `Thank you for your message!`
   - Standard thank you message

#### Error Handling

| Scenario | Response | Logging |
|--------|----------|---------|
| Valid submission | 200 OK | Success logged |
| Missing fields | 400 Bad Request | Error logged |
| Invalid email | 400 Bad Request | Error logged |
| Honeypot triggered | 200 OK | Silent (no log) |
| Resend failure | 500 Internal Server | Full error logged |
| Missing API key | 500 Internal Server | Critical error logged |

#### Deployment Requirements

**Vercel Environment Variables**:
- `RESEND_API_KEY`: Your Resend API key (create at [resend.com](https://resend.com))
- `OWNER_EMAIL`: Email address to receive contact form submissions

**Domain Verification**:
For best deliverability:
1. Add your domain in Resend Dashboard
2. Configure DNS records (TXT and CNAME)
3. Verify domain ownership

---

## Health Check

### `GET /api/health`

Simple health check endpoint to verify API status.

**Response (200 OK)**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

*Note: This endpoint is automatically added by Vercel and does not require custom implementation.*