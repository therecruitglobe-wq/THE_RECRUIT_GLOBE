
import React from 'react';

const UsersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18 18.72a9.094 9.094 0 00-12 0m12 0a9.094 9.094 0 00-12 0m12 0a9.094 9.094 0 00-12 0M6 18.72a9.094 9.094 0 0012 0m-12 0a9.094 9.094 0 0012 0m-12 0a9.094 9.094 0 0012 0M15 9a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export default UsersIcon;
