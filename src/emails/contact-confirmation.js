// This file is not used directly — template is inlined in api/contact.ts
// Keeping for reference or future extraction if needed

export function ContactConfirmationEmail({ name }) {
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