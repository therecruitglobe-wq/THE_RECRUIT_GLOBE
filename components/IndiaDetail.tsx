
import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import ManufacturingIcon from './icons/ManufacturingIcon';
import ITIcon from './icons/ITIcon';
import FinanceIcon from './icons/FinanceIcon';
import HealthcareIcon from './icons/HealthcareIcon';

interface IndiaDetailProps {
  onBack: () => void;
  onDiscussStaffing: () => void;
}

const sectors = [
    {
        name: "Technology & IT Hubs",
        locations: "Bangalore, Hyderabad, Pune",
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766863807/IT_pjsow0.jpg"
    },
    {
        name: "Manufacturing & Engineering",
        locations: "Chennai, Pune, Gurugram",
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766864048/manufacturing_qpb54s.jpg"
    },
    {
        name: "Financial Services",
        locations: "Mumbai, Gurugram, Bangalore",
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766864274/financial_services_f84cgj.jpg"
    },
     {
        name: "Pharmaceuticals & Healthcare",
        locations: "Hyderabad, Ahmedabad, Mumbai",
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766864532/healthcare-pharma_fapopl.jpg"
    }
];

const sectorIcons: { [key: string]: React.ReactNode } = {
    "Technology & IT Hubs": <ITIcon className="w-8 h-8" />,
    "Manufacturing & Engineering": <ManufacturingIcon className="w-8 h-8" />,
    "Financial Services": <FinanceIcon className="w-8 h-8" />,
    "Pharmaceuticals & Healthcare": <HealthcareIcon className="w-8 h-8" />,
};

const IndiaDetail: React.FC<IndiaDetailProps> = ({ onBack, onDiscussStaffing }) => {
  return (
    <section id="india-detail" className="py-20 bg-brand-light animate-fade-in">
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
                Your Recruitment Partner in India
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                With its vast pool of skilled professionals and one of the world's fastest-growing economies, India is a powerhouse of talent. The Recruit Globe specializes in navigating this dynamic and diverse market. We connect global organizations with India's brightest minds, from its bustling tech hubs to its manufacturing corridors.
              </p>

              <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">Key Sector Expertise</h3>
              <div className="grid sm:grid-cols-2 gap-6 mt-6">
                {sectors.map(sector => (
                    <div key={sector.name} className="group relative rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden min-h-[250px] flex flex-col justify-end p-4">
                        <img src={sector.imageUrl} alt={sector.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        <div className="relative z-10" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                            <div className="text-white mb-2">{sectorIcons[sector.name]}</div>
                            <h4 className="font-bold text-white text-xl font-serif mb-1">{sector.name}</h4>
                            <p className="text-gray-200 text-sm">{sector.locations}</p>
                        </div>
                    </div>
                ))}
              </div>

              <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">Why Choose Us for India?</h3>
              
              <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Unmatched Talent Pool:</strong> Direct access to a vast network of highly skilled, English-speaking professionals, especially in STEM fields.</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Market Navigation:</strong> Expert guidance on navigating the complexities of the Indian job market and hiring practices.</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Scalable Solutions:</strong> Whether you're building a new team or finding niche experts, we offer scalable recruitment strategies.</span></li>
              </ul>
              <div className="mt-10">
                <button
                  onClick={onDiscussStaffing}
                  className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-block"
                >
                  Discuss Your India Staffing Needs
                </button>
              </div>
            </div>
            <div className="lg:w-1/3">
                <img 
                    src="https://res.cloudinary.com/dghlhdc9n/image/upload/v1766864828/corporate_yhxrt4.webp" 
                    alt="A corporate team collaborating in an office in India" 
                    className="w-full h-full min-h-[400px] object-cover rounded-lg shadow-lg"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndiaDetail;