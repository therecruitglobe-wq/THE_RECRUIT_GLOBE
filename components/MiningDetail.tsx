
import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';
import ImageUploader from './ImageUploader';

interface MiningDetailProps {
  onBack: () => void;
  onDiscussStaffing: () => void;
}

const roles = [
    {
        title: "Geologists",
        description: "Identifying and evaluating mineral deposits to determine the feasibility and scope of mining operations.",
        imageUrl: "https://img.freepik.com/free-photo/worker-holding-rock-with-minerals-it_23-2149129596.jpg"
    },
    {
        title: "Mining Engineers",
        description: "Planning and designing mines, including tunnels and shafts, for the safe and efficient extraction of resources.",
        imageUrl: "https://img.freepik.com/free-photo/man-working-excavator_23-2148780287.jpg"
    },
    {
        title: "Health & Safety Managers",
        description: "Implementing comprehensive safety programs to mitigate risks and ensure the well-being of all personnel on site.",
        imageUrl: "https://img.freepik.com/free-photo/portrait-young-woman-engineer-with-helmet-standing-construction-site_625516-4351.jpg"
    },
    {
        title: "Heavy Equipment Operators",
        description: "Skilled professionals operating and maintaining large-scale machinery essential for mining operations.",
        imageUrl: "https://img.freepik.com/free-photo/big-yellow-excavator-working-sand-pit_1340-23910.jpg"
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
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
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
            </div>
            <div className="lg:w-1/3">
                <ImageUploader
                    defaultImageUrl="https://img.freepik.com/free-photo/excavator-loads-coal-into-dump-truck_23-2147721867.jpg"
                    altText="A large haul truck in an open-pit mine"
                    storageKey="mining-detail-image"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiningDetail;
