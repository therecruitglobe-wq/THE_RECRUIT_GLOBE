
import React, { useState } from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

interface PartnerPageProps {
  onBack: () => void;
}

const PartnerPage: React.FC<PartnerPageProps> = ({ onBack }) => {
    const [formState, setFormState] = useState({
        companyName: '',
        companyWebsite: '',
        contactName: '',
        contactEmail: '',
        companySize: '',
        industry: '',
        hiringNeeds: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = {...prev};
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formState.companyName.trim()) newErrors.companyName = 'Company name is required.';
        if (!formState.companyWebsite.trim()) {
            newErrors.companyWebsite = 'Company website is required.';
        } else if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formState.companyWebsite)) {
            // Basic URL validation
            // newErrors.companyWebsite = 'Please enter a valid website URL.';
        }
        if (!formState.contactName.trim()) newErrors.contactName = 'Contact name is required.';
        if (!formState.contactEmail.trim()) {
            newErrors.contactEmail = 'Contact email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formState.contactEmail)) {
            newErrors.contactEmail = 'Please enter a valid email address.';
        }
        if (!formState.companySize) newErrors.companySize = 'Please select a company size.';
        if (!formState.industry.trim()) newErrors.industry = 'Industry is required.';
        if (!formState.hiringNeeds.trim()) newErrors.hiringNeeds = 'Please describe your hiring needs.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setStatus('loading');
        setErrors({});

        const message = `
New Partnership Inquiry
-------------------------

Company Name: ${formState.companyName}
Company Website: ${formState.companyWebsite}
Contact Name: ${formState.contactName}
Contact Email: ${formState.contactEmail}
Company Size: ${formState.companySize}
Industry: ${formState.industry}

Hiring Needs:
${formState.hiringNeeds}
        `.trim();

        const whatsappUrl = `https://wa.me/919354203405?text=${encodeURIComponent(message)}`;

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            setStatus('success');
        }, 500);
    };


    if (status === 'success') {
        return (
            <section id="partner-page" className="py-20 bg-brand-light min-h-screen">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-2xl mx-auto bg-white p-12 rounded-lg shadow-xl animate-fade-in">
                        <h2 className="font-serif text-3xl font-bold text-brand-gold mb-4">Thank You!</h2>
                        <p className="text-lg text-gray-700 mb-8">
                            Your partnership inquiry is ready to be sent. Please click 'Send' in WhatsApp to finalize your submission. We look forward to the possibility of working together!
                        </p>
                        <button
                            onClick={onBack}
                            className="bg-brand-dark text-white font-bold py-3 px-8 rounded-full hover:bg-brand-gold transition duration-300 inline-flex items-center gap-2"
                        >
                            <ChevronLeftIcon className="w-5 h-5" />
                            Return to Home
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="partner-page" className="py-20 bg-brand-light min-h-screen animate-fade-in">
            <div className="container mx-auto px-6">
                 <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-brand-dark font-semibold mb-8 hover:text-brand-gold transition-colors"
                    aria-label="Go back to home page"
                    >
                    <ChevronLeftIcon className="w-5 h-5" />
                    Back to Home
                </button>
                <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl border-t-4 border-brand-gold">
                    <div className="text-center mb-8">
                        <h2 className="font-serif text-4xl font-bold">Partner With The Recruit Globe</h2>
                        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                            Join forces with a leader in global recruitment. Fill out the form below to begin our partnership and let us connect you with the talent that will drive your company's future.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-bold text-brand-dark mb-2">Company Name</label>
                                <input type="text" id="companyName" name="companyName" value={formState.companyName} onChange={handleChange} required className={`w-full p-3 bg-gray-50 rounded-md border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition`}/>
                                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                            </div>
                             <div>
                                <label htmlFor="companyWebsite" className="block text-sm font-bold text-brand-dark mb-2">Company Website</label>
                                <input type="text" id="companyWebsite" name="companyWebsite" value={formState.companyWebsite} placeholder="www.example.com" required className={`w-full p-3 bg-gray-50 rounded-md border ${errors.companyWebsite ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition`}/>
                                {errors.companyWebsite && <p className="text-red-500 text-xs mt-1">{errors.companyWebsite}</p>}
                            </div>
                        </div>

                         <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="contactName" className="block text-sm font-bold text-brand-dark mb-2">Contact Name</label>
                                <input type="text" id="contactName" name="contactName" value={formState.contactName} onChange={handleChange} required className={`w-full p-3 bg-gray-50 rounded-md border ${errors.contactName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition`}/>
                                {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
                            </div>
                             <div>
                                <label htmlFor="contactEmail" className="block text-sm font-bold text-brand-dark mb-2">Contact Email</label>
                                <input type="email" id="contactEmail" name="contactEmail" value={formState.contactEmail} onChange={handleChange} required className={`w-full p-3 bg-gray-50 rounded-md border ${errors.contactEmail ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition`}/>
                                {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                             <div>
                                <label htmlFor="companySize" className="block text-sm font-bold text-brand-dark mb-2">Company Size</label>
                                <select id="companySize" name="companySize" value={formState.companySize} onChange={handleChange} required className={`w-full p-3 bg-gray-50 rounded-md border ${errors.companySize ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition`}>
                                    <option value="" disabled>Select size...</option>
                                    <option value="1-10">1-10 employees</option>
                                    <option value="11-50">11-50 employees</option>
                                    <option value="51-200">51-200 employees</option>
                                    <option value="201-1000">201-1000 employees</option>
                                    <option value="1000+">1000+ employees</option>
                                </select>
                                {errors.companySize && <p className="text-red-500 text-xs mt-1">{errors.companySize}</p>}
                            </div>
                            <div>
                                <label htmlFor="industry" className="block text-sm font-bold text-brand-dark mb-2">Industry</label>
                                <input type="text" id="industry" name="industry" value={formState.industry} onChange={handleChange} placeholder="e.g., Technology, Healthcare" required className={`w-full p-3 bg-gray-50 rounded-md border ${errors.industry ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition`}/>
                                {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="hiringNeeds" className="block text-sm font-bold text-brand-dark mb-2">Describe Your Hiring Needs</label>
                            <textarea id="hiringNeeds" name="hiringNeeds" rows={5} value={formState.hiringNeeds} onChange={handleChange} required placeholder="Tell us about the roles you're looking to fill, key skills you're seeking, and any other relevant details." className={`w-full p-3 bg-gray-50 rounded-md border ${errors.hiringNeeds ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition`}></textarea>
                            {errors.hiringNeeds && <p className="text-red-500 text-xs mt-1">{errors.hiringNeeds}</p>}
                        </div>
                        
                        <div className="text-center pt-4">
                            <button type="submit" disabled={status === 'loading'} className="bg-green-500 text-white font-bold py-3 px-12 rounded-full hover:bg-green-600 transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto gap-2 disabled:bg-gray-400">
                                 {status === 'loading' ? 'Preparing...' : (
                                    <>
                                        <WhatsAppIcon className="w-5 h-5" />
                                        Submit via WhatsApp
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default PartnerPage;
