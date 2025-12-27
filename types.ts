
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Part-time' | 'Remote';
  description: string;
  responsibilities: string[];
  qualifications: string[];
  imageUrl?: string;
  datePosted: string; // YYYY-MM-DD
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

export type ApplicationStatus = 'Not Applied' | 'Applied' | 'Interviewing' | 'Offered' | 'Rejected';