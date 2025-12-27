
import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface LinkedInOptimizationDetailProps {
  onBack: () => void;
  onEnquire: () => void;
}

const serviceName = "LinkedIn Profile Optimization";

const serviceFeatures = [
    {
        title: "Keyword-Rich Headline & Summary",
        description: "Crafting a compelling narrative that showcases your expertise and makes you discoverable to recruiters."
    },
    {
        title: "Optimized Experience Section",
        description: "Highlighting your key achievements with quantifiable results to demonstrate your impact."
    },
    {
        title: "Skills & Endorsements Strategy",
        description: "Strategically selecting and arranging skills to align with your career goals and attract endorsements."
    },
    {
        title: "Custom URL & Professional Headshot Guidance",
        description: "Ensuring every element of your profile, from your URL to your photo, conveys professionalism."
    },
    {
        title: "Network Building & Engagement Tips",
        description: "Providing strategies to grow your professional network and engage with content effectively."
    },
    {
        title: "Visibility & Search Ranking",
        description: "Optimizing all sections of your profile to improve your ranking in LinkedIn and recruiter searches."
    }
];

const LinkedInOptimizationDetail: React.FC<LinkedInOptimizationDetailProps> = ({ onBack, onEnquire }) => {
  return (
    <section id="linkedin-optimization-detail" className="py-20 bg-brand-light animate-fade-in">
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
                Your LinkedIn profile is your digital handshake. In today's professional world, it's often the first impression you make on recruiters and potential employers. Our optimization service transforms your profile into a powerful career tool that tells your professional story, highlights your achievements, and attracts the right opportunities.
              </p>

              <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">How We Enhance Your Profile</h3>
              
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
                    src="https://images.unsplash.com/photo-1611944212129-29955ae43b1c?q=80&w=1920&auto=format&fit=crop" 
                    alt="A professional's LinkedIn profile on a laptop screen" 
                    className="w-full h-full min-h-[400px] object-cover rounded-lg shadow-lg"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinkedInOptimizationDetail;