
import React from 'react';
import InterviewIcon from './icons/InterviewIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

const Footer: React.FC = () => {
  const [ref, isVisible] = useAnimateOnScroll<HTMLDivElement>();
  return (
    <footer className="bg-white py-8 overflow-hidden">
      <div 
        ref={ref}
        className={`container mx-auto px-6 text-center text-gray-600 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="flex justify-center items-center mb-4">
            <InterviewIcon className="h-8 w-8 text-brand-gold" />
            <span className="ml-2 font-serif text-2xl font-bold text-brand-dark">
              The Recruit Globe
            </span>
        </div>
        <p className="mb-4 tracking-widest text-sm uppercase text-brand-gold">
          Finding. Connecting. Building Success.
        </p>
        <div className="flex justify-center gap-6 my-6">
            <a href="https://wa.me/919354203405" target="_blank" rel="noopener noreferrer" aria-label="Connect on WhatsApp" className="text-gray-500 hover:text-brand-gold transition-colors">
                <WhatsAppIcon className="w-7 h-7" />
            </a>
            <a href="https://www.linkedin.com/in/priyanka-m-243575114" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn" className="text-gray-500 hover:text-brand-gold transition-colors">
                <LinkedInIcon className="w-7 h-7" />
            </a>
        </div>
        <p>&copy; {new Date().getFullYear()} The Recruit Globe. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
