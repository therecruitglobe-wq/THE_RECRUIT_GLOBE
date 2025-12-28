
import React from 'react';

interface HeroProps {
  onNavigate: (view: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center text-white p-6 overflow-hidden">
      {/* Background Video and Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1920&auto=format&fit=crop"
          className="w-full h-full object-cover"
          aria-hidden="true"
          role="presentation"
        >
          <source src="https://videos.pexels.com/video-files/853880/853880-hd.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Subtle Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-brand-dark/20 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center w-full">
        <div className="animate-fade-in-down">
            <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-white" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.6)' }}>
                The Recruit Globe
            </h1>
            <p className="mt-4 text-lg md:text-xl tracking-widest uppercase text-brand-gold font-semibold" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                Finding. Connecting. Building Success.
            </p>
        </div>
        
        <div className="mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <a
            href="#job-seeker-services"
            onClick={(e) => handleScrollClick(e, 'job-seeker-services')}
            className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Find Your Next Role
          </a>
          <button
            onClick={() => onNavigate('hiringForm')}
            className="bg-transparent border-2 border-white hover:bg-white hover:text-brand-dark text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Hire Top Talent
          </button>
          <a
            href="#contact"
            onClick={(e) => handleScrollClick(e, 'contact')}
            className="bg-transparent border-2 border-white hover:bg-white hover:text-brand-dark text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Connect with Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;