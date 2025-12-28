
import React from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

interface AboutProps {
  onLearnMore: () => void;
}

const About: React.FC<AboutProps> = ({ onLearnMore }) => {
  const [ref, isVisible] = useAnimateOnScroll<HTMLDivElement>();
  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div
        ref={ref}
        className={`container mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2 w-full">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://res.cloudinary.com/dghlhdc9n/image/upload/v1766923756/WhatsApp_Image_2025-12-11_at_16.54.39_6977c5b3_vnwmvr.jpg"
                alt="A professional team in a modern office, representing a strategic recruitment partnership."
                className="w-full h-full object-cover aspect-video"
              />
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="font-serif text-4xl font-bold mb-4">Your Strategic Recruitment Partner</h2>
            <p className="text-lg text-gray-700 mb-6">
              Founded on principles of integrity and excellence, The Recruit Globe is more than a recruitment agency. We are career architects and growth partners, building lasting relationships that foster success for both individuals and organizations worldwide.
            </p>
            <button
              onClick={onLearnMore}
              className="bg-brand-dark text-white font-bold py-3 px-8 rounded-full hover:bg-brand-gold transition duration-300 inline-block transform hover:scale-105"
            >
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;