
import React, { useState, useEffect } from 'react';

interface ContactFormProps {
  initialMessage?: string;
  isPage?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ initialMessage, isPage }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialMessage) {
        setFormState(prev => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert("Please fill out all fields.");
      return;
    }
    
    const recipientEmail = 'hr@therecruitglobe.com';
    const subject = `Contact Form Submission from ${formState.name}`;
    const body = `
Name: ${formState.name}
Email: ${formState.email}

Message:
${formState.message}
    `.trim();

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className={`text-lg text-center ${isPage ? 'text-gray-700' : 'text-gray-200'}`}>
          Thank you! Please send the pre-filled email that has opened in your mail application to complete your request.
        </p>
      </div>
    );
  }

  const inputBgClass = isPage ? 'bg-gray-50' : 'bg-white/20';
  const labelColorClass = isPage ? 'text-brand-dark' : 'text-gray-300';
  const inputBorderClass = isPage ? 'border-gray-300' : 'border-white/30';
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className={`block mb-2 ${labelColorClass}`}>Name</label>
        <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} required className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-brand-gold transition ${inputBgClass} ${inputBorderClass}`}/>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className={`block mb-2 ${labelColorClass}`}>Email</label>
        <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} required className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-brand-gold transition ${inputBgClass} ${inputBorderClass}`}/>
      </div>
      <div className="mb-4">
        <label htmlFor="message" className={`block mb-2 ${labelColorClass}`}>Message</label>
        <textarea id="message" name="message" rows={isPage ? 5 : 4} value={formState.message} onChange={handleChange} required className={`w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-brand-gold transition ${inputBgClass} ${inputBorderClass}`}></textarea>
      </div>
      <button type="submit" className="w-full bg-brand-gold text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition duration-300">
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
