
import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import ImageUploader from './ImageUploader';

interface ManufacturingDetailProps {
  onBack: () => void;
  onDiscussStaffing: () => void;
}

const roles = [
    {
        title: "Production Managers",
        description: "Overseeing the entire production process, ensuring efficiency, quality, and safety on the factory floor.",
        imageUrl: "https://img.freepik.com/free-photo/production-line-with-multiple-industrial-robots_91128-4678.jpg"
    },
    {
        title: "Quality Assurance Engineers",
        description: "Implementing and maintaining quality control systems to ensure products meet stringent standards.",
        imageUrl: "https://img.freepik.com/free-photo/young-maintenance-technician-servicing-robotic-arm-welding-machine-his-factory_625516-1188.jpg"
    },
    {
        title: "Supply Chain Specialists",
        description: "Managing logistics, inventory, and procurement to create a seamless and cost-effective supply chain.",
        imageUrl: "https://img.freepik.com/free-photo/huge-distribution-warehouse-with-high-shelves_1268-29114.jpg"
    },
    {
        title: "Automation Engineers",
        description: "Designing and implementing robotic and automated systems to enhance production efficiency and safety.",
        imageUrl: "https://img.freepik.com/free-photo/robotic-arm-producing-automotive-parts_91128-4680.jpg"
    }
];

const ManufacturingDetail: React.FC<ManufacturingDetailProps> = ({ onBack, onDiscussStaffing }) => {
  return (
    <section id="manufacturing-detail" className="py-20 bg-brand-light animate-fade-in">
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
                Building Excellence: Manufacturing Recruitment
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                The manufacturing sector is the backbone of the global economy, demanding a workforce that is skilled, efficient, and innovative. The Recruit Globe specializes in sourcing top-tier talent for the modern manufacturing landscape, from lean production experts to automation engineers who are shaping the factories of the future.
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

              <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">Why Partner With Us for Manufacturing?</h3>
              
              <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Industry 4.0 Ready:</strong> We source candidates proficient in modern manufacturing technologies, including IoT, robotics, and automation.</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Safety & Compliance Focus:</strong> Our candidates are vetted for their understanding of critical safety standards and regulatory compliance.</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>End-to-End Talent:</strong> From the factory floor to the executive suite, we cover all levels of manufacturing recruitment.</span></li>
              </ul>
              <div className="mt-10">
                <button
                  onClick={onDiscussStaffing}
                  className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-block"
                >
                  Discuss Your Manufacturing Staffing Needs
                </button>
              </div>
            </div>
            <div className="lg:w-1/3">
                <ImageUploader
                    defaultImageUrl="https://img.freepik.com/free-photo/robotic-arm-production-line-factory-conveyor-belt_91128-4663.jpg"
                    altText="A robotic arm on a modern assembly line"
                    storageKey="manufacturing-detail-image"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingDetail;
