
import React, { useState, useEffect } from 'react';
import type { Job } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import UploadIcon from './icons/UploadIcon';
import WhatsAppIcon from './icons/WhatsAppIcon';

interface JobDetailAndApplyPageProps {
  job: Job;
  onBack: () => void;
}

const getEmploymentType = (type: Job['type']): string => {
    switch (type) {
        case 'Full-time': return 'FULL_TIME';
        case 'Part-time': return 'PART_TIME';
        case 'Contract': return 'CONTRACTOR';
        case 'Remote': return 'FULL_TIME'; // Assume Remote is full-time
    }
};

const JobDetailAndApplyPage: React.FC<JobDetailAndApplyPageProps> = ({ job, onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; resume?: string }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    const postDate = new Date(job.datePosted);
    const expiryDate = new Date(postDate);
    expiryDate.setDate(postDate.getDate() + 30); // Set expiry 30 days from posting
    const validThrough = expiryDate.toISOString().split('T')[0];

    const schema: any = {
        '@context': 'https://schema.org/',
        '@type': 'JobPosting',
        title: job.title,
        description: `
            <h3>Job Description</h3>
            <p>${job.description}</p>
            <h3>Responsibilities</h3>
            <ul>${job.responsibilities.map(r => `<li>${r}</li>`).join('')}</ul>
            <h3>Qualifications</h3>
            <ul>${job.qualifications.map(q => `<li>${q}</li>`).join('')}</ul>
        `,
        hiringOrganization: {
            '@type': 'Organization',
            name: job.company,
            sameAs: "https://www.therecruitglobe.com"
        },
        jobLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressLocality: job.location,
            },
        },
        datePosted: job.datePosted,
        validThrough: validThrough,
        employmentType: getEmploymentType(job.type),
    };
    
    if (job.type === 'Remote') {
        schema.jobLocationType = "TELECOMMUTE";
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
        if (document.head.contains(script)) {
            document.head.removeChild(script);
        }
    };
}, [job]);


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

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; resume?: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!resume) {
        newErrors.resume = 'Please upload your CV to apply.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setStatus('loading');
    setErrors({});
    
    const message = `
New Job Application
-------------------------
Position: ${job.title}
Company: ${job.company}

Applicant Details
-----------------
Name: ${name}
Email: ${email}
-------------------------
My CV "${fileName}" is ready to be attached.
    `.trim().replace(/\n/g, '%0A');

    const whatsappUrl = `https://wa.me/919354203405?text=${message}`;
    
    // Short delay to show loading state before redirecting
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setStatus('success');
    }, 500);
  };

  return (
    <section id="job-detail-page" className="py-20 bg-brand-light animate-fade-in">
      <div className="container mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-dark font-semibold mb-8 hover:text-brand-gold transition-colors"
          aria-label="Go back to job listings"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Back to Job Listings
        </button>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl">
          {job.imageUrl && (
            <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8">
                <img src={job.imageUrl} alt={job.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <span className="bg-brand-gold/10 text-brand-gold text-sm font-semibold px-3 py-1 rounded-full mb-4 inline-block">{job.type}</span>
              <h1 className="font-serif text-4xl font-bold text-brand-dark">{job.title}</h1>
              <p className="text-gray-600 font-medium mt-1 text-lg">{job.company} &bull; {job.location}</p>
              
              <div className="mt-8 prose max-w-none text-gray-700">
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-2">Job Description</h3>
                <p>{job.description}</p>
                
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-2 mt-6">Responsibilities</h3>
                <ul className="list-disc list-inside space-y-2">
                    {job.responsibilities.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
                
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-2 mt-6">Qualifications</h3>
                <ul className="list-disc list-inside space-y-2">
                    {job.qualifications.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-brand-light p-6 rounded-lg shadow-lg border-t-4 border-brand-gold">
                {status === 'success' ? (
                  <div className="text-center">
                    <h3 className="font-serif text-2xl font-bold text-brand-gold mb-3">Redirecting to WhatsApp...</h3>
                    <p className="text-gray-700">
                      Your application message is ready. Please click 'Send' in WhatsApp and remember to **manually attach your CV**.
                    </p>
                     <button
                        onClick={onBack}
                        className="mt-6 bg-brand-dark text-white font-bold py-2 px-6 rounded-full hover:bg-brand-gold transition duration-300"
                    >
                        Return to Listings
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-serif text-xl font-bold text-brand-dark mb-4 text-center">Apply for this position</h3>
                    <form onSubmit={handleSubmit} noValidate className="space-y-4">
                      <div>
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required
                          className={`w-full p-3 bg-white rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition`}
                          aria-invalid={!!errors.name} />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required
                          className={`w-full p-3 bg-white rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-brand-gold transition`}
                          aria-invalid={!!errors.email} />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="resume-upload" className={`w-full p-3 bg-white rounded-md border ${errors.resume ? 'border-red-500' : 'border-gray-300'} flex items-center justify-center cursor-pointer hover:bg-gray-50 transition text-gray-600 truncate`}>
                          <UploadIcon className="w-5 h-5 mr-2 text-gray-500 flex-shrink-0" />
                          <span className="truncate">{fileName || 'Upload Your CV'}</span>
                        </label>
                        <input type="file" id="resume-upload" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                        {errors.resume && <p className="text-red-500 text-xs mt-1">{errors.resume}</p>}
                      </div>
                      <button type="submit" disabled={status === 'loading'} className="w-full bg-green-500 text-white font-bold py-3 px-8 rounded-full hover:bg-green-600 transition duration-300 transform hover:scale-105 disabled:bg-gray-400 flex items-center justify-center gap-2">
                         {status === 'loading' ? 'Preparing...' : (
                            <>
                                <WhatsAppIcon className="w-5 h-5" />
                                Apply via WhatsApp
                            </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetailAndApplyPage;