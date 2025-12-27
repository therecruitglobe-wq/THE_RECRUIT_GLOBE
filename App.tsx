
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SuccessStories from './components/SuccessStories';
import PartnershipForm from './components/PartnershipForm';
import Services from './components/Services';
import Verticals from './components/Verticals';
import JobListings from './components/JobListings';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import HiringForm from './components/HiringForm';
import HealthcareDetail from './components/HealthcareDetail';
import OilAndGasDetail from './components/OilAndGasDetail';
import ConstructionDetail from './components/ConstructionDetail';
import GlobalReach from './components/GlobalReach';
import MiddleEastDetail from './components/MiddleEastDetail';
import AfricaDetail from './components/AfricaDetail';
import EuropeDetail from './components/EuropeDetail';
import IndiaDetail from './components/IndiaDetail';
import JobSeekerServices from './components/JobSeekerServices';
import CVOptimizationDetail from './components/CVOptimizationDetail';
import LinkedInOptimizationDetail from './components/LinkedInOptimizationDetail';
import CareerStrategyDetail from './components/CareerStrategyDetail';
import InterviewPrepDetail from './components/InterviewPrepDetail';
import JobSearchEnablementDetail from './components/JobSearchEnablementDetail';
import JobDetailAndApplyPage from './components/JobDetailAndApplyPage';
import IndustriesPage from './components/IndustriesPage';
import ITDetail from './components/ITDetail';
import ManufacturingDetail from './components/ManufacturingDetail';
import MiningDetail from './components/MiningDetail';
import type { Job } from './types';
import { jobs } from './data/jobs';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import PartnerPage from './components/PartnerPage';

type View = 'main' | 'hiringForm' | 'healthcareDetail' | 'oilAndGasDetail' | 'constructionDetail' | 'itDetail' | 'manufacturingDetail' | 'miningDetail' | 'middleEastDetail' | 'africaDetail' | 'europeDetail' | 'indiaDetail' | 'cvOptimizationDetail' | 'linkedInOptimizationDetail' | 'careerStrategyDetail' | 'interviewPrepDetail' | 'jobSearchEnablementDetail' | 'jobDetailAndApply' | 'industriesPage' | 'contactPage' | 'aboutPage' | 'partnerPage';

const pageMeta: { [key in View]?: { title: string; description: string } } = {
    main: {
        title: 'The Recruit Globe - Finding. Connecting. Building Success.',
        description: 'A premier recruitment agency connecting top talent with leading companies worldwide in Healthcare, IT, Oil & Gas, Construction, and more.'
    },
    hiringForm: {
        title: 'Hire Top Talent | The Recruit Globe',
        description: 'Partner with us to find the perfect candidates for your organization. Submit your hiring requirements and let our experts handle the search.'
    },
    industriesPage: {
        title: 'Industries We Serve | The Recruit Globe',
        description: 'Explore our expertise across key global industries including Healthcare, IT, Oil & Gas, Construction, Manufacturing, and Mining.'
    },
    healthcareDetail: {
        title: 'Healthcare Recruitment | The Recruit Globe',
        description: 'Specialized recruitment for the healthcare sector, connecting medical facilities with skilled doctors, nurses, and allied health professionals.'
    },
    oilAndGasDetail: {
        title: 'Oil & Gas Recruitment | The Recruit Globe',
        description: 'Expert recruitment for the oil & gas industry, from upstream exploration to downstream refining and renewables.'
    },
    constructionDetail: {
        title: 'Construction Recruitment | The Recruit Globe',
        description: 'Sourcing top talent for the construction industry, including project managers, civil engineers, and site supervisors.'
    },
    itDetail: {
        title: 'IT & Technology Recruitment | The Recruit Globe',
        description: 'Connecting innovative companies with elite IT professionals in software development, cloud engineering, cybersecurity, and data science.'
    },
    manufacturingDetail: {
        title: 'Manufacturing Recruitment | The Recruit Globe',
        description: 'Sourcing skilled talent for the modern manufacturing sector, including production, quality assurance, and automation.'
    },
    miningDetail: {
        title: 'Mining Recruitment | The Recruit Globe',
        description: 'Specialized recruitment for the global mining industry, from geology and engineering to health and safety.'
    },
    middleEastDetail: {
        title: 'Recruitment in the Middle East | The Recruit Globe',
        description: 'Your recruitment partner in the Middle East. We connect world-class talent with visionary companies in the UAE, Saudi Arabia, Qatar, and more.'
    },
    africaDetail: {
        title: 'Recruitment in Africa | The Recruit Globe',
        description: 'Your recruitment gateway to Africa. We identify high-caliber talent across the continent\'s key industries, including mining, finance, and technology.'
    },
    europeDetail: {
        title: 'Recruitment in Europe | The Recruit Globe',
        description: 'Sophisticated recruitment solutions across the diverse European market, from London\'s financial hubs to Berlin\'s tech scene.'
    },
    indiaDetail: {
        title: 'Recruitment in India | The Recruit Globe',
        description: 'Connecting global organizations with India\'s brightest minds and vast pool of skilled professionals in tech, manufacturing, and finance.'
    },
    cvOptimizationDetail: {
        title: 'CV Optimization Service | The Recruit Globe',
        description: 'Make your profile stand out with our international, ATS-friendly CV optimization service. Get noticed by top recruiters.'
    },
    linkedInOptimizationDetail: {
        title: 'LinkedIn Profile Optimization | The Recruit Globe',
        description: 'Transform your LinkedIn profile into a powerful career tool that tells your professional story and attracts the right opportunities.'
    },
    careerStrategyDetail: {
        title: 'Career Strategy Consulting | The Recruit Globe',
        description: 'Navigate your professional journey with confidence. Get personalized guidance to define your career path and achieve long-term success.'
    },
    interviewPrepDetail: {
        title: 'Interview Preparation Service | The Recruit Globe',
        description: 'Land your dream job with our comprehensive interview preparation, including mock interviews and salary negotiation guidance.'
    },
    jobSearchEnablementDetail: {
        title: 'Job Search Enablement | The Recruit Globe',
        description: 'Gain a strategic advantage in your job search with market intelligence, targeted strategies, and access to the hidden job market.'
    },
    contactPage: {
        title: 'Contact Us | The Recruit Globe',
        description: 'Get in touch with The Recruit Globe. Find our contact details, office address, or send us a message through our contact form.'
    },
    aboutPage: {
        title: 'About Us | The Recruit Globe',
        description: 'Learn about The Recruit Globe, our mission, vision, and the core values that drive our success as a global recruitment partner.'
    },
    partnerPage: {
        title: 'Partner With Us | The Recruit Globe',
        description: 'Collaborate with The Recruit Globe to find top-tier talent. Submit your hiring needs and let our expert recruiters build your team.'
    },
};

const App: React.FC = () => {
  const [view, setView] = useState<View>('main');
  const [scrollToHash, setScrollToHash] = useState<string | null>(null);
  const [jobForDetailPage, setJobForDetailPage] = useState<Job | null>(null);
  const [contactMessage, setContactMessage] = useState('');

  const handleViewChange = (newView: View, hash?: string, context?: { contactMessage?: string }) => {
    setContactMessage(context?.contactMessage || '');
    setView(newView);
    setScrollToHash(hash || null);
  };

  useEffect(() => {
    // Handle deep linking for jobs on initial load
    const handleDeepLink = () => {
        const hash = window.location.hash;
        if (hash.startsWith('#job/')) {
            const jobId = parseInt(hash.substring(5), 10);
            if (!isNaN(jobId)) {
                const jobToView = jobs.find(j => j.id === jobId);
                if (jobToView) {
                    setJobForDetailPage(jobToView);
                    setView('jobDetailAndApply');
                    // Prevent the main scroll effect from running for deep links
                    return true;
                }
            }
        }
        return false;
    };

    const updateMetaTags = () => {
        let title: string;
        let description: string;
        const defaultMeta = pageMeta['main']!;

        if (view === 'jobDetailAndApply' && jobForDetailPage) {
            title = `${jobForDetailPage.title} at ${jobForDetailPage.company} | The Recruit Globe`;
            description = jobForDetailPage.description.substring(0, 155).trim() + '...';
        } else {
            const meta = pageMeta[view] || defaultMeta;
            title = meta.title;
            description = meta.description;
        }
        
        document.title = title;
        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta) {
            descriptionMeta.setAttribute('content', description);
        }
    };

    updateMetaTags();
    
    // Only run scroll logic if not handling a deep link on initial load
    if (handleDeepLink()) return;

    // On subsequent view changes, scroll to top or to a specific element if a hash is provided.
    if (scrollToHash) {
      const timer = setTimeout(() => {
        const element = document.getElementById(scrollToHash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setScrollToHash(null);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [view, scrollToHash, jobForDetailPage]);

  if (view === 'hiringForm') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <HiringForm onBack={() => handleViewChange('main')} />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (view === 'contactPage') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <ContactPage onBack={() => handleViewChange('main')} />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (view === 'partnerPage') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <PartnerPage onBack={() => handleViewChange('main')} />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (view === 'aboutPage') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <AboutPage 
            onBack={() => handleViewChange('main')}
            onNavigate={handleViewChange}
          />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (view === 'industriesPage') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <IndustriesPage
            onBack={() => handleViewChange('main')}
            onVerticalClick={(verticalName) => {
              if (verticalName === 'Healthcare') handleViewChange('healthcareDetail');
              if (verticalName === 'Oil & Gas') handleViewChange('oilAndGasDetail');
              if (verticalName === 'Construction') handleViewChange('constructionDetail');
              if (verticalName === 'IT') handleViewChange('itDetail');
              if (verticalName === 'Manufacturing') handleViewChange('manufacturingDetail');
              if (verticalName === 'Mining') handleViewChange('miningDetail');
            }}
          />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (view === 'healthcareDetail') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <HealthcareDetail 
            onBack={() => handleViewChange('main')} 
            onDiscussStaffing={() => handleViewChange('main', '#contact', { contactMessage: "I'd like to discuss our staffing needs for the Healthcare sector." })}
          />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (view === 'oilAndGasDetail') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <OilAndGasDetail 
            onBack={() => handleViewChange('main')}
            onDiscussStaffing={() => handleViewChange('main', '#contact', { contactMessage: "I'd like to discuss our staffing needs for the Oil & Gas sector." })}
          />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }
  
  if (view === 'constructionDetail') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <ConstructionDetail 
            onBack={() => handleViewChange('main')}
            onDiscussStaffing={() => handleViewChange('main', '#contact', { contactMessage: "I'd like to discuss our staffing needs for the Construction sector." })}
          />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (view === 'itDetail') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <ITDetail
            onBack={() => handleViewChange('main')}
            onDiscussStaffing={() => handleViewChange('main', '#contact', { contactMessage: "I'd like to discuss our staffing needs for the IT & Technology sector." })}
          />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (view === 'manufacturingDetail') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <ManufacturingDetail
            onBack={() => handleViewChange('main')}
            onDiscussStaffing={() => handleViewChange('main', '#contact', { contactMessage: "I'd like to discuss our staffing needs for the Manufacturing sector." })}
          />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (view === 'miningDetail') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <MiningDetail
            onBack={() => handleViewChange('main')}
            onDiscussStaffing={() => handleViewChange('main', '#contact', { contactMessage: "I'd like to discuss our staffing needs for the Mining sector." })}
          />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (view === 'middleEastDetail') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <MiddleEastDetail 
            onBack={() => handleViewChange('main')}
            onDiscussStaffing={() => handleViewChange('main', '#contact', { contactMessage: "I'd like to discuss our staffing needs for the Middle East region." })}
          />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }
  
  if (view === 'africaDetail') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <AfricaDetail 
            onBack={() => handleViewChange('main')}
            onDiscussStaffing={() => handleViewChange('main', '#contact', { contactMessage: "I'd like to discuss our staffing needs for the Africa region." })}
          />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }
  
  if (view === 'europeDetail') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <EuropeDetail 
            onBack={() => handleViewChange('main')}
            onDiscussStaffing={() => handleViewChange('main', '#contact', { contactMessage: "I'd like to discuss our staffing needs for the Europe region." })}
          />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (view === 'indiaDetail') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <IndiaDetail 
            onBack={() => handleViewChange('main')}
            onDiscussStaffing={() => handleViewChange('main', '#contact', { contactMessage: "I'd like to discuss our staffing needs for the India region." })}
          />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (view === 'cvOptimizationDetail') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <CVOptimizationDetail 
            onBack={() => handleViewChange('main')}
            onEnquire={() => handleViewChange('main', '#contact', { contactMessage: "I'm interested in the International CV Optimization (ATS-Friendly) service." })}
          />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (view === 'linkedInOptimizationDetail') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <LinkedInOptimizationDetail 
            onBack={() => handleViewChange('main')}
            onEnquire={() => handleViewChange('main', '#contact', { contactMessage: "I'm interested in the LinkedIn Profile Optimization service." })}
          />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (view === 'careerStrategyDetail') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <CareerStrategyDetail 
            onBack={() => handleViewChange('main')}
            onEnquire={() => handleViewChange('main', '#contact', { contactMessage: "I'm interested in the Career Strategy & Job Readiness Consulting service." })}
          />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }
  
  if (view === 'interviewPrepDetail') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <InterviewPrepDetail 
            onBack={() => handleViewChange('main')}
            onEnquire={() => handleViewChange('main', '#contact', { contactMessage: "I'm interested in the Interview Preparation & Salary Guidance service." })}
          />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (view === 'jobSearchEnablementDetail') {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <JobSearchEnablementDetail 
            onBack={() => handleViewChange('main')}
            onEnquire={() => handleViewChange('main', '#contact', { contactMessage: "I'm interested in the Job Search Enablement & Market Direction service." })}
          />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (view === 'jobDetailAndApply' && jobForDetailPage) {
    return (
      <div className="bg-brand-light font-sans text-brand-dark">
        <Header onNavigate={handleViewChange} />
        <main>
          <JobDetailAndApplyPage 
            job={jobForDetailPage}
            onBack={() => {
              setJobForDetailPage(null);
              // Clear the hash from the URL when going back
              history.pushState("", document.title, window.location.pathname + window.location.search);
              handleViewChange('main', '#jobs');
            }}
          />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    );
  }


  return (
    <div className="bg-brand-light font-sans text-brand-dark">
      <Header onNavigate={handleViewChange} />
      <main>
        <Hero onNavigate={handleViewChange} />
        <SuccessStories onNavigate={handleViewChange} />
        <PartnershipForm onNavigate={() => handleViewChange('partnerPage')} />
        <Services onFindTalentClick={() => handleViewChange('hiringForm')} />
        <JobSeekerServices onServiceClick={(serviceTitle) => {
          if (serviceTitle === 'International CV Optimization (ATS-Friendly)') {
            handleViewChange('cvOptimizationDetail');
          }
          if (serviceTitle === 'LinkedIn Profile Optimization') {
            handleViewChange('linkedInOptimizationDetail');
          }
          if (serviceTitle === 'Career Strategy & Job Readiness Consulting') {
            handleViewChange('careerStrategyDetail');
          }
          if (serviceTitle === 'Interview Preparation & Salary Guidance') {
            handleViewChange('interviewPrepDetail');
          }
          if (serviceTitle === 'Job Search Enablement & Market Direction') {
            handleViewChange('jobSearchEnablementDetail');
          }
        }} />
        <Verticals onVerticalClick={(verticalName) => {
            if (verticalName === 'Healthcare') handleViewChange('healthcareDetail');
            if (verticalName === 'Oil & Gas') handleViewChange('oilAndGasDetail');
            if (verticalName === 'Construction') handleViewChange('constructionDetail');
            if (verticalName === 'IT') handleViewChange('itDetail');
            if (verticalName === 'Manufacturing') handleViewChange('manufacturingDetail');
            if (verticalName === 'Mining') handleViewChange('miningDetail');
        }} />
        <GlobalReach onRegionClick={(regionName) => {
          if (regionName === 'Middle East') {
            handleViewChange('middleEastDetail');
          }
          if (regionName === 'Africa') {
            handleViewChange('africaDetail');
          }
          if (regionName === 'Europe') {
            handleViewChange('europeDetail');
          }
          if (regionName === 'India') {
            handleViewChange('indiaDetail');
          }
        }} />
        <JobListings onViewDetails={(job) => {
          setJobForDetailPage(job);
          handleViewChange('jobDetailAndApply');
        }} />
        <About onLearnMore={() => handleViewChange('aboutPage')} />
        <Contact contactMessage={contactMessage} />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;
