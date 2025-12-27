
import React from 'react';
import HealthcareIcon from './icons/HealthcareIcon';
import ConstructionIcon from './icons/ConstructionIcon';
import ITIcon from './icons/ITIcon';
import OilGasIcon from './icons/OilGasIcon';
import ManufacturingIcon from './icons/ManufacturingIcon';
import MiningIcon from './icons/MiningIcon';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

interface VerticalsProps {
    onVerticalClick: (verticalName: string) => void;
}

const verticals = [
    { 
        name: 'Healthcare', 
        icon: <HealthcareIcon />,
        imageUrl: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1920&auto=format&fit=crop',
        isClickable: true,
    },
    { 
        name: 'Construction', 
        icon: <ConstructionIcon />,
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1920&auto=format&fit=crop',
        isClickable: true,
    },
    { 
        name: 'IT', 
        icon: <ITIcon />,
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1920&auto=format&fit=crop',
        isClickable: true,
    },
    { 
        name: 'Oil & Gas', 
        icon: <OilGasIcon />,
        imageUrl: 'https://images.unsplash.com/photo-1563721394-3995f5ff7a12?q=80&w=1920&auto=format&fit=crop',
        isClickable: true,
    },
    { 
        name: 'Manufacturing', 
        icon: <ManufacturingIcon />,
        imageUrl: 'https://img.freepik.com/free-photo/large-factory-area-with-machines-workers_181624-6338.jpg',
        isClickable: true,
    },
    {
        name: 'Mining',
        icon: <MiningIcon />,
        imageUrl: 'https://img.freepik.com/free-photo/large-dump-truck-transporting-stone-career_23-2147721869.jpg',
        isClickable: true,
    }
];

const VerticalCard: React.FC<{ icon: React.ReactElement; name: string; imageUrl?: string }> = ({ icon, name, imageUrl }) => {
    if (imageUrl) {
        return (
            <div className="group relative rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.04] overflow-hidden min-h-[180px] flex items-end p-4 h-full">
                <img 
                    src={imageUrl} 
                    alt={`${name} industry`} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                <div className="relative z-10 flex items-center space-x-3" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                    <div className="text-white">
                        {React.cloneElement<React.SVGProps<SVGSVGElement>>(icon, { className: 'w-10 h-10'})}
                    </div>
                    <h3 className="font-serif text-xl font-bold text-white">{name}</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.04] flex flex-col items-center justify-center text-center h-full min-h-[180px]">
            <div className="text-brand-gold mb-4">
                {React.cloneElement<React.SVGProps<SVGSVGElement>>(icon, { className: 'w-12 h-12'})}
            </div>
            <h3 className="font-serif text-xl font-bold text-brand-dark">{name}</h3>
        </div>
    );
};

const Verticals: React.FC<VerticalsProps> = ({ onVerticalClick }) => {
    const [titleRef, isTitleVisible] = useAnimateOnScroll<HTMLDivElement>();
    return (
    <section id="verticals" className="py-20 bg-brand-light overflow-hidden">
      <div className="container mx-auto px-6">
        <div 
            ref={titleRef}
            className={`text-center mb-12 transition-all duration-1000 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <h2 className="font-serif text-4xl font-bold">Industries We Serve</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our specialized recruiters have deep expertise across a wide range of key global industries.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {verticals.map((vertical, index) => {
                const [cardRef, isCardVisible] = useAnimateOnScroll<HTMLButtonElement | HTMLDivElement>();
                const animationClasses = `transition-all duration-700 ${isCardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;
                const animationStyle = { transitionDelay: `${index * 100}ms` };

                if (vertical.isClickable) {
                    return (
                        <button 
                            ref={cardRef as React.RefObject<HTMLButtonElement>}
                            key={vertical.name} 
                            onClick={() => onVerticalClick(vertical.name)}
                            className={`text-left w-full h-full ${animationClasses}`}
                            style={animationStyle}
                            aria-label={`Learn more about our ${vertical.name} services`}
                        >
                            <VerticalCard 
                                icon={vertical.icon} 
                                name={vertical.name} 
                                imageUrl={vertical.imageUrl} 
                            />
                        </button>
                    )
                }
                return (
                    <div ref={cardRef as React.RefObject<HTMLDivElement>} key={vertical.name} className={animationClasses} style={animationStyle}>
                        <VerticalCard 
                            icon={vertical.icon} 
                            name={vertical.name} 
                            imageUrl={vertical.imageUrl} 
                        />
                    </div>
                );
            })}
        </div>
      </div>
    </section>
  );
};

export default Verticals;