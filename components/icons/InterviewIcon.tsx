
import React from 'react';

const InterviewIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    {...props}
  >
    <path d="M10 4a2 2 0 100 4 2 2 0 000-4zM14 4a2 2 0 100 4 2 2 0 000-4zM8 12a2 2 0 114 0 2 2 0 01-4 0zM12 12a2 2 0 114 0 2 2 0 01-4 0zM4 11v2h16v-2H4z" />
    <path fillRule="evenodd" d="M3 16h18v2H3v-2zm2-7a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
    <path d="M5 19v-1h14v1a1 1 0 01-1 1H6a1 1 0 01-1-1z" />
  </svg>
);

export default InterviewIcon;
