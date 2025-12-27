
import React from 'react';
import BriefcaseIcon from './icons/BriefcaseIcon';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

interface PartnershipFormProps {
  onNavigate: () => void;
}

const PartnershipForm: React.FC<PartnershipFormProps> = ({ onNavigate }) => {
    const [titleRef, isTitleVisible] = useAnimateOnScroll<HTMLDivElement>();
    
    return (
        <section id="partnership" className="py-20 bg-brand-light overflow-hidden">
            <div className="container mx-auto px-6">
                <div 
                    ref={titleRef}
                    className={`text-center transition-all duration-1000 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                    <h2 className="font-serif text-4xl font-bold">Partner With The Recruit Globe</h2>
                    <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto mb-8">
                        Join forces with a leader in global recruitment. Let us connect you with the talent that will drive your company's future. Submit your hiring needs and let our experts find the perfect fit.
                    </p>
                    <button 
                        onClick={onNavigate}
                        className="bg-brand-gold text-white font-bold py-3 px-12 rounded-full hover:bg-opacity-90 transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto gap-2"
                    >
                        <BriefcaseIcon className="w-5 h-5" />
                        Submit Your Hiring Needs
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PartnershipForm;
