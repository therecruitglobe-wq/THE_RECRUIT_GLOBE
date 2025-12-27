
import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface JobSearchEnablementDetailProps {
  onBack: () => void;
  onEnquire: () => void;
}

const serviceName = "Job Search Enablement & Market Direction";

const serviceFeatures = [
    {
        title: "In-Depth Market Analysis",
        description: "We provide current insights into hiring trends, in-demand skills, and salary benchmarks for your target industry."
    },
    {
        title: "Targeted Company Lists",
        description: "Identifying and curating lists of potential employers that align with your career goals and company culture preferences."
    },
    {
        title: "Effective Application Strategies",
        description: "Guidance on tailoring your applications for specific roles and companies to maximize your response rate."
    },
    {
        title: "Access to the Hidden Job Market",
        description: "Leveraging our extensive network to uncover opportunities that are not publicly advertised."
    },
    {
        title: "Networking & Outreach Coaching",
        description: "Developing personalized strategies for reaching out to key contacts and building a powerful professional network."
    },
    {
        title: "Personal Brand Alignment",
        description: "Ensuring your professional brand is consistent and compelling across all platforms to attract the right opportunities."
    }
];

const JobSearchEnablementDetail: React.FC<JobSearchEnablementDetailProps> = ({ onBack, onEnquire }) => {
  return (
    <section id="job-search-detail" className="py-20 bg-brand-light animate-fade-in">
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
                Navigate the complexities of the modern job market with a strategic advantage. Our Job Search Enablement service provides you with the market intelligence, tools, and strategies needed to conduct a highly effective and targeted job search. We help you move beyond reactive applications to proactively uncover and pursue the best opportunities for your career.
              </p>

              <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">How We Guide Your Search</h3>
              
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
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1920&auto=format&fit=crop" 
                    alt="Professionals collaborating around a map, planning a strategy" 
                    className="w-full h-full min-h-[400px] object-cover rounded-lg shadow-lg"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobSearchEnablementDetail;