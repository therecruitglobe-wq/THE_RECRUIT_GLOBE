
import React from 'react';
import type { Job, ApplicationStatus } from '../types';
import BookmarkIcon from './icons/BookmarkIcon';
import ShareIcon from './icons/ShareIcon';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

interface JobCardProps {
    job: Job;
    onViewDetails: (job: Job) => void;
    onSaveToggle: (jobId: number) => void;
    onShare: (job: Job) => void;
    isSaved: boolean;
    status?: ApplicationStatus;
    index: number;
}

const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
        case 'Offered': return 'bg-green-100 text-green-800';
        case 'Interviewing': return 'bg-blue-100 text-blue-800';
        case 'Applied': return 'bg-yellow-100 text-yellow-800';
        case 'Rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails, onSaveToggle, onShare, isSaved, status, index }) => {
    const [ref, isVisible] = useAnimateOnScroll<HTMLDivElement>();
    return (
    <div
        ref={ref}
        className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex flex-col ${job.imageUrl ? 'overflow-hidden' : 'border-l-4 border-brand-gold'} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ transitionDelay: `${index * 100}ms` }}
    >
        {job.imageUrl && (
            <div className="h-48 bg-gray-200">
                <img 
                    src={job.imageUrl} 
                    alt={job.title} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>
        )}
        <div className="p-6 flex flex-col flex-1 relative">
            <button 
                onClick={() => onSaveToggle(job.id)}
                className="absolute top-4 right-4 text-brand-gold hover:text-brand-dark transition-colors z-10 p-1"
                aria-label={isSaved ? 'Unsave job' : 'Save job'}
            >
                <BookmarkIcon filled={isSaved} className="w-6 h-6" />
            </button>

            <div className="flex justify-between items-start">
                <div className="pr-10">
                    <h3 className="font-serif text-xl font-bold text-brand-dark">{job.title}</h3>
                    <p className="text-gray-600 font-medium">{job.company}</p>
                    <p className="text-sm text-gray-500">{job.location}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap self-start ${job.imageUrl ? 'bg-brand-dark text-white' : 'bg-brand-gold/10 text-brand-gold'}`}>{job.type}</span>
            </div>
            <p className="mt-4 text-gray-700 flex-grow">{job.description.substring(0, 100)}...</p>
            
            <div className="mt-auto pt-4">
                {isSaved && status && (
                    <div className="mb-4">
                        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(status)}`}>
                            {status}
                        </span>
                    </div>
                )}
                <div className="flex gap-2">
                    <button 
                        onClick={() => onViewDetails(job)}
                        className="flex-grow bg-brand-dark text-white font-bold py-2 px-4 rounded-full hover:bg-brand-gold transition duration-300">
                        View Details
                    </button>
                    <button
                        onClick={() => onShare(job)}
                        className="flex-shrink-0 bg-gray-200 text-brand-dark font-bold p-2.5 rounded-full hover:bg-gray-300 transition duration-300"
                        aria-label="Share job"
                    >
                        <ShareIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
};


export default JobCard;
