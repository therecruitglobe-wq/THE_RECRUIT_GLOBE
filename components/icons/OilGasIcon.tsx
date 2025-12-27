
import React from 'react';

const OilGasIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-4.64 0-8.41 3.22-8.41 7.2v.75a.75.75 0 001.5 0v-.75c0-3.17 3.07-5.7 6.91-5.7s6.91 2.53 6.91 5.7v.75a.75.75 0 001.5 0v-.75c0-3.98-3.77-7.2-8.41-7.2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3-3m0 0l3 3m-3-3v10.5" />
  </svg>
);

export default OilGasIcon;
