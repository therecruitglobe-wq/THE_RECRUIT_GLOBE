
import React from 'react';

const BriefcaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
      d="M20.25 14.15v4.07a2.25 2.25 0 01-2.25 2.25H5.92a2.25 2.25 0 01-2.25-2.25v-4.07a2.25 2.25 0 01.92-1.75l.16-.12a2.25 2.25 0 00-.53-4.02l-.16-.07a2.25 2.25 0 01-1.74-2.18v-1.14a2.25 2.25 0 012.25-2.25h12.5a2.25 2.25 0 012.25 2.25v1.14a2.25 2.25 0 01-1.74 2.18l-.16.07a2.25 2.25 0 00-.53 4.02l.16.12a2.25 2.25 0 01.92 1.75z"
    />
  </svg>
);

export default BriefcaseIcon;
