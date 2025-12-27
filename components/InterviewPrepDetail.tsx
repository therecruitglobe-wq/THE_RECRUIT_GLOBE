
import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface InterviewPrepDetailProps {
  onBack: () => void;
  onEnquire: () => void;
}

const serviceName = "Interview Preparation & Salary Guidance";

const serviceFeatures = [
    {
        title: "Mock Interviews (Technical & Behavioral)",
        description: "Practice your interview skills in a realistic setting and receive constructive, actionable feedback from our experts."
    },
    {
        title: "Personalized Feedback & Coaching",
        description: "Receive tailored coaching to improve your answers, body language, and overall presentation."
    },
    {
        title: "Salary Negotiation Strategy",
        description: "Learn proven techniques to confidently negotiate your salary and benefits package to secure the compensation you deserve."
    },
    {
        title: "Common Questions & STAR Method",
        description: "Master the STAR method to structure compelling answers for behavioral questions and common interview queries."
    },
    {
        title: "Company-Specific Research Guidance",
        description: "We help you research potential employers thoroughly to ask insightful questions and demonstrate genuine interest."
    },
    {
        title: "Building Confidence & Presence",
        description: "Our coaching helps you overcome interview anxiety and project a confident, professional demeanor."
    }
];

const InterviewPrepDetail: React.FC<InterviewPrepDetailProps> = ({ onBack, onEnquire }) => {
  return (
    <section id="interview-prep-detail" className="py-20 bg-brand-light animate-fade-in">
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
                Land your dream job with confidence. Our comprehensive interview preparation service equips you with the skills, strategies, and confidence needed to excel in any interview scenario. From mastering tough questions to negotiating your salary, we provide the expert guidance to help you make a lasting impression and secure the best possible offer.
              </p>

              <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">How We Prepare You for Success</h3>
              
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
                    src="https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1920&auto=format&fit=crop" 
                    alt="Professionals engaged in a job interview" 
                    className="w-full h-full min-h-[400px] object-cover rounded-lg shadow-lg"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterviewPrepDetail;