
import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface ConstructionDetailProps {
  onBack: () => void;
  onDiscussStaffing: () => void;
}

const roles = [
    {
        title: "Project Managers",
        description: "Overseeing projects from conception to completion, ensuring they are on time and within budget.",
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766910357/Project-Management-Tips-Chad-Fisher-Construction_fq2hnb.jpg"
    },
    {
        title: "Civil Engineers",
        description: "Designing and supervising the construction of infrastructure projects like roads, bridges, and buildings.",
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766911210/Bridging-the-Skills-Gap-Immediate-Steps-for-Young-Civil-Engineers-in-India_b2l3zt.jpg"
    },
    {
        title: "Site Supervisors",
        description: "Managing day-to-day operations on the construction site, ensuring safety and quality standards.",
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766911488/Carpenter_optimized_rtdvkc.jpg"
    },
    {
        title: "Architects & Designers",
        description: "Creating the blueprints and innovative designs for new construction and renovation projects.",
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766911713/designer_nc0wjo.jpg"
    }
];

const ConstructionDetail: React.FC<ConstructionDetailProps> = ({ onBack, onDiscussStaffing }) => {
  return (
    <section id="construction-detail" className="py-20 bg-brand-light animate-fade-in">
      <div className="container mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-dark font-semibold mb-8 hover:text-brand-gold transition-colors"
          aria-label="Go back to industries view"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Back to Industries
        </button>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <h2 className="font-serif text-4xl font-bold text-brand-dark mb-4">
                Building the Future: Construction Recruitment
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                The Recruit Globe is a cornerstone in construction recruitment, connecting leading firms with the skilled professionals needed to build the world's skylines and infrastructure. From large-scale commercial developments to intricate civil engineering projects, we understand the critical need for precision, safety, and expertise.
              </p>

              <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">Roles We Specialize In</h3>
              <div className="grid sm:grid-cols-2 gap-6 mt-6">
                {roles.map(role => (
                    <div key={role.title} className="group relative rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden min-h-[220px] flex flex-col justify-end p-4">
                        <img src={role.imageUrl} alt={role.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                        <div className="relative z-10" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                            <h4 className="font-bold text-white text-xl font-serif">{role.title}</h4>
                            <p className="text-gray-200 text-sm mt-1">{role.description}</p>
                        </div>
                    </div>
                ))}
              </div>

              <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">Why Partner With Us?</h3>
              
              <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Industry Expertise:</strong> Proven expertise in sourcing talent for large-scale infrastructure, commercial, and residential projects.</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Global Talent Pool:</strong> Access to a global network of certified and experienced construction professionals, from engineers to project leaders.</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Flexible Staffing Solutions:</strong> We provide adaptable staffing models, including permanent hires, contract staff, and project-based teams.</span></li>
              </ul>
              <div className="mt-10">
                <button
                  onClick={onDiscussStaffing}
                  className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-block"
                >
                  Discuss Your Construction Staffing Needs
                </button>
              </div>
            </div>
            <div className="lg:w-1/3">
                <img
                    src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1920&auto=format=fit=crop"
                    alt="A high-rise construction site against a city skyline"
                    className="w-full h-full min-h-[400px] object-cover rounded-lg shadow-lg"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionDetail;