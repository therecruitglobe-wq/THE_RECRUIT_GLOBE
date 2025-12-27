
import React, { useState } from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';

interface HiringFormProps {
  onBack: () => void;
}

const HiringForm: React.FC<HiringFormProps> = ({ onBack }) => {
    const [formState, setFormState] = useState({
        companyName: '',
        contactName: '',
        contactEmail: '',
        jobTitle: '',
        roleType: '',
        experienceLevel: '',
        keySkills: '',
        jobDescription: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const recipientEmail = 'hr@therecruitglobe.com';
        const subject = `Hiring Requirement Submitted: ${formState.jobTitle} at ${formState.companyName}`;
        const body = `
New Hiring Requirement
-------------------------

Company Name: ${formState.companyName}
Contact Name: ${formState.contactName}
Contact Email: ${formState.contactEmail}

Role Details
------------
Job Title: ${formState.jobTitle}
Role Type: ${formState.roleType}
Experience Level: ${formState.experienceLevel}
Key Skills Required:
${formState.keySkills}

Job Description / Additional Details:
${formState.jobDescription}
        `.trim();

        const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <section id="hiring-form" className="py-20 bg-brand-light min-h-screen">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-2xl mx-auto bg-white p-12 rounded-lg shadow-xl">
                        <h2 className="font-serif text-3xl font-bold text-brand-gold mb-4">Requirement Submitted!</h2>
                        <p className="text-lg text-gray-700 mb-8">
                            Thank you for submitting your hiring needs. Your email client should now be open with the details. Please review and send the email to complete the process. Our team will get in touch with you shortly.
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
        <section id="hiring-form" className="py-20 bg-brand-light min-h-screen animate-fade-in">
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
                        <h2 className="font-serif text-4xl font-bold">Submit Your Hiring Requirements</h2>
                        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                            Provide us with the details of the role you're looking to fill, and our experts will begin the search for your perfect candidate.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-bold text-brand-dark mb-2">Company Name</label>
                                <input type="text" id="companyName" name="companyName" value={formState.companyName} onChange={handleChange} required className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"/>
                            </div>
                            <div>
                                <label htmlFor="jobTitle" className="block text-sm font-bold text-brand-dark mb-2">Job Title</label>
                                <input type="text" id="jobTitle" name="jobTitle" value={formState.jobTitle} onChange={handleChange} required className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"/>
                            </div>
                        </div>

                         <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="contactName" className="block text-sm font-bold text-brand-dark mb-2">Your Name</label>
                                <input type="text" id="contactName" name="contactName" value={formState.contactName} onChange={handleChange} required className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"/>
                            </div>
                             <div>
                                <label htmlFor="contactEmail" className="block text-sm font-bold text-brand-dark mb-2">Your Email</label>
                                <input type="email" id="contactEmail" name="contactEmail" value={formState.contactEmail} onChange={handleChange} required className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"/>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                             <div>
                                <label htmlFor="roleType" className="block text-sm font-bold text-brand-dark mb-2">Role Type</label>
                                <select id="roleType" name="roleType" value={formState.roleType} onChange={handleChange} required className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition">
                                    <option value="" disabled>Select type...</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Remote">Remote</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="experienceLevel" className="block text-sm font-bold text-brand-dark mb-2">Experience Level</label>
                                 <select id="experienceLevel" name="experienceLevel" value={formState.experienceLevel} onChange={handleChange} required className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition">
                                    <option value="" disabled>Select level...</option>
                                    <option value="Entry-level">Entry-level</option>
                                    <option value="Mid-level">Mid-level</option>
                                    <option value="Senior">Senior</option>
                                    <option value="Lead / Manager">Lead / Manager</option>
                                    <option value="Executive">Executive</option>
                                </select>
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="keySkills" className="block text-sm font-bold text-brand-dark mb-2">Key Skills Required</label>
                            <textarea id="keySkills" name="keySkills" rows={3} value={formState.keySkills} onChange={handleChange} required placeholder="e.g., React, Python, Project Management, Financial Modeling" className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"></textarea>
                        </div>

                        <div>
                            <label htmlFor="jobDescription" className="block text-sm font-bold text-brand-dark mb-2">Job Description / Additional Details</label>
                            <textarea id="jobDescription" name="jobDescription" rows={5} value={formState.jobDescription} onChange={handleChange} placeholder="Please provide as much detail as possible about the role, responsibilities, and ideal candidate." className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"></textarea>
                        </div>
                        
                        <div className="text-center pt-4">
                            <button type="submit" className="bg-brand-gold text-white font-bold py-3 px-12 rounded-full hover:bg-opacity-90 transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto gap-2">
                                <BriefcaseIcon className="w-5 h-5" />
                                Submit Requirement
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default HiringForm;
