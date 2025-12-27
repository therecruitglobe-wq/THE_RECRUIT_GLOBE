
import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface CVOptimizationDetailProps {
  onBack: () => void;
  onEnquire: () => void;
}

const serviceName = "International CV Optimization (ATS-Friendly)";

const serviceFeatures = [
    {
        title: "ATS-Friendly Formatting",
        description: "We structure your CV to pass through Applicant Tracking Systems (ATS) used by over 90% of major companies."
    },
    {
        title: "Keyword Optimization",
        description: "We strategically embed industry-specific keywords to ensure your CV ranks high for relevant job searches."
    },
    {
        title: "Professional Summary",
        description: "Crafting a compelling summary that grabs a recruiter's attention in the first 6 seconds."
    },
    {
        title: "Accomplishment-Driven Content",
        description: "Transforming your duties into impactful, metric-based achievements that demonstrate your value."
    },
    {
        title: "International Standards",
        description: "Adapting your CV's format, tone, and content to meet the expectations of global employers."
    },
    {
        title: "Visual & Structural Polish",
        description: "Ensuring a clean, professional, and easily scannable layout that makes a strong first impression."
    }
];

const CVOptimizationDetail: React.FC<CVOptimizationDetailProps> = ({ onBack, onEnquire }) => {
  return (
    <section id="cv-optimization-detail" className="py-20 bg-brand-light animate-fade-in">
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
                In today's competitive global job market, a standard CV is not enough. Our optimization service is designed to make your profile stand out to international recruiters and pass through sophisticated Applicant Tracking Systems (ATS). We refine your CV to highlight your strengths, quantify your achievements, and align your profile with your target roles.
              </p>

              <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">What We Offer</h3>
              
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
                    src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1920&auto=format&fit=crop" 
                    alt="A professional working on a CV on a laptop" 
                    className="w-full h-full min-h-[400px] object-cover rounded-lg shadow-lg"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CVOptimizationDetail;