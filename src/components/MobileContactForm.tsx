import React, { useState } from 'react';

const MobileContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    'bot-field': '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.email) newErrors.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Please enter a valid email.';
    if (!formData.message) newErrors.message = 'Message is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) {
      setToastMessage('Please correct the errors above.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        setToastMessage('Message sent successfully!');
        setShowToast(true);
        setFormData({ name: '', email: '', message: '', 'bot-field': '' });
        setTimeout(() => setShowToast(false), 4000);
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (err: any) {
      setToastMessage(err.message || 'Failed to send message. Please try again.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {showToast && (
        <div
          className="toast fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-accent text-white px-6 py-3 rounded-lg shadow-lg z-50 min-w-[280px] text-center"
          role="alert"
          aria-live="assertive"
        >
          {toastMessage}
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="ml-4 text-white hover:text-opacity-80"
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-text-dim mb-1 text-sm font-medium">
          Your Name <span aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={`w-full p-3 border ${
            errors.name ? 'border-red-500' : 'border-surface'
          } rounded focus:outline-none focus-glow text-base`}
        />
        {errors.name && (
          <p id="name-error" className="text-red-500 text-xs mt-1" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-text-dim mb-1 text-sm font-medium">
          Your Email <span aria-hidden="true">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`w-full p-3 border ${
            errors.email ? 'border-red-500' : 'border-surface'
          } rounded focus:outline-none focus-glow text-base`}
        />
        {errors.email && (
          <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-text-dim mb-1 text-sm font-medium">
          Your Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`w-full p-3 border ${
            errors.message ? 'border-red-500' : 'border-surface'
          } rounded focus:outline-none focus-glow text-base`}
        />
        {errors.message && (
          <p id="message-error" className="text-red-500 text-xs mt-1" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot field - hidden from users */}
      <div className="hidden">
        <label htmlFor="bot-field" className="sr-only">
          Leave this field blank
        </label>
        <input
          type="text"
          id="bot-field"
          name="bot-field"
          value={formData['bot-field']}
          onChange={handleChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-accent text-white px-6 py-3 rounded text-base hover:bg-accent-alt transition-colors duration-300 disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 min-h-[44px]"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default MobileContactForm;
---