
import React, { useState } from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import UploadIcon from './icons/UploadIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

interface JobSeekerFormProps {
  onBack: () => void;
}

const JobSeekerForm: React.FC<JobSeekerFormProps> = ({ onBack }) => {
    const [formState, setFormState] = useState({ name: '', email: '', currentRole: '', query: '' });
    const [resume, setResume] = useState<File | null>(null);
    const [fileName, setFileName] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const allowedExtensions = ['.pdf', '.doc', '.docx'];
            const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

            if (allowedExtensions.includes(fileExtension)) {
                setResume(file);
                setFileName(file.name);
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.resume;
                    return newErrors;
                });
            } else {
                setResume(null);
                setFileName('');
                setErrors(prev => ({ ...prev, resume: 'Invalid file type. Please upload a PDF or Word document.' }));
                e.target.value = '';
            }
        }
    };
    
    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formState.name.trim()) newErrors.name = "Name is required.";
        if (!formState.email.trim()) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formState.email)) newErrors.email = "Please enter a valid email address.";
        if (!resume) newErrors.resume = "Please upload your CV.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('loading');
        setErrors({});
        
        const message = `
New Job Seeker Profile Submission
---------------------------------
Name: ${formState.name}
Email: ${formState.email}
Current Role/Industry: ${formState.currentRole || 'Not specified'}

Query/Message:
${formState.query || 'No message provided.'}

---------------------------------
My CV "${fileName}" is ready to be attached.
        `.trim();

        const whatsappUrl = `https://wa.me/919354203405?text=${encodeURIComponent(message)}`;

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            setStatus('success');
        }, 500);
    };

    if (status === 'success') {
        return (
            <section className="py-20 bg-brand-light min-h-screen flex items-center justify-center animate-fade-in">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-2xl mx-auto bg-white p-12 rounded-lg shadow-xl">
                        <h2 className="font-serif text-3xl font-bold text-brand-gold mb-4">Redirecting to WhatsApp...</h2>
                        <p className="text-lg text-gray-700 mb-8">
                            Thank you! Your profile information is ready to be sent. Please click 'Send' in WhatsApp and remember to <strong className="text-brand-dark">manually attach your CV</strong>.
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
        <section className="py-20 bg-brand-light min-h-screen animate-fade-in">
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
                        <h2 className="font-serif text-4xl font-bold">Submit Your Profile</h2>
                        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                            Let us help you find your next career opportunity. Submit your details and CV below, and our recruiters will consider you for current and future openings.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                         <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-bold text-brand-dark mb-2">Your Name</label>
                                <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} required className={`w-full p-3 bg-gray-50 rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition`}/>
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-bold text-brand-dark mb-2">Your Email</label>
                                <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} required className={`w-full p-3 bg-gray-50 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition`}/>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="currentRole" className="block text-sm font-bold text-brand-dark mb-2">Current Role / Industry (Optional)</label>
                            <input type="text" id="currentRole" name="currentRole" value={formState.currentRole} onChange={handleChange} placeholder="e.g., Senior Software Engineer / Tech" className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"/>
                        </div>

                         <div>
                            <label htmlFor="resume-upload" className="block text-sm font-bold text-brand-dark mb-2">Upload Your CV</label>
                            <label htmlFor="resume-upload-input" className={`w-full p-3 bg-gray-50 rounded-md border ${errors.resume ? 'border-red-500' : 'border-gray-300'} flex items-center justify-center cursor-pointer hover:bg-gray-100 transition text-gray-600 truncate`}>
                                <UploadIcon className="w-5 h-5 mr-2 text-gray-500 flex-shrink-0" />
                                <span className="truncate">{fileName || 'Click to upload (PDF, DOC, DOCX)'}</span>
                            </label>
                            <input type="file" id="resume-upload-input" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                            {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
                        </div>

                        <div>
                            <label htmlFor="query" className="block text-sm font-bold text-brand-dark mb-2">Your Query (Optional)</label>
                            <textarea id="query" name="query" rows={4} value={formState.query} onChange={handleChange} placeholder="Is there anything specific you'd like to tell us? (e.g., career goals, preferred locations)" className="w-full p-3 bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-gold transition"></textarea>
                        </div>
                        
                        {errors.submit && <p className="text-red-500 text-sm my-4 text-center bg-red-100 p-3 rounded-md border border-red-500">{errors.submit}</p>}
                        
                        <div className="text-center pt-4">
                            <button type="submit" disabled={status === 'loading'} className="bg-green-500 text-white font-bold py-3 px-12 rounded-full hover:bg-green-600 transition duration-300 transform hover:scale-105 flex items-center justify-center mx-auto gap-2 disabled:bg-gray-400">
                                {status === 'loading' ? 'Submitting...' : (
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

export default JobSeekerForm;
