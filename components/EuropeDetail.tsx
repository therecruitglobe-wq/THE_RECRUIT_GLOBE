
import React, { useState } from 'react';
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

const initialRegions = [
    {
        name: "United Kingdom",
        sectors: ["Finance", "Technology", "Life Sciences"],
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766865106/United-Kingdom_osjhen.jpg",
    },
    {
        name: "Germany",
        sectors: ["Engineering", "Automotive", "Technology"],
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766865460/germany_lbrynb.jpg",
    },
    {
        name: "France",
        sectors: ["Aerospace", "Luxury", "Technology"],
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766865648/france_image_kfosnv.jpg",
    },
     {
        name: "The Nordics",
        sectors: ["Technology", "Renewable Energy", "Design"],
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766865965/Stockholm-Nordics-cost-feature-image_ik9xwx.webp",
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

const RegionCard: React.FC<{ region: typeof initialRegions[0] }> = ({ region }) => {
    return (
        <div className="group relative rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden min-h-[250px] flex flex-col justify-end p-4">
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
    );
};

const EuropeDetail: React.FC<EuropeDetailProps> = ({ onBack, onDiscussStaffing }) => {
  const [regions] = useState(initialRegions);

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
          <div>
            <div>
              <h2 className="font-serif text-4xl font-bold text-brand-dark mb-4">
                Your Recruitment Bridge to Europe
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                The Recruit Globe provides sophisticated recruitment solutions across the diverse and innovative European market. From the financial hubs of London to the tech scenes in Berlin and Paris, we connect exceptional talent with leading companies. Our nuanced understanding of each country's unique business culture and regulatory environment makes us your ideal recruitment partner in Europe.
              </p>

              <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">Key Markets & Sector Expertise</h3>
              <div className="grid sm:grid-cols-2 gap-6 mt-6">
                {regions.map(region => (
                  <RegionCard
                    key={region.name}
                    region={region}
                  />
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
              <img 
                src="https://res.cloudinary.com/dghlhdc9n/image/upload/v1766866235/675883_Watermark-Place_London_WE2159_45_CW_Magazin_Markt_und_Meinung_bueroimmobilienmaerkte_2024_2400x1350_ftvf1q.jpg" 
                alt="Watermark Place, a modern office building in London" 
                className="w-full h-auto object-cover rounded-lg shadow-lg mt-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EuropeDetail;