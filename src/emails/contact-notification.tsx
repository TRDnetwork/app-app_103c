// This file is provided for reference and potential React Email integration in the future
// Currently using inline HTML in api/contact.ts for simplicity and zero dependencies

export function ContactNotification({ name, email, message }: { name: string; email: string; message: string }) {
  return (
    <div style={{ fontFamily: 'Satoshi, sans-serif', color: '#1a2e1a', background: '#faf8f5', padding: '32px', borderRadius: '12px', maxWidth: '600px', margin: '0 auto', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', marginBottom: '8px', color: '#1a2e1a' }}>New Contact Form Submission</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> <a href={`mailto:${email}`} style={{ color: '#e66000' }}>{email}</a></p>
      <p><strong>Message:</strong></p>
      <blockquote style={{ background: '#e9e5dd', padding: '16px', borderLeft: '4px solid #e66000', margin: '16px 0', fontStyle: 'italic' }}>{message}</blockquote>
      <hr style={{ border: '1px solid #e9e5dd', margin: '24px 0' }} />
      <p style={{ color: '#4a4a4a', fontSize: '14px' }}>This message was sent via your Portfolio Pro contact form.</p>
    </div>
  );
}

export default ContactNotification;