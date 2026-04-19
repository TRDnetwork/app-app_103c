export function ContactConfirmation({ name }: { name: string }) {
  return (
    <div style={{ fontFamily: 'Satoshi, sans-serif', color: '#1a2e1a', background: '#faf8f5', padding: '32px', borderRadius: '12px', maxWidth: '600px', margin: '0 auto', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '24px', marginBottom: '8px', color: '#1a2e1a' }}>Thanks for reaching out, {name}!</h2>
      <p>I've received your message and will get back to you as soon as possible.</p>
      <p>In the meantime, feel free to explore more of my work on the site.</p>
      <hr style={{ border: '1px solid #e9e5dd', margin: '24px 0' }} />
      <p style={{ color: '#4a4a4a', fontSize: '14px' }}>Sent from Portfolio Pro — a clean personal portfolio site.</p>
    </div>
  );
}

export default ContactConfirmation;