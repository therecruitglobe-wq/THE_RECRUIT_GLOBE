
import React from 'react';

const PaytmIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 35" 
    {...props}
    aria-label="Paytm"
  >
    <path d="M8.83 1.92H0v30.95h8.83c8.96 0 14.38-5.42 14.38-15.48S17.79 1.92 8.83 1.92zm-.54 24.9h-3.1V8.2h3.1c5.23 0 7.85 3.32 7.85 9.32s-2.62 9.3-7.85 9.3zM45.5 1.92l-9.33 13.78L26.83 1.92h-9.13l13.67 19.3L27.5 32.87h8.8l-4-6.8h10.8v6.8h7.9V1.92H45.5zM99.63 1.92h-8.2l-3.3 15.6-3.3-15.6h-8.2v30.95h7.9V12.17l3.84 18.2h2.8l3.83-18.2v20.7h7.9V1.92zM73.47 1.92h-9.13l-9.34 30.95h7.9l1.6-5.83h9.8l1.6 5.83h7.9L73.47 1.92zm-1.88 19.3l3.5-12.72 3.5 12.72h-7z" fill="#002970"/>
  </svg>
);

export default PaytmIcon;
