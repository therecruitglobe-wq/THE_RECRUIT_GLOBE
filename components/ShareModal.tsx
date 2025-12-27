
import React, { useState } from 'react';
import type { Job } from '../types';
import XIcon from './icons/XIcon';

interface ShareModalProps {
  job: Job;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ job, onClose }) => {
    const [copied, setCopied] = useState(false);

    const jobUrl = `${window.location.origin}${window.location.pathname}#job/${job.id}`;
    const shareText = `Check out this job opening: ${job.title} at ${job.company}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(jobUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        });
    };

    const socialLinks = {
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(jobUrl)}&title=${encodeURIComponent(shareText)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(jobUrl)}&text=${encodeURIComponent(shareText)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jobUrl)}`,
    };

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                    aria-label="Close share dialog"
                >
                    <XIcon className="w-6 h-6" />
                </button>
                <h3 className="font-serif text-xl font-bold text-brand-dark mb-1">Share Job Opening</h3>
                <p className="text-gray-600 mb-4">{job.title}</p>

                <div className="flex items-center bg-gray-100 rounded-md p-2">
                    <input type="text" readOnly value={jobUrl} className="flex-grow bg-transparent text-sm text-gray-700 outline-none"/>
                    <button
                        onClick={handleCopy}
                        className="bg-brand-gold text-white font-semibold text-sm px-4 py-1.5 rounded-md hover:bg-opacity-90"
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>

                <div className="mt-4 flex justify-center gap-4">
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 p-2" aria-label="Share on LinkedIn">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                     <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400 p-2" aria-label="Share on Twitter">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.09 1.868-.54 4.341 1.258 5.493-.826-.026-1.602-.255-2.279-.63v.052c0 2.395 1.636 4.545 3.946 5.045-.757.205-1.638.188-2.339.069.614 2.059 2.395 3.549 4.508 3.589-1.8 1.4-4.062 2.24-6.522 2.24-.42 0-.834-.025-1.242-.074 2.321 1.494 5.075 2.366 8.017 2.366 9.621 0 14.885-7.981 14.885-14.885 0-.225 0-.45-.015-.673.96-.695 1.798-1.56 2.457-2.54z"/></svg>
                    </a>
                     <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 p-2" aria-label="Share on Facebook">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;
