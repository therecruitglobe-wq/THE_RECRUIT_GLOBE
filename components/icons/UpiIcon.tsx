
import React from 'react';

const UpiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 40" 
    {...props}
    aria-label="UPI"
  >
    <path fill="#fff" d="M0 0h100v40H0z"/>
    <path fill="#e77123" d="M8.2 28.5h6.6v-17H8.2z"/>
    <path fill="#231f20" d="M14.8 11.5v17h6.6V18c0-2.3 1-3.6 3.4-3.6 2.4 0 3.4 1.3 3.4 3.6v10h6.6v-17h-6.6v1.9c-1.4-2.1-3.6-2.5-5.9-2.5-4.2 0-7.5 3-7.5 6.1zM58.9 11.5l-6.8 9.9-6.8-9.9h-7.7l10.9 15.3v1.7h7.3v-1.7l10.8-15.3zM92.2 28.5h-21V11.5h6.6v13.4h14.4z"/>
    <path fill="#236094" d="M71.2 11.5h6.6v17h-6.6z"/>
  </svg>
);

export default UpiIcon;
