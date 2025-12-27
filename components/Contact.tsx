
import React from 'react';
import LinkedInIcon from './icons/LinkedInIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
import ContactForm from './ContactForm';

interface ContactProps {
  contactMessage?: string;
}

const Contact: React.FC<ContactProps> = ({ contactMessage }) => {
  const [titleRef, isTitleVisible] = useAnimateOnScroll<HTMLDivElement>();
  const [formRef, isFormVisible] = useAnimateOnScroll<HTMLDivElement>();

  return (
    <section id="contact" className="py-20 bg-brand-dark text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div 
            ref={titleRef}
            className={`text-center mb-12 transition-all duration-1000 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <h2 className="font-serif text-4xl font-bold">Let's Connect</h2>
          <p className="text-lg text-gray-300 mt-4 max-w-3xl mx-auto">
            Whether you're looking to hire top talent, find your next career opportunity, or discuss a partnership, we're here to help.
          </p>
        </div>
        <div 
            ref={formRef}
            className={`max-w-4xl mx-auto grid md:grid-cols-2 gap-12 bg-white/10 p-8 rounded-lg transition-all duration-1000 ${isFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div>
            <h3 className="font-serif text-2xl font-bold mb-4 text-brand-gold">Contact Information</h3>
            <p className="text-gray-300 mb-2"><span className="font-semibold">Address:</span> MyTime CoWork, 55 Lane-2, Westend Marg, Saiyad Ul Ajaib Village, Saket, New Delhi, Delhi 110030</p>
            <p className="text-gray-300 mb-2"><span className="font-semibold">Phone:</span> +91-9354203405</p>
            <p className="text-gray-300 mb-2"><span className="font-semibold">Email:</span> hr@therecruitglobe.com</p>
            <div className="mt-6">
                <h4 className="font-semibold text-gray-200 mb-3">Connect with us directly</h4>
                <div className="flex items-center gap-4">
                    <a href="https://wa.me/919354203405" target="_blank" rel="noopener noreferrer" aria-label="Connect on WhatsApp" className="text-gray-300 hover:text-brand-gold transition-colors">
                        <WhatsAppIcon className="w-8 h-8" />
                    </a>
                    <a href="https://www.linkedin.com/in/priyanka-m-243575114" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn" className="text-gray-300 hover:text-brand-gold transition-colors">
                        <LinkedInIcon className="w-8 h-8" />
                    </a>
                </div>
            </div>
          </div>
          <ContactForm initialMessage={contactMessage} />
        </div>
      </div>
    </section>
  );
};

export default Contact;
