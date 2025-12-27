
import React from 'react';
import CVIcon from './icons/CVIcon';
import UsersIcon from './icons/UsersIcon';
import CompassIcon from './icons/CompassIcon';
import InterviewIcon from './icons/InterviewIcon';
import SearchIcon from './icons/SearchIcon';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

interface JobSeekerServicesProps {
    onServiceClick: (serviceTitle: string) => void;
}

const servicesData = [
    {
        icon: <CVIcon className="w-10 h-10 text-brand-gold" />,
        title: "International CV Optimization (ATS-Friendly)",
        description: "We tailor your CV to be ATS-friendly and appealing to international recruiters, highlighting your key strengths.",
        isClickable: true,
    },
    {
        icon: <UsersIcon className="w-10 h-10 text-brand-gold" />,
        title: "LinkedIn Profile Optimization",
        description: "Enhance your digital professional presence to attract the right opportunities and expand your network.",
        isClickable: true,
    },
    {
        icon: <CompassIcon className="w-10 h-10 text-brand-gold" />,
        title: "Career Strategy & Job Readiness Consulting",
        description: "Get expert guidance on your career path, identifying opportunities for growth and long-term success.",
        isClickable: true,
    },
    {
        icon: <InterviewIcon className="w-10 h-10 text-brand-gold" />,
        title: "Interview Preparation & Salary Guidance",
        description: "Gain confidence with mock interviews, feedback, and salary negotiation strategies to excel in any interview.",
        isClickable: true,
    },
    {
        icon: <SearchIcon className="w-10 h-10 text-brand-gold" />,
        title: "Job Search Enablement & Market Direction",
        description: "Leverage our market insights to effectively navigate your job search and target the right roles for your profile.",
        isClickable: true,
    }
];

const ServiceCard: React.FC<{ service: typeof servicesData[0] }> = ({ service }) => (
    <div className="bg-brand-light p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col text-center items-center h-full">
        <div className="mb-4">
            {service.icon}
        </div>
        <h3 className="font-serif text-xl font-bold text-brand-dark mb-3">{service.title}</h3>
        <p className="text-gray-600 flex-grow">{service.description}</p>
    </div>
);

const JobSeekerServices: React.FC<JobSeekerServicesProps> = ({ onServiceClick }) => {
  const [titleRef, isTitleVisible] = useAnimateOnScroll<HTMLDivElement>();
    
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="job-seeker-services" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div 
          ref={titleRef}
          className={`text-center mb-12 transition-all duration-1000 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <h2 className="font-serif text-4xl font-bold">Empowering Your Career Journey</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Specialized services designed to give job seekers a competitive edge in the global market.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => {
                const [cardRef, isCardVisible] = useAnimateOnScroll<HTMLButtonElement | HTMLDivElement>();
                const animationClasses = `transition-all duration-700 ${isCardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;
                const animationStyle = { transitionDelay: `${index * 100}ms` };

                if ('isClickable' in service && service.isClickable) {
                    return (
                        <button
                            ref={cardRef as React.RefObject<HTMLButtonElement>}
                            key={service.title}
                            onClick={() => onServiceClick(service.title)}
                            className={`text-left w-full h-full ${animationClasses}`}
                            style={animationStyle}
                            aria-label={`Learn more about ${service.title}`}
                        >
                            <ServiceCard service={service} />
                        </button>
                    )
                }
                return (
                    <div ref={cardRef as React.RefObject<HTMLDivElement>} key={service.title} className={animationClasses} style={animationStyle}>
                        <ServiceCard service={service} />
                    </div>
                );
            })}
        </div>

        <div className="text-center mt-16">
            <a 
                href="#contact"
                onClick={handleContactClick}
                className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-3 px-10 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-block"
            >
                Get in Touch to Learn More
            </a>
        </div>
      </div>
    </section>
  );
};

export default JobSeekerServices;
