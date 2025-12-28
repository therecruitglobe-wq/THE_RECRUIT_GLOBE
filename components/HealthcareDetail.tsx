
import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface HealthcareDetailProps {
  onBack: () => void;
  onDiscussStaffing: () => void;
}

const roles = [
    {
        title: "Doctors & Physicians",
        description: "Connecting you with specialists, general practitioners, surgeons, and hospitalists.",
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766909091/doctors_and_physicians_nymesx.jpg"
    },
    {
        title: "Nurses & Practitioners",
        description: "Sourcing Registered Nurses (RNs), Nurse Practitioners (NPs), and Clinical Nurse Specialists.",
        imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1920&auto=format=fit=crop"
    },
    {
        title: "Allied Health Professionals",
        description: "Recruiting for roles like Physiotherapists, Occupational Therapists, and Radiographers.",
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766909418/allied_eqvbq7.webp"
    },
    {
        title: "Medical Technicians",
        description: "Finding skilled Lab Technicians, Pharmacy Technicians, and Surgical Technologists.",
        imageUrl: "https://res.cloudinary.com/dghlhdc9n/image/upload/v1766909655/medical_technican_pqjsek.webp"
    }
];

const HealthcareDetail: React.FC<HealthcareDetailProps> = ({ onBack, onDiscussStaffing }) => {
  return (
    <section id="healthcare-detail" className="py-20 bg-brand-light animate-fade-in">
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
                Expert Recruitment for the Healthcare Sector
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                The Recruit Globe is at the forefront of healthcare recruitment, connecting leading medical facilities with the most skilled and compassionate professionals. We understand the critical importance of every role in a clinical setting and are committed to sourcing talent that enhances patient care and operational efficiency.
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

              <h3 className="font-serif text-2xl font-bold text-brand-dark mt-8 mb-4">Why Partner With Us for Healthcare?</h3>
              
              <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Vetted Professionals:</strong> Our rigorous screening and credential verification process ensures you get the most qualified candidates.</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Compliance & Credentialing:</strong> We expertly navigate the complex web of healthcare regulations and licensing.</span></li>
                  <li className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-brand-gold mr-3 flex-shrink-0" /><span><strong>Wide Range of Specialities:</strong> From niche surgical fields to general practice, our network covers all areas of medicine.</span></li>
              </ul>
              <div className="mt-10">
                <button
                  onClick={onDiscussStaffing}
                  className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 inline-block"
                >
                  Discuss Your Healthcare Staffing Needs
                </button>
              </div>
            </div>
            <div className="lg:w-1/3">
                <img 
                    src="https://res.cloudinary.com/dghlhdc9n/image/upload/v1766909994/corridor_c0b0n5.jpg" 
                    alt="A modern and clean hospital corridor" 
                    className="w-full h-full min-h-[400px] object-cover rounded-lg shadow-lg"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthcareDetail;