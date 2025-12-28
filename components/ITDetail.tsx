
import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface ITDetailProps {
  onBack: () => void;
  onDiscussStaffing: () => void;
}

const roles = [
    {
        title: "Software Developers",
        description: "Building robust and scalable software solutions, from front-end interfaces to back-end systems.",
        imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1920&auto=format&fit=crop"
    },
    {
        title: "Cloud Engineers",
        description: "Designing, implementing, and managing cloud infrastructure on platforms like AWS, Azure, and GCP.",
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766916088/cloud_engineer_n6xfmm.jpg"
    },
    {
        title: "Product Managers",
        description: "Guiding product development from conception to launch, bridging technical and business goals.",
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766916495/product_manager_daliok.webp"
    },
    {
        title: "Cybersecurity Analysts",
        description: "Protecting digital assets by identifying vulnerabilities and responding to security threats.",
        imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1920&auto=format&fit=crop"
    },
    {
        title: "Data Scientists",
        description: "Analyzing complex datasets to extract valuable insights and drive business decisions with machine learning.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1920&auto=format&fit=crop"
    }
];

const ITDetail: React.FC<ITDetailProps> = ({ onBack, onDiscussStaffing }) => {
  return (
    <section id="it-detail" className="py-20 bg-brand-light animate-fade-in">
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
                Powering Innovation: IT & Technology Recruitment
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                In the fast-paced world of technology, having the right talent is the ultimate competitive advantage. The Recruit Globe specializes in sourcing elite IT professionals who can drive digital transformation and innovation. We connect companies with the experts needed to build, secure, and scale their technological infrastructure.
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

              <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">Why Partner With Us for IT?</h3>
              
              <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Niche Skill Sourcing:</strong> Access to a curated network of candidates with specialized skills in emerging technologies.</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Rapid Placement:</strong> Our agile recruitment process ensures you fill critical IT roles quickly, minimizing project delays.</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Cultural & Technical Fit:</strong> We go beyond keywords to find candidates who have the right skills and fit your team's dynamic.</span></li>
              </ul>
              <div className="mt-10">
                <button
                  onClick={onDiscussStaffing}
                  className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-block"
                >
                  Discuss Your IT Staffing Needs
                </button>
              </div>
            </div>
            <div className="lg:w-1/3">
                <img 
                    src="https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=1920&auto=format&fit=crop" 
                    alt="A modern server room with glowing lights" 
                    className="w-full h-full min-h-[400px] object-cover rounded-lg shadow-lg"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ITDetail;