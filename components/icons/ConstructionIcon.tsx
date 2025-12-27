
import React from 'react';

const ConstructionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5-7.5-7.5 7.5-7.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12h19.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v19.5" />
  </svg>
);

export default ConstructionIcon;
