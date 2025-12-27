
import React, { useState, useEffect } from 'react';
import type { Job, ApplicationStatus } from '../types';
import { jobs } from '../data/jobs';
import JobCard from './JobCard';
import JobCardSkeleton from './JobCardSkeleton';
import ShareModal from './ShareModal';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

interface JobListingsProps {
  onViewDetails: (job: Job) => void;
}

const JobListings: React.FC<JobListingsProps> = ({ onViewDetails }) => {
  const [savedJobIds, setSavedJobIds] = useState<number[]>([]);
  const [applicationStatuses, setApplicationStatuses] = useState<{ [key: number]: ApplicationStatus }>({});
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [jobToShare, setJobToShare] = useState<Job | null>(null);
  const [titleRef, isTitleVisible] = useAnimateOnScroll<HTMLDivElement>();

  useEffect(() => {
    // Simulate fetching data to show loading state
    const timer = setTimeout(() => {
        const storedSavedJobs = localStorage.getItem('savedJobs');
        if (storedSavedJobs) {
        setSavedJobIds(JSON.parse(storedSavedJobs));
        }
        const storedStatuses = localStorage.getItem('jobApplicationStatuses');
        if (storedStatuses) {
        setApplicationStatuses(JSON.parse(storedStatuses));
        }
        setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSaveToggle = (jobId: number) => {
    setSavedJobIds(prev => {
      const newSavedJobs = prev.includes(jobId)
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId];
      localStorage.setItem('savedJobs', JSON.stringify(newSavedJobs));
      
      if (!newSavedJobs.includes(jobId)) {
        // If job is unsaved, remove its status
        handleStatusChange(jobId, 'Not Applied', true);
      } else if (!applicationStatuses[jobId]) {
        // If job is newly saved, set default status
        handleStatusChange(jobId, 'Not Applied');
      }

      return newSavedJobs;
    });
  };

  const handleStatusChange = (jobId: number, status: ApplicationStatus, remove = false) => {
      setApplicationStatuses(prev => {
        const newStatuses = { ...prev };
        if (remove) {
            delete newStatuses[jobId];
        } else {
            newStatuses[jobId] = status;
        }
        localStorage.setItem('jobApplicationStatuses', JSON.stringify(newStatuses));
        return newStatuses;
      });
  };


  const filteredJobs = showSavedOnly
    ? jobs.filter(job => savedJobIds.includes(job.id))
    : jobs;

  return (
    <>
      <section id="jobs" className="py-20 bg-brand-light overflow-hidden">
        <div className="container mx-auto px-6">
          <div 
            ref={titleRef}
            className={`text-center mb-12 transition-all duration-1000 ${isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <h2 className="font-serif text-4xl font-bold">Featured Job Openings</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              Discover your next career move with our curated list of opportunities from leading companies.
            </p>
            <div className="mt-8 flex justify-center gap-4">
                <button
                    onClick={() => setShowSavedOnly(false)}
                    className={`px-6 py-2 rounded-full font-semibold transition-colors ${!showSavedOnly ? 'bg-brand-gold text-white' : 'bg-white text-brand-dark border border-gray-300'}`}
                >
                    All Jobs
                </button>
                <button
                    onClick={() => setShowSavedOnly(true)}
                    className={`px-6 py-2 rounded-full font-semibold transition-colors ${showSavedOnly ? 'bg-brand-gold text-white' : 'bg-white text-brand-dark border border-gray-300'}`}
                >
                    Saved Jobs ({savedJobIds.length})
                </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {Array.from({ length: 4 }).map((_, index) => <JobCardSkeleton key={index} />)}
            </div>
          ) : filteredJobs.length > 0 ? (
             <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {filteredJobs.map((job, index) => (
                    <JobCard 
                        key={job.id} 
                        job={job} 
                        onViewDetails={onViewDetails} 
                        onSaveToggle={handleSaveToggle}
                        onShare={(jobToShare) => setJobToShare(jobToShare)}
                        isSaved={savedJobIds.includes(job.id)}
                        status={applicationStatuses[job.id]}
                        index={index}
                    />
                ))}
             </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <h3 className="font-serif text-2xl text-brand-dark">No Saved Jobs</h3>
                <p className="text-gray-600 mt-2">Click the bookmark icon on a job to save it for later.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <a href="#" className="text-brand-gold font-semibold hover:underline">
              View All Openings &rarr;
            </a>
          </div>
        </div>
      </section>
      {jobToShare && (
        <ShareModal job={jobToShare} onClose={() => setJobToShare(null)} />
      )}
    </>
  );
};

export default JobListings;
