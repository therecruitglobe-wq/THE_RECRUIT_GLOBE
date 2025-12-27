
import React from 'react';

const EngineeringIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-1.008 1.11-1.212l1.233-.514a1.875 1.875 0 011.664 0l1.233.514c.55.204 1.02.67 1.11 1.212l.217 1.306a1.875 1.875 0 001.168 1.168l1.306.217c.542.09 1.008.56 1.212 1.11l.514 1.233a1.875 1.875 0 010 1.664l-.514 1.233c-.204.55-.67 1.02-1.212 1.11l-1.306.217a1.875 1.875 0 00-1.168 1.168l-.217 1.306c-.09.542-.56 1.008-1.11 1.212l-1.233.514a1.875 1.875 0 01-1.664 0l-1.233-.514c-.55-.204-1.02-.67-1.11-1.212l-.217-1.306a1.875 1.875 0 00-1.168-1.168l-1.306-.217c-.542-.09-1.008-.56-1.212-1.11l-.514-1.233a1.875 1.875 0 010-1.664l.514-1.233c.204-.55.67-1.02 1.212-1.11l1.306-.217a1.875 1.875 0 001.168-1.168l.217-1.306z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
  </svg>
);

export default EngineeringIcon;
