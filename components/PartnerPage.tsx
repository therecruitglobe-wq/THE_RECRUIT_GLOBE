
import React, { useState } from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';

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
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const recipientEmail = 'hr@therecruitglobe.com';
        const subject = `Partnership Inquiry: ${formState.companyName}`;
        const body = `
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

        const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <section id="partner-page" className="py-20 bg-brand-light min-h-screen">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-2xl mx-auto bg-white p-12 rounded-lg shadow-xl animate-fade-in">
                        <h2 className="font-serif text-3xl font-bold text-brand-gold mb-4">Thank You!</h2>
                        <p className="text-lg text-gray-700 mb-8">
                            Your email client should now be open with your inquiry details. Please review and send the email to complete the process. We look forward to connecting with you!
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

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-bold text-brand-dark mb-2">Company Name</label>
                                <input type="text" id="companyName" name="companyName" value={formState.companyName} onChange={handleChange} required className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"/>
                            </div>
                             <div>
                                <label htmlFor="companyWebsite" className="block text-sm font-bold text-brand-dark mb-2">Company Website</label>
                                <input type="url" id="companyWebsite" name="companyWebsite" value={formState.companyWebsite} placeholder="https://example.com" required className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"/>
                            </div>
                        </div>

                         <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="contactName" className="block text-sm font-bold text-brand-dark mb-2">Contact Name</label>
                                <input type="text" id="contactName" name="contactName" value={formState.contactName} onChange={handleChange} required className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"/>
                            </div>
                             <div>
                                <label htmlFor="contactEmail" className="block text-sm font-bold text-brand-dark mb-2">Contact Email</label>
                                <input type="email" id="contactEmail" name="contactEmail" value={formState.contactEmail} onChange={handleChange} required className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"/>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                             <div>
                                <label htmlFor="companySize" className="block text-sm font-bold text-brand-dark mb-2">Company Size</label>
                                <select id="companySize" name="companySize" value={formState.companySize} onChange={handleChange} required className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition">
                                    <option value="" disabled>Select size...</option>
                                    <option value="1-10">1-10 employees</option>
                                    <option value="11-50">11-50 employees</option>
                                    <option value="51-200">51-200 employees</option>
                                    <option value="201-1000">201-1000 employees</option>
                                    <option value="1000+">1000+ employees</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="industry" className="block text-sm font-bold text-brand-dark mb-2">Industry</label>
                                <input type="text" id="industry" name="industry" value={formState.industry} onChange={handleChange} placeholder="e.g., Technology, Healthcare" required className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"/>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="hiringNeeds" className="block text-sm font-bold text-brand-dark mb-2">Describe Your Hiring Needs</label>
                            <textarea id="hiringNeeds" name="hiringNeeds" rows={5} value={formState.hiringNeeds} onChange={handleChange} required placeholder="Tell us about the roles you're looking to fill, key skills you're seeking, and any other relevant details." className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"></textarea>
                        </div>
                        
                        <div className="text-center pt-4">
                            <button type="submit" className="bg-brand-gold text-white font-bold py-3 px-12 rounded-full hover:bg-opacity-90 transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto gap-2">
                                <BriefcaseIcon className="w-5 h-5" />
                                Submit Partnership Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default PartnerPage;
