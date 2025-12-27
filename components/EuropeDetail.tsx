
import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import EngineeringIcon from './icons/EngineeringIcon';
import ITIcon from './icons/ITIcon';
import FinanceIcon from './icons/FinanceIcon';
import HealthcareIcon from './icons/HealthcareIcon';

interface EuropeDetailProps {
  onBack: () => void;
  onDiscussStaffing: () => void;
}

const regions = [
    {
        name: "United Kingdom",
        sectors: ["Finance", "Technology", "Life Sciences"],
        imageUrl: "https://images.unsplash.com/photo-1529655683826-1c21ef24a5b8?q=80&w=1920&auto=format&fit=crop"
    },
    {
        name: "Germany",
        sectors: ["Engineering", "Automotive", "Technology"],
        imageUrl: "https://images.unsplash.com/photo-1528642721014-a3c3b030438a?q=80&w=1920&auto=format&fit=crop"
    },
    {
        name: "France",
        sectors: ["Aerospace", "Luxury", "Technology"],
        imageUrl: "https://images.unsplash.com/photo-1502602898457-385429124264?q=80&w=1920&auto=format&fit=crop"
    },
     {
        name: "The Nordics",
        sectors: ["Technology", "Renewable Energy", "Design"],
        imageUrl: "https://images.unsplash.com/photo-1516962322394-2941513c0138?q=80&w=1920&auto=format&fit=crop"
    }
];

const sectorIcons: { [key: string]: React.ReactNode } = {
    "Finance": <FinanceIcon className="w-6 h-6" />,
    "Technology": <ITIcon className="w-6 h-6" />,
    "Life Sciences": <HealthcareIcon className="w-6 h-6" />,
    "Engineering": <EngineeringIcon className="w-6 h-6" />,
    "Automotive": <EngineeringIcon className="w-6 h-6" />,
    "Aerospace": <EngineeringIcon className="w-6 h-6" />,
    "Luxury": <FinanceIcon className="w-6 h-6" />,
    "Renewable Energy": <EngineeringIcon className="w-6 h-6" />,
    "Design": <ITIcon className="w-6 h-6" />
};

const EuropeDetail: React.FC<EuropeDetailProps> = ({ onBack, onDiscussStaffing }) => {
  return (
    <section id="europe-detail" className="py-20 bg-brand-light animate-fade-in">
      <div className="container mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-dark font-semibold mb-8 hover:text-brand-gold transition-colors"
          aria-label="Go back to global reach view"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Back to Global Reach
        </button>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="font-serif text-4xl font-bold text-brand-dark mb-4">
                Your Recruitment Bridge to Europe
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                The Recruit Globe provides sophisticated recruitment solutions across the diverse and innovative European market. From the financial hubs of London to the tech scenes in Berlin and Paris, we connect exceptional talent with leading companies. Our nuanced understanding of each country's unique business culture and regulatory environment makes us your ideal recruitment partner in Europe.
              </p>

              <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">Key Markets & Sector Expertise</h3>
              <div className="grid sm:grid-cols-2 gap-6 mt-6">
                {regions.map(region => (
                    <div key={region.name} className="group relative rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden min-h-[250px] flex flex-col justify-end p-4">
                        <img src={region.imageUrl} alt={region.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                        <div className="relative z-10" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                            <h4 className="font-bold text-white text-xl font-serif mb-3">{region.name}</h4>
                            <div className="flex flex-wrap gap-2">
                                {region.sectors.map(sector => (
                                    <div key={sector} className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                                        {sectorIcons[sector]}
                                        <span>{sector}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
              </div>

              <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">Why Choose Us for Europe?</h3>
              
              <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Cross-Border Expertise:</strong> We seamlessly manage international placements, handling the complexities of hiring across different European nations.</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Multilingual Network:</strong> Our talent pool includes multilingual professionals ready to excel in a global business environment.</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Industry Specialization:</strong> Deep knowledge in Europe's key growth sectors, including technology, finance, and engineering.</span></li>
              </ul>
              <div className="mt-10">
                <button
                  onClick={onDiscussStaffing}
                  className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-block"
                >
                  Discuss Your Europe Staffing Needs
                </button>
              </div>
            </div>
            <div className="lg:w-1/3">
                <img 
                    src="https://images.unsplash.com/photo-1582298539691-3e5c941785ee?q=80&w=1920&auto=format&fit=crop" 
                    alt="A modern office building in a European city" 
                    className="w-full h-full min-h-[400px] object-cover rounded-lg shadow-lg"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EuropeDetail;
