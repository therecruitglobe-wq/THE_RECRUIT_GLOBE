
import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface CareerStrategyDetailProps {
  onBack: () => void;
  onEnquire: () => void;
}

const serviceName = "Career Strategy & Job Readiness Consulting";

const serviceFeatures = [
    {
        title: "Personalized Career Mapping",
        description: "We work with you to create a clear roadmap, identifying short-term and long-term goals aligned with your aspirations."
    },
    {
        title: "Strengths & Weakness Analysis",
        description: "Utilizing proven frameworks to help you understand your unique value proposition and areas for development."
    },
    {
        title: "Market & Industry Trend Analysis",
        description: "Providing insights into your target industry, including in-demand skills and growth opportunities."
    },
    {
        title: "Actionable Goal Setting",
        description: "Breaking down your ambitions into manageable, actionable steps to ensure continuous progress."
    },
    {
        title: "Personal Branding Strategy",
        description: "Guidance on how to build and communicate your personal brand across professional platforms."
    },
    {
        title: "Networking & Outreach Techniques",
        description: "Developing effective strategies for building meaningful professional connections to unlock new opportunities."
    }
];

const CareerStrategyDetail: React.FC<CareerStrategyDetailProps> = ({ onBack, onEnquire }) => {
  return (
    <section id="career-strategy-detail" className="py-20 bg-brand-light animate-fade-in">
      <div className="container mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-dark font-semibold mb-8 hover:text-brand-gold transition-colors"
          aria-label="Go back to services view"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Back to Services
        </button>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="font-serif text-4xl font-bold text-brand-dark mb-4">
                {serviceName}
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Navigate your professional journey with confidence. Our expert consultants provide personalized guidance to help you define your career path, identify growth opportunities, and develop a strategic plan for long-term success. We equip you with the tools and insights needed to thrive in today's competitive job market.
              </p>

              <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">Our Consulting Process</h3>
              
              <ul className="space-y-4 text-gray-700">
                {serviceFeatures.map(feature => (
                   <li key={feature.title} className="flex items-start">
                        <CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0 mt-1" />
                        <div>
                            <strong>{feature.title}:</strong>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                   </li>
                ))}
              </ul>
              <div className="mt-10">
                <button
                  onClick={onEnquire}
                  className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-block"
                >
                  Enquire About This Service
                </button>
              </div>
            </div>
            <div className="lg:w-1/3">
                <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1920&auto=format&fit=crop" 
                    alt="A consultant presenting a career strategy in a professional meeting" 
                    className="w-full h-full min-h-[400px] object-cover rounded-lg shadow-lg"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerStrategyDetail;