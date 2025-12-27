
import React from 'react';

const CompassIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 8.352a4.5 4.5 0 00-6.262 6.262m6.262-6.262L8.352 15.91m0-7.558l7.558 7.558" />
  </svg>
);

export default CompassIcon;
