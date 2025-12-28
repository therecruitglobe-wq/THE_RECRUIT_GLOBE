
import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface MiningDetailProps {
  onBack: () => void;
  onDiscussStaffing: () => void;
}

const roles = [
    {
        title: "Geologists",
        description: "Identifying and evaluating mineral deposits to determine the feasibility and scope of mining operations.",
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766922589/geologist_pe5cuh.jpg"
    },
    {
        title: "Mining Engineers",
        description: "Planning and designing mines, including tunnels and shafts, for the safe and efficient extraction of resources.",
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766922326/mining_engineer_aumhih.jpg"
    },
    {
        title: "Health & Safety Managers",
        description: "Implementing comprehensive safety programs to mitigate risks and ensure the well-being of all personnel on site.",
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766922072/health_safety_fjdkpw.jpg"
    },
    {
        title: "Heavy Equipment Operators",
        description: "Skilled professionals operating and maintaining large-scale machinery essential for mining operations.",
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766921525/heavy-equipment-operator_f0dcaj.jpg"
    }
];

const MiningDetail: React.FC<MiningDetailProps> = ({ onBack, onDiscussStaffing }) => {
  return (
    <section id="mining-detail" className="py-20 bg-brand-light animate-fade-in">
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
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl font-bold text-brand-dark mb-4">
              Unearthing Talent: Mining Recruitment
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              The global mining industry requires a highly specialized and resilient workforce to meet the world's demand for essential resources. The Recruit Globe excels in sourcing top-tier talent for every stage of the mining lifecycle, from initial exploration to extraction and site management. We connect you with professionals who prioritize safety, efficiency, and sustainability.
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

            <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">Why Partner With Us for Mining?</h3>
            
            <ul className="space-y-4 text-gray-700">
                <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Global Resource Network:</strong> Access to a specialized global network of professionals with experience in diverse mining environments.</span></li>
                <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Remote & On-Site Specialists:</strong> Expertise in sourcing candidates for both remote exploration and on-site operational roles.</span></li>
                <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Commitment to Safety:</strong> We prioritize candidates with a proven commitment to the highest standards of health and safety in the industry.</span></li>
            </ul>
            <div className="mt-10">
              <button
                onClick={onDiscussStaffing}
                className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-block"
              >
                Discuss Your Mining Staffing Needs
              </button>
            </div>
             <img 
                src="https://res.cloudinary.com/dghlhdc9n/image/upload/v1766922811/mining_image_hdtpod.jpg"
                alt="Heavy machinery at a large mining site"
                className="w-full h-auto object-cover rounded-lg shadow-lg mt-12"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiningDetail;