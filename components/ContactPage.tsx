
import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ContactForm from './ContactForm';
import LinkedInIcon from './icons/LinkedInIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  return (
    <section id="contact-page" className="py-20 bg-brand-light animate-fade-in min-h-screen">
      <div className="container mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-dark font-semibold mb-8 hover:text-brand-gold transition-colors"
          aria-label="Go back to home page"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Back to Home
        </button>
        
        <div className="text-center mb-12">
            <h1 className="font-serif text-5xl font-bold">Get In Touch</h1>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                We're here to help and answer any question you might have. We look forward to hearing from you.
            </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-lg shadow-xl border-t-4 border-brand-gold">
            <div>
                <h3 className="font-serif text-2xl font-bold mb-6 text-brand-dark">Contact Details</h3>
                <div className="space-y-4 text-gray-700">
                    <p><strong>Address:</strong><br/>MyTime CoWork, 55 Lane-2, Westend Marg, Saiyad Ul Ajaib Village, Saket, New Delhi, Delhi 110030</p>
                    <p><strong>Phone:</strong><br/><a href="tel:+919354203405" className="text-brand-gold hover:underline">+91-9354203405</a></p>
                    <p><strong>Email:</strong><br/><a href="mailto:hr@therecruitglobe.com" className="text-brand-gold hover:underline">hr@therecruitglobe.com</a></p>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3">Connect with us directly</h4>
                     <div className="flex items-center gap-4">
                        <a href="https://wa.me/919354203405" target="_blank" rel="noopener noreferrer" aria-label="Connect on WhatsApp" className="text-gray-600 hover:text-brand-gold transition-colors">
                            <WhatsAppIcon className="w-8 h-8" />
                        </a>
                        <a href="https://www.linkedin.com/in/priyanka-m-243575114" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn" className="text-gray-600 hover:text-brand-gold transition-colors">
                            <LinkedInIcon className="w-8 h-8" />
                        </a>
                    </div>
                </div>
            </div>
            
            <div>
                 <h3 className="font-serif text-2xl font-bold mb-6 text-brand-dark">Send Us a Message</h3>
                 <ContactForm isPage={true} />
            </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
