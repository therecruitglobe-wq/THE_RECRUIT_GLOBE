
import React from 'react';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface AboutPageProps {
  onBack: () => void;
  onNavigate: (view: string, hash?: string) => void;
}

const coreValues = [
    {
        title: "Integrity",
        description: "We operate with transparency and uphold the highest ethical standards in every interaction."
    },
    {
        title: "Partnership",
        description: "We build collaborative, long-term relationships with both our clients and candidates."
    },
    {
        title: "Excellence",
        description: "We are committed to delivering outstanding results and exceeding expectations."
    },
    {
        title: "Innovation",
        description: "We leverage technology and forward-thinking strategies to stay ahead in a dynamic global market."
    }
];

const AboutPage: React.FC<AboutPageProps> = ({ onBack, onNavigate }) => {
  return (
    <section id="about-page" className="py-20 bg-brand-light animate-fade-in">
      <div className="container mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-dark font-semibold mb-8 hover:text-brand-gold transition-colors"
          aria-label="Go back to home page"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Back to Home
        </button>
        
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl">
            <div className="text-center mb-12">
                <h1 className="font-serif text-5xl font-bold">About The Recruit Globe</h1>
                <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                    Your Strategic Partner in Global Talent Acquisition.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-16">
              <div className="lg:w-1/2 w-full">
                <div className="rounded-lg overflow-hidden shadow-2xl">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920&auto=format&fit=crop"
                    className="w-full h-full object-cover aspect-video"
                    aria-label="A diverse team of professionals collaborating on a project, showcasing The Recruit Globe's values."
                  >
                    <source src="https://videos.pexels.com/video-files/3209828/3209828-hd.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              <div className="lg:w-1/2">
                <p className="text-lg text-gray-700 mb-6">
                  Founded on the principles of integrity, partnership, and excellence, The Recruit Globe is more than just a recruitment agency. We are career architects and growth partners, dedicated to building lasting relationships that foster success for both individuals and organizations.
                </p>
                <p className="text-gray-600">
                  Our global network and deep industry knowledge allow us to navigate the complexities of the modern job market, delivering tailored solutions that meet the unique needs of our clients and candidates. We believe that the right person in the right role can change the world.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 text-center mb-16">
                <div>
                    <h3 className="font-serif text-3xl font-bold text-brand-dark mb-3">Our Mission</h3>
                    <p className="text-gray-700">To connect visionary companies with exceptional talent, creating powerful partnerships that drive innovation, growth, and long-term success on a global scale.</p>
                </div>
                <div>
                    <h3 className="font-serif text-3xl font-bold text-brand-dark mb-3">Our Vision</h3>
                    <p className="text-gray-700">To be the world's most trusted and effective recruitment partner, recognized for our unwavering commitment to quality, integrity, and personalized service.</p>
                </div>
            </div>

            <div className="mb-12">
                <h3 className="font-serif text-3xl font-bold text-brand-dark mb-8 text-center">Our Core Values</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {coreValues.map(value => (
                        <div key={value.title} className="bg-brand-light p-6 rounded-lg text-center">
                            <CheckCircleIcon className="w-10 h-10 text-brand-gold mx-auto mb-3" />
                            <h4 className="font-bold text-xl text-brand-dark mb-2">{value.title}</h4>
                            <p className="text-gray-600 text-sm">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center pt-8 border-t border-gray-200">
                 <h3 className="font-serif text-3xl font-bold text-brand-dark mb-4">Let's Build the Future Together</h3>
                 <p className="text-gray-700 max-w-3xl mx-auto mb-8">
                    Whether you are a professional seeking your next challenge or an organization looking for game-changing talent, we are ready to partner with you.
                 </p>
                 <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <button onClick={() => onNavigate('main', '#jobs')} className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
                        Explore Job Openings
                    </button>
                    <button onClick={() => onNavigate('partnerPage')} className="bg-transparent border-2 border-brand-dark hover:bg-brand-dark hover:text-white text-brand-dark font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
                        Partner With Us
                    </button>
                 </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default AboutPage;
