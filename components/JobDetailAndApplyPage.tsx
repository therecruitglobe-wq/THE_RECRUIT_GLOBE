
import React, { useState, useEffect } from 'react';
import type { Job } from '../types';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import UploadIcon from './icons/UploadIcon';

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
        // FIX: The `default` case was unreachable because all possible values of the `Job['type']` union 
        // were already handled. TypeScript correctly inferred `type` as `never` in this unreachable
        // code block, causing a compile error on `type.toUpperCase()`. Removing the dead code resolves this.
    }
};

const JobDetailAndApplyPage: React.FC<JobDetailAndApplyPageProps> = ({ job, onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; resume?: string }>({});
  const [submitted, setSubmitted] = useState(false);

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
            // Clear the file input so the user can select another file.
            e.target.value = '';
        }
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    setErrors(prev => ({...prev, ...newErrors}));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const recipientEmail = 'hr@therecruitglobe.com';
    const subject = `Job Application: ${job.title} - ${name}`;
    let body = `
Dear Hiring Team,

Please consider my application for the following position:

Position: ${job.title}
Company: ${job.company}
Location: ${job.location}

--- My Details ---
Name: ${name}
Email: ${email}
    `.trim();

    if (fileName) {
        body += `\n\nMy resume is named "${fileName}" and I will be attaching it to this email.`;
    } else {
        body += `\n\nI can provide my resume upon request.`;
    }
    
    body += "\n\nThank you for your time and consideration.";

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
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
                {submitted ? (
                  <div className="text-center">
                    <h3 className="font-serif text-2xl font-bold text-brand-gold mb-3">Thank You!</h3>
                    <p className="text-gray-700">
                      Your email application has been prepared. Please review it in your mail client.
                      {fileName && <strong className="block mt-2"> Don't forget to attach your resume ("{fileName}")!</strong>}
                    </p>
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
                      <button type="submit" className="w-full bg-brand-gold text-white font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition duration-300 transform hover:scale-105">
                        Submit Application via Email
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
