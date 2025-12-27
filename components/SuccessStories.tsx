
import React from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

interface SuccessStoriesProps {
    onNavigate: (view: string) => void;
}

const SuccessStories: React.FC<SuccessStoriesProps> = ({ onNavigate }) => {
  const [ref, isVisible] = useAnimateOnScroll<HTMLDivElement>();

  return (
    <section id="success" className="py-20 bg-white overflow-hidden">
      <div
        ref={ref}
        className={`container mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2">
            <h2 className="font-serif text-4xl font-bold mb-4">Building Success, Together</h2>
            <p className="text-lg text-gray-700 mb-6">
              Our mission is to forge powerful connections that lead to outstanding achievements. We partner with our clients to understand their unique vision and challenges, delivering talent solutions that drive growth and create lasting value.
            </p>
            <p className="text-gray-600 mb-8">
              This is more than just recruitment; it's about building the future of your organization, one successful placement at a time. See our commitment to excellence in action.
            </p>
            <button
              onClick={() => onNavigate('partnerPage')}
              className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-block"
            >
              Partner With Us
            </button>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1920&auto=format&fit=crop"
                alt="Business partners collaborating and building success together"
                className="w-full h-full object-cover aspect-video"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
