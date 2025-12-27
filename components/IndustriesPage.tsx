
import React from 'react';
import Verticals from './Verticals';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

interface IndustriesPageProps {
  onBack: () => void;
  onVerticalClick: (verticalName: string) => void;
}

const IndustriesPage: React.FC<IndustriesPageProps> = ({ onBack, onVerticalClick }) => {
  return (
    <section id="industries-page" className="py-20 bg-brand-light animate-fade-in min-h-[70vh]">
      <div className="container mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-dark font-semibold mb-8 hover:text-brand-gold transition-colors"
          aria-label="Go back to home page"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Back to Home
        </button>
        {/* We reuse the Verticals component directly for consistency */}
        <Verticals onVerticalClick={onVerticalClick} />
      </div>
    </section>
  );
};

export default IndustriesPage;
