import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message, 'bot-field': botField } = req.body;

  // Honeypot check
  if (botField) {
    return res.status(200).json({ success: true }); // Silent success to fool bots
  }

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  try {
    // Send notification to site owner
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.OWNER_EMAIL || 'owner@portfolio-pro.com',
      subject: `New message from ${name} on Portfolio Pro`,
      html: await renderContactNotification({ name, email, message }),
    });

    // Optionally send confirmation to submitter
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Thank you for your message!',
      html: await renderContactConfirmation({ name }),
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
}

async function renderContactNotification({ name, email, message }: { name: string; email: string; message: string }) {
  return `
    <div style="font-family: 'Satoshi', sans-serif; color: #1a2e1a; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #faf8f5; border: 1px solid #e9e5dd; border-radius: 12px;">
      <h2 style="font-family: 'Fraunces', serif; font-size: 1.5rem; margin-bottom: 16px; color: #1a2e1a;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #e66000;">${email}</a></p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #e9e5dd; padding: 16px; border-left: 4px solid #e66000; margin: 16px 0; font-style: italic;">${message}</blockquote>
      <hr style="border: 1px solid #e9e5dd; margin: 24px 0;" />
      <p style="color: #4a4a4a; font-size: 0.9rem;">This message was sent via the Portfolio Pro contact form.</p>
    </div>
  `;
}

async function renderContactConfirmation({ name }: { name: string }) {
  return `
    <div style="font-family: 'Satoshi', sans-serif; color: #1a2e1a; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #faf8f5; border: 1px solid #e9e5dd; border-radius: 12px;">
      <h2 style="font-family: 'Fraunces', serif; font-size: 1.5rem; margin-bottom: 16px; color: #1a2e1a;">Hi ${name}, thanks for reaching out!</h2>
      <p>I've received your message and will get back to you as soon as possible.</p>
      <p>In the meantime, feel free to explore more of my work at <a href="https://portfolio-pro.com" style="color: #e66000;">portfolio-pro.com</a>.</p>
      <hr style="border: 1px solid #e9e5dd; margin: 24px 0;" />
      <p style="color: #4a4a4a; font-size: 0.9rem;">This is an automated confirmation email from Portfolio Pro.</p>
    </div>
  `;
}