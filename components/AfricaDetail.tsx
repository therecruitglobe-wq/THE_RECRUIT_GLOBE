
import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import MiningIcon from './icons/MiningIcon';
import EnergyIcon from './icons/EnergyIcon';
import ITIcon from './icons/ITIcon';
import FinanceIcon from './icons/FinanceIcon';
import OilGasIcon from './icons/OilGasIcon';
import AgricultureIcon from './icons/AgricultureIcon';
import ConstructionIcon from './icons/ConstructionIcon';
import { jobs } from '../data/jobs';
import type { Job } from '../types';

interface AfricaDetailProps {
  onBack: () => void;
  onDiscussStaffing: () => void;
  onViewJob: (job: Job) => void;
}

const regions = [
    {
        name: "South Africa",
        sectors: ["Mining", "Finance", "Technology"],
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766862882/South-Africa-e1634206886542-1170x630.jpg.optimal_axwxha.jpg"
    },
    {
        name: "Nigeria",
        sectors: ["Oil & Gas", "Technology", "Finance"],
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766863149/nigeria_wd8qif.jpg"
    },
    {
        name: "East Africa (Kenya)",
        sectors: ["Technology", "Agriculture", "Energy"],
        imageUrl: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=1920&auto=format&fit=crop"
    },
     {
        name: "North Africa",
        sectors: ["Energy", "Construction", "Manufacturing"],
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766863476/north_africa_oq4xnl.jpg"
    }
];

const sectorIcons: { [key: string]: React.ReactNode } = {
    "Mining": <MiningIcon className="w-6 h-6" />,
    "Finance": <FinanceIcon className="w-6 h-6" />,
    "Technology": <ITIcon className="w-6 h-6" />,
    "Oil & Gas": <OilGasIcon className="w-6 h-6" />,
    "Agriculture": <AgricultureIcon className="w-6 h-6" />,
    "Energy": <EnergyIcon className="w-6 h-6" />,
    "Construction": <ConstructionIcon className="w-6 h-6" />,
    "Manufacturing": <ConstructionIcon className="w-6 h-6" />
};

const AfricaDetail: React.FC<AfricaDetailProps> = ({ onBack, onDiscussStaffing, onViewJob }) => {
  const cfoJob = jobs.find(job => job.id === 7);

  return (
    <section id="africa-detail" className="py-20 bg-brand-light animate-fade-in">
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
                Your Recruitment Gateway to Africa
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                As one of the world's fastest-growing economic regions, Africa presents immense opportunities. The Recruit Globe is expertly positioned to help your organization navigate this diverse and dynamic landscape. We specialize in identifying and placing high-caliber talent across the continent's key industries, fueling growth and innovation for our partners.
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

              <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">Why Choose Us for Africa?</h3>
              
              <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Deep Local Knowledge:</strong> Our teams understand the nuances of each regional market, ensuring a culturally and professionally aligned fit.</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Pan-African Network:</strong> We have a robust network of top-tier candidates across the continent.</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Strategic Partnership:</strong> We work as an extension of your team to meet your strategic hiring goals in this high-potential region.</span></li>
              </ul>
              <div className="mt-10">
                <button
                  onClick={onDiscussStaffing}
                  className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-block"
                >
                  Discuss Your Africa Staffing Needs
                </button>
              </div>
            </div>
            <div className="lg:w-1/3">
               {cfoJob && (
                    <div className="bg-brand-light p-6 rounded-lg shadow-lg border-t-4 border-brand-gold sticky top-28">
                        <h3 className="font-serif text-xl font-bold text-brand-dark mb-4 text-center">Featured Executive Role</h3>
                        <img
                            src={cfoJob.imageUrl || 'https://images.unsplash.com/photo-1547471080-7cc2d5d88e93?q=80&w=1920&auto=format=fit=crop'}
                            alt={cfoJob.title}
                            className="w-full h-auto object-cover rounded-lg shadow-lg"
                        />
                        <div className="mt-4 text-center">
                            <h4 className="font-bold text-lg text-brand-dark">{cfoJob.title}</h4>
                            <p className="text-gray-600">{cfoJob.company}</p>
                            <button
                                onClick={() => onViewJob(cfoJob)}
                                className="w-full mt-4 bg-brand-dark text-white font-bold py-2 px-4 rounded-full hover:bg-brand-gold transition duration-300"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AfricaDetail;