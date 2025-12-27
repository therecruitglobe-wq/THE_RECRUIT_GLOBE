
import React, { useState, useEffect, useRef } from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import OilGasIcon from './icons/OilGasIcon';
import ConstructionIcon from './icons/ConstructionIcon';
import ITIcon from './icons/ITIcon';
import HealthcareIcon from './icons/HealthcareIcon';
import FinanceIcon from './icons/FinanceIcon';
import ImageUploader from './ImageUploader';
import ArrowUpTrayIcon from './icons/ArrowUpTrayIcon';
import ImageEditor from './ImageEditor';

interface MiddleEastDetailProps {
  onBack: () => void;
  onDiscussStaffing: () => void;
}

const initialCountries = [
    {
        name: "United Arab Emirates",
        sectors: ["Technology", "Finance", "Construction", "Healthcare"],
        imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1920&auto=format&fit=crop",
        isEditable: false,
    },
    {
        name: "Saudi Arabia",
        sectors: ["Oil & Gas", "Construction", "IT", "Healthcare"],
        imageUrl: "https://images.unsplash.com/photo-1595037699430-64214f73c448?q=80&w=1920&auto=format&fit=crop",
        isEditable: true,
    },
    {
        name: "Qatar",
        sectors: ["Oil & Gas", "Construction", "Finance"],
        imageUrl: "https://images.unsplash.com/photo-1534447341399-73d8391572a1?q=80&w=1920&auto=format&fit=crop",
        isEditable: true,
    },
     {
        name: "Oman & Kuwait",
        sectors: ["Petroleum", "Construction", "Finance"],
        imageUrl: "https://images.unsplash.com/photo-1601237902574-0f576e2c4333?q=80&w=1920&auto=format&fit=crop",
        isEditable: true,
    }
];

const sectorIcons: { [key: string]: React.ReactNode } = {
    "Oil & Gas": <OilGasIcon className="w-6 h-6" />,
    "Petroleum": <OilGasIcon className="w-6 h-6" />,
    "Construction": <ConstructionIcon className="w-6 h-6" />,
    "IT": <ITIcon className="w-6 h-6" />,
    "Technology": <ITIcon className="w-6 h-6" />,
    "Healthcare": <HealthcareIcon className="w-6 h-6" />,
    "Finance": <FinanceIcon className="w-6 h-6" />,
};

interface CountryCardProps {
    country: typeof initialCountries[0];
    onImageUpload: (name: string, dataUrl: string) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onImageUpload }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && country.isEditable && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onImageUpload(country.name, reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="group relative rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden min-h-[250px] flex flex-col justify-end p-4">
            <img src={country.imageUrl} alt={country.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent ${country.isEditable ? 'group-hover:bg-black/60 transition-colors' : ''}`}></div>
            
            {country.isEditable && (
                <>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/png, image/jpeg, image/webp" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                            onClick={handleUploadClick}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white text-brand-dark font-bold py-2 px-4 rounded-full flex items-center gap-2 transform hover:scale-105"
                        >
                            <ArrowUpTrayIcon className="w-5 h-5" />
                            Change Image
                        </button>
                    </div>
                </>
            )}

            <div className="relative z-10" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                <h4 className="font-bold text-white text-xl font-serif mb-3">{country.name}</h4>
                <div className="flex flex-wrap gap-2">
                    {country.sectors.map(sector => (
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


const MiddleEastDetail: React.FC<MiddleEastDetailProps> = ({ onBack, onDiscussStaffing }) => {
  const [countries, setCountries] = useState(initialCountries);

  useEffect(() => {
    try {
        const updatedCountries = initialCountries.map(country => {
            if (country.isEditable) {
                const storageKey = `country-image-${country.name.replace(/\s+|&/g, '-')}`;
                const savedImage = localStorage.getItem(storageKey);
                if (savedImage) {
                    return { ...country, imageUrl: savedImage };
                }
            }
            return country;
        });
        setCountries(updatedCountries);
    } catch (error) {
        console.error("Could not access localStorage:", error);
    }
  }, []);

  const handleImageUpload = (countryName: string, dataUrl: string) => {
    try {
        const storageKey = `country-image-${countryName.replace(/\s+|&/g, '-')}`;
        localStorage.setItem(storageKey, dataUrl);
        setCountries(prevCountries => prevCountries.map(c => 
            c.name === countryName ? { ...c, imageUrl: dataUrl } : c
        ));
    } catch (error) {
        console.error("Could not save image to localStorage:", error);
    }
  };

  return (
    <>
      <section id="middle-east-detail" className="py-20 bg-brand-light animate-fade-in">
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
                  Your Recruitment Partner in the Middle East
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  The Recruit Globe has a strong and established presence in the Middle East, a region of dynamic growth and ambitious projects. We specialize in connecting world-class talent with the visionary companies shaping the future of this vibrant market. Our deep understanding of local cultures and business landscapes makes us the ideal partner for your staffing needs.
                </p>

                <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">Key Markets & Sector Expertise</h3>
                <div className="grid sm:grid-cols-2 gap-6 mt-6">
                  {countries.map(country => (
                    <CountryCard 
                      key={country.name}
                      country={country}
                      onImageUpload={handleImageUpload}
                    />
                  ))}
                </div>

                <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">Why Choose Us for the Middle East?</h3>
                
                <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Local Insight, Global Standards:</strong> We combine on-the-ground knowledge with international best practices in recruitment.</span></li>
                    <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Extensive Network:</strong> Access to a premier network of professionals both within the region and globally.</span></li>
                    <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Proven Track Record:</strong> Successfully placed key personnel in major projects across the GCC.</span></li>
                </ul>
                <div className="mt-10">
                  <button
                    onClick={onDiscussStaffing}
                    className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-block"
                  >
                    Discuss Your Middle East Staffing Needs
                  </button>
                </div>
              </div>
              <div className="lg:w-1/3">
                  <ImageUploader 
                      defaultImageUrl="https://images.unsplash.com/photo-1528826542662-3a832a1856c8?q=80&w=1920&auto=format&fit=crop" 
                      altText="The modern skyline of Dubai representing dynamic growth in the Middle East" 
                      storageKey="middle-east-detail-image"
                  />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ImageEditor />
    </>
  );
};

export default MiddleEastDetail;
