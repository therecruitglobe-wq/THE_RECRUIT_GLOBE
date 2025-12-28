
import React from 'react';
import BriefcaseIcon from './icons/BriefcaseIcon';
import UsersIcon from './icons/UsersIcon';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

interface ServicesProps {
  onFindTalentClick: () => void;
  onExploreOpportunitiesClick: () => void;
}

const Services: React.FC<ServicesProps> = ({ onFindTalentClick, onExploreOpportunitiesClick }) => {
  const [titleRef, isTitleVisible] = useAnimateOnScroll<HTMLDivElement>();
  const [seekersRef, isSeekersVisible] = useAnimateOnScroll<HTMLDivElement>();
  const [employersRef, isEmployersVisible] = useAnimateOnScroll<HTMLDivElement>();

  return (
    <section id="services" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div 
            ref={titleRef}
            className={`text-center transition-all duration-1000 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <h2 className="font-serif text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-20">
            We offer tailored recruitment solutions for both employers and job seekers, ensuring a perfect fit for long-term success.
          </p>
        </div>

        {/* For Job Seekers Section */}
        <div 
            ref={seekersRef}
            className={`flex flex-col md:flex-row items-center gap-12 mb-20 transition-all duration-1000 ${isSeekersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="md:w-1/2 w-full">
            <img 
              src="https://res.cloudinary.com/dghlhdc9n/image/upload/v1766924221/jobseekers_je7h5h.jpg" 
              alt="Job Seekers collaborating in a professional setting" 
              className="rounded-lg shadow-2xl w-full h-auto object-cover" 
              style={{maxHeight: '400px'}} 
            />
          </div>
          <div className="md:w-1/2">
            <UsersIcon className="w-12 h-12 text-brand-gold mb-4" />
            <h3 className="font-serif text-3xl font-bold mb-4">For Job Seekers</h3>
            <p className="text-gray-600 mb-6">
              Unlock your career potential. We connect you with exclusive opportunities at leading companies, providing expert guidance and support throughout your job search.
            </p>
            <button 
              onClick={onExploreOpportunitiesClick}
              className="bg-brand-dark text-white font-bold py-3 px-8 rounded-full hover:bg-brand-gold transition duration-300 inline-block transform hover:scale-105"
            >
              Explore Opportunities
            </button>
          </div>
        </div>

        {/* For Employers Section */}
        <div 
            ref={employersRef}
            className={`flex flex-col md:flex-row-reverse items-center gap-12 transition-all duration-1000 ${isEmployersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="md:w-1/2 w-full">
            <img 
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1920&auto-format&fit=crop" 
              alt="Employers in a professional meeting" 
              className="rounded-lg shadow-2xl w-full h-auto object-cover" 
              style={{maxHeight: '400px'}} 
            />
          </div>
          <div className="md:w-1/2">
            <BriefcaseIcon className="w-12 h-12 text-brand-gold mb-4" />
            <h3 className="font-serif text-3xl font-bold mb-4">For Employers</h3>
            <p className="text-gray-600 mb-6">
              Find the talent that will drive your business forward. Our bespoke recruitment solutions identify and attract top-tier professionals who align with your company's vision and culture.
            </p>
            <button 
              onClick={onFindTalentClick}
              className="bg-brand-dark text-white font-bold py-3 px-8 rounded-full hover:bg-brand-gold transition duration-300 inline-block transform hover:scale-105"
            >
              Find Talent
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;