
import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import ImageUploader from './ImageUploader';
import ImageGenerator from './ImageGenerator';

interface OilAndGasDetailProps {
  onBack: () => void;
  onDiscussStaffing: () => void;
}

const roles = [
    {
        title: "Drilling Engineers",
        description: "Managing drilling operations for exploration and production wells, optimizing performance and safety.",
        imageUrl: "https://img.freepik.com/free-photo/silhouette-offshore-oil-rig-drilling-platform-sea-against-dramatic-sunset-sky_1258-152431.jpg"
    },
    {
        title: "Reservoir Engineers",
        description: "Analyzing subsurface data to estimate oil and gas reserves and forecast future production.",
        imageUrl: "https://img.freepik.com/free-photo/multiethnic-engineers-discussing-while-using-laptop-oil-gas-refinery_625516-3694.jpg"
    },
    {
        title: "Process Safety Engineers",
        description: "Ensuring the safe design and operation of downstream facilities like refineries and chemical plants.",
        imageUrl: "https://img.freepik.com/free-photo/industry-concept-with-pipelines_23-2147743958.jpg"
    },
    {
        title: "Renewable Energy Specialists",
        description: "Developing and managing projects in wind, solar, and hydrogen to support the energy transition.",
        imageUrl: "https://img.freepik.com/free-photo/alternative-energy-source-wind-turbines-farm-field-generative-ai_191095-2603.jpg"
    }
];

const OilAndGasDetail: React.FC<OilAndGasDetailProps> = ({ onBack, onDiscussStaffing }) => {
  return (
    <section id="oil-gas-detail" className="py-20 bg-brand-light animate-fade-in">
      <div className="container mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-dark font-semibold mb-8 hover:text-brand-gold transition-colors"
          aria-label="Go back to industries view"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Back to Industries
        </button>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="font-serif text-4xl font-bold text-brand-dark mb-4">
                Specialized Recruitment for the Oil & Gas Sector
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                The Recruit Globe possesses deep-rooted expertise in the global Oil & Gas industry. We understand the unique challenges and technical demands of this complex sector, from upstream exploration to downstream refining and the emerging renewables landscape. Our dedicated team of consultants connects leading organizations with the highly skilled professionals needed to drive innovation and operational excellence.
              </p>

              <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">Roles We Specialize In</h3>
              <div className="grid sm:grid-cols-2 gap-6 mt-6">
                {roles.map(role => (
                    <div key={role.title} className="group relative rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden min-h-[220px] flex flex-col justify-end p-4">
                        <img src={role.imageUrl} alt={role.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                        <div className="relative z-10" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                            <h4 className="font-bold text-white text-xl font-serif">{role.title}</h4>
                            <p className="text-gray-200 text-sm mt-1">{role.description}</p>
                        </div>
                    </div>
                ))}
              </div>

              <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">Why Partner With Us for Oil & Gas?</h3>
              
              <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Global Network:</strong> Access to a vast, international pool of passive and active candidates.</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Technical Understanding:</strong> Our recruiters speak your language, ensuring a precise match of skills and experience.</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Tailored Solutions:</strong> From executive search to contract staffing, we adapt our services to your specific project needs.</span></li>
              </ul>
              <div className="mt-10">
                <button
                  onClick={onDiscussStaffing}
                  className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-block"
                >
                  Discuss Your Oil & Gas Staffing Needs
                </button>
              </div>
            </div>
            <div className="lg:w-1/3">
                <ImageUploader
                    defaultImageUrl="https://img.freepik.com/free-photo/offshore-oil-rig-platform-ocean-generative-ai_188544-9645.jpg"
                    altText="Engineer working on an oil rig"
                    storageKey="oil-gas-detail-image"
                />
            </div>
          </div>
        </div>

        <ImageGenerator />

      </div>
    </section>
  );
};

export default OilAndGasDetail;
