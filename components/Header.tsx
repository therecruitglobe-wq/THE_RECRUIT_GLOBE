
import React, { useState, useEffect } from 'react';
import InterviewIcon from './icons/InterviewIcon';

interface HeaderProps {
  onNavigate: (view: string, hash?: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 10) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#partnership', label: 'Partner With Us' },
    { href: '#verticals', label: 'Industries' },
    { href: '#jobs', label: 'Job Openings' },
    { href: '#about', label: 'About Us' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleLinkClick = (link: { href?: string; label: string }) => {
    if (link.label === 'Industries') {
      onNavigate('industriesPage');
    } else if (link.label === 'Contact') {
      onNavigate('contactPage');
    } else if (link.label === 'About Us') {
      onNavigate('aboutPage');
    } else if (link.label === 'Partner With Us') {
      onNavigate('partnerPage');
    } else if (link.href) {
      onNavigate('main', link.href);
    }
    setIsOpen(false);
  };

  return (
    <header className={`bg-brand-light/80 backdrop-blur-md sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => handleLinkClick({ href: '#home', label: 'Home' })} className="flex items-center space-x-2">
            <InterviewIcon className="h-8 w-8 text-brand-gold" />
            <span className="font-serif text-2xl font-bold text-brand-dark tracking-wide">
              The Recruit Globe
            </span>
          </button>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                className="text-brand-dark hover:text-brand-gold transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-dark focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
               <button
                key={link.label}
                onClick={() => handleLinkClick(link)}
                className="text-brand-dark hover:text-brand-gold transition-colors duration-300 py-2 text-center"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
