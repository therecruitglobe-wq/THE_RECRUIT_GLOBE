
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
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920&auto=format=fit=crop"
                className="w-full h-full object-cover aspect-video"
                aria-label="A diverse team of professionals collaborating on a project, showcasing The Recruit Globe's values."
              >
                <source src="https://videos.pexels.com/video-files/3209828/3209828-hd.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
