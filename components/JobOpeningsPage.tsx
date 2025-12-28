
import React from 'react';
import JobListings from './JobListings';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import type { Job } from '../types';

interface JobOpeningsPageProps {
  onBack: () => void;
  onViewDetails: (job: Job) => void;
}

const JobOpeningsPage: React.FC<JobOpeningsPageProps> = ({ onBack, onViewDetails }) => {
  return (
    <section id="job-openings-page" className="py-20 bg-brand-light animate-fade-in min-h-screen">
      <div className="container mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-dark font-semibold mb-8 hover:text-brand-gold transition-colors"
          aria-label="Go back to home page"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Back to Home
        </button>
        {/* We reuse the JobListings component directly */}
        <JobListings onViewDetails={onViewDetails} />
      </div>
    </section>
  );
};

export default JobOpeningsPage;