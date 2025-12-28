
import React, { useState } from 'react';
import GlobeAltIcon from './icons/GlobeAltIcon';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

interface GlobalReachProps {
    onRegionClick: (regionName: string) => void;
}

const initialRegions = [
  {
    name: 'India',
    description: 'Tapping into a vast pool of skilled professionals and emerging tech talent across the subcontinent.',
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1920&auto=format&fit=crop',
    isClickable: true,
  },
  {
    name: 'Middle East',
    description: 'Connecting visionary projects with top-tier experts in construction, oil & gas, and finance.',
    imageUrl: 'https://res.cloudinary.com/dghlhdc9n/image/upload/v1766862460/me_c2pkh3.jpg',
    isClickable: true,
  },
  {
    name: 'Africa',
    description: 'Fueling growth in emerging markets by sourcing leadership for mining, energy, and infrastructure sectors.',
    imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1920&auto=format&fit=crop',
    isClickable: true,
  },
  {
    name: 'Europe',
    description: 'Navigating diverse markets to find exceptional talent in technology, healthcare, and finance across the continent.',
    imageUrl: 'https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?q=80&w=1920&auto=format&fit=crop',
    isClickable: true,
  },
];

interface Region {
    name: string;
    description: string;
    imageUrl: string;
    isClickable: boolean;
}

const RegionCard: React.FC<{ region: Region }> = ({ region }) => {
    return (
        <div className="group relative rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden min-h-[300px] flex flex-col justify-end p-6 h-full">
            <img 
                src={region.imageUrl} 
                alt={`A cityscape representing ${region.name}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            <div className="relative z-10" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">{region.name}</h3>
                <p className="text-gray-200">{region.description}</p>
            </div>
        </div>
    );
};

const GlobalReach: React.FC<GlobalReachProps> = ({ onRegionClick }) => {
  const [regions] = useState<Region[]>(initialRegions);
  const [titleRef, isTitleVisible] = useAnimateOnScroll<HTMLDivElement>();

  return (
    <section id="global-reach" className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div 
            ref={titleRef}
            className={`text-center mb-12 transition-all duration-1000 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <GlobeAltIcon className="w-12 h-12 mx-auto text-brand-gold mb-4" />
          <h2 className="font-serif text-4xl font-bold">Our Global Reach</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            With a strategic presence in key international markets, we connect talent and opportunity across continents.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {regions.map((region, index) => {
                const [cardRef, isCardVisible] = useAnimateOnScroll<HTMLButtonElement | HTMLDivElement>();
                const animationClasses = `transition-all duration-700 ${isCardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;
                const animationStyle = { transitionDelay: `${index * 100}ms` };
                
                if (region.isClickable) {
                    return (
                        <button 
                            ref={cardRef as React.RefObject<HTMLButtonElement>}
                            key={region.name} 
                            onClick={() => onRegionClick(region.name)}
                            className={`text-left w-full h-full ${animationClasses}`}
                            style={animationStyle}
                            aria-label={`Learn more about our services in ${region.name}`}
                        >
                            <RegionCard region={region} />
                        </button>
                    );
                }
                return (
                    <div ref={cardRef as React.RefObject<HTMLDivElement>} key={region.name} className={`h-full ${animationClasses}`} style={animationStyle}>
                        <RegionCard region={region} />
                    </div>
                );
            })}
        </div>
      </div>
    </section>
  );
};

export default GlobalReach;
