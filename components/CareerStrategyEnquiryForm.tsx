
import React, { useState } from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

interface CareerStrategyEnquiryFormProps {
  onBack: () => void;
}

const CareerStrategyEnquiryForm: React.FC<CareerStrategyEnquiryFormProps> = ({ onBack }) => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        currentRole: '',
        careerGoals: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const message = `New Enquiry for Career Strategy & Job Readiness Consulting
-----------------------------------------
Name: ${formState.name}
Email: ${formState.email}
Current Role/Industry: ${formState.currentRole}

Career Goals:
${formState.careerGoals}`;

        const whatsappUrl = `https://wa.me/919354203405?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <section className="py-20 bg-brand-light min-h-screen animate-fade-in">
            <div className="container mx-auto px-6">
                 <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-brand-dark font-semibold mb-8 hover:text-brand-gold transition-colors"
                    aria-label="Go back to service details"
                    >
                    <ChevronLeftIcon className="w-5 h-5" />
                    Back to Service Details
                </button>
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl border-t-4 border-brand-gold">
                    <div className="text-center mb-8">
                        <h2 className="font-serif text-4xl font-bold">Enquire About Career Strategy Consulting</h2>
                        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                            Take the first step towards a more defined and successful career path. Please provide some details below.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                         <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-brand-dark mb-2">Your Name</label>
                                <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} required className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"/>
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-bold text-brand-dark mb-2">Your Email</label>
                                <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} required className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"/>
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="currentRole" className="block text-sm font-bold text-brand-dark mb-2">Current Role / Industry</label>
                            <input type="text" id="currentRole" name="currentRole" value={formState.currentRole} onChange={handleChange} required placeholder="e.g., Software Engineer / Tech" className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"/>
                        </div>

                        <div>
                            <label htmlFor="careerGoals" className="block text-sm font-bold text-brand-dark mb-2">Briefly Describe Your Career Goals</label>
                            <textarea id="careerGoals" name="careerGoals" rows={5} value={formState.careerGoals} onChange={handleChange} required placeholder="e.g., Transition into product management, achieve a leadership position in 5 years, find a role with better work-life balance." className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"></textarea>
                        </div>
                        
                        <div className="text-center pt-4">
                            <button type="submit" className="bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto gap-2">
                                <WhatsAppIcon className="w-5 h-5" />
                                Send Enquiry via WhatsApp
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CareerStrategyEnquiryForm;
