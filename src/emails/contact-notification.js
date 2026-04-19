// This file is not used directly — template is inlined in api/contact.ts
// Keeping for reference or future extraction if needed

export function ContactNotificationEmail({ name, email, message }) {
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