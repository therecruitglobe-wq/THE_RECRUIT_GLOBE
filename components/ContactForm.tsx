
import React, { useState, useEffect } from 'react';
import WhatsAppIcon from './icons/WhatsAppIcon';

interface ContactFormProps {
  initialMessage?: string;
  isPage?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ initialMessage, isPage }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: initialMessage || '' });
  const [error, setError] = useState<string | null>(null);

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
      setError("Please fill out all fields.");
      return;
    }
    
    setError(null);

    const message = `New Contact Form Submission
-----------------------------------
Name: ${formState.name}
Email: ${formState.email}
Message:
${formState.message}`;

    const whatsappUrl = `https://wa.me/919354203405?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setFormState({ name: '', email: '', message: initialMessage || '' });
  };

  const inputBgClass = isPage ? 'bg-gray-50' : 'bg-white/20';
  const labelColorClass = isPage ? 'text-brand-dark' : 'text-gray-300';
  const inputBorderClass = isPage ? 'border-gray-300' : 'border-white/30';
  
  return (
    <form onSubmit={handleSubmit} noValidate>
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
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      <button type="submit" className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition duration-300 flex items-center justify-center gap-2">
        <WhatsAppIcon className="w-5 h-5" />
        Send via WhatsApp
      </button>
    </form>
  );
};

export default ContactForm;