import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Import slide components
import TitleSlide from './components/TitleSlide';
import ProblemSlide from './components/ProblemSlide';
import SolutionSlide from './components/SolutionSlide';
import MarketSlide from './components/MarketSlide';
import BusinessModelSlide from './components/BusinessModelSlide';
import GoToMarketSlide from './components/GoToMarketSlide';
import TractionSlide from './components/TractionSlide';
import TeamSlide from './components/TeamSlide';
import FinancialsSlide from './components/FinancialsSlide';
import AskSlide from './components/AskSlide';
import ContactSlide from './components/ContactSlide';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 11; // Based on short-version.md
  
  // Create a ref to track the current slide's internal state
  const slideStateRef = React.useRef({
    currentStep: 1,
    maxSteps: 1
  });

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
      // Reset step counter when changing slides
      slideStateRef.current = { currentStep: 1, maxSteps: 1 };
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      // Reset step counter when changing slides
      slideStateRef.current = { currentStep: 1, maxSteps: 1 };
    }
  };

  const nextStep = () => {
    const { currentStep, maxSteps } = slideStateRef.current;
    if (currentStep < maxSteps) {
      slideStateRef.current.currentStep += 1;
      // Dispatch a custom event that slides can listen for
      document.dispatchEvent(new CustomEvent('slideStepChange', { 
        detail: { step: slideStateRef.current.currentStep } 
      }));
    } else {
      nextSlide();
    }
  };

  const prevStep = () => {
    const { currentStep } = slideStateRef.current;
    if (currentStep > 1) {
      slideStateRef.current.currentStep -= 1;
      // Dispatch a custom event that slides can listen for
      document.dispatchEvent(new CustomEvent('slideStepChange', { 
        detail: { step: slideStateRef.current.currentStep } 
      }));
    } else {
      prevSlide();
    }
  };

  // Method for slides to register their max steps
  const registerSlideSteps = (maxSteps) => {
    slideStateRef.current.maxSteps = maxSteps;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      nextStep();
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevStep();
    }
  };

  // Add global keyboard listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide]); // Re-add when slide changes

  // Render the appropriate slide based on currentSlide
  const renderSlide = () => {
    // Pass the registerSlideSteps function to each slide component
    const props = { registerSlideSteps };
    
    switch (currentSlide) {
      case 0:
        return <TitleSlide {...props} />;
      case 1:
        return <ProblemSlide {...props} />;
      case 2:
        return <SolutionSlide {...props} />;
      case 3:
        return <MarketSlide {...props} />;
      case 4:
        return <BusinessModelSlide {...props} />;
      case 5:
        return <GoToMarketSlide {...props} />;
      case 6:
        return <TractionSlide {...props} />;
      case 7:
        return <TeamSlide {...props} />;
      case 8:
        return <FinancialsSlide {...props} />;
      case 9:
        return <AskSlide {...props} />;
      case 10:
        return <ContactSlide {...props} />;
      default:
        return <TitleSlide {...props} />;
    }
  };

  return (
    <div
      className="presentation"
      tabIndex="0"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`slide-${currentSlide}`}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.5
          }}
          className="slide-container"
        >
          {renderSlide()}
        </motion.div>
      </AnimatePresence>

      <div className="navigation">
        <button onClick={(e) => { 
          e.stopPropagation();
          prevStep();
        }} title="Previous step">
          ←
        </button>
        <span>{currentSlide + 1} / {totalSlides}</span>
        <button onClick={(e) => { 
          e.stopPropagation();
          nextStep();
        }} title="Next step">
          →
        </button>
      </div>
    </div>
  );
}

export default App;
