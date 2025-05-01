import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { BUSINESS_NAME, BUSINESS_NAME_CAPITALIZED } from './constants';

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
  const [currentStep, setCurrentStep] = useState(1);
  const [maxSteps, setMaxSteps] = useState(1);
  const totalSlides = 11; // Based on short-version.md
  
  // Flag to track if we're going back to previous slide
  const goingBackRef = useRef(false);
  // Store max steps for each slide
  const slideMaxStepsRef = useRef({});

  // Method for slides to register their max steps
  const registerSlideSteps = (steps) => {
    setMaxSteps(steps);
    // Store the max steps for this slide
    slideMaxStepsRef.current[currentSlide] = steps;
    console.log(`Slide ${currentSlide} registered ${steps} steps`);
  };

  // Reset step and maxSteps when changing slides
  useEffect(() => {
    // Reset to first step when changing slides (unless going back)
    if (!goingBackRef.current) {
      setCurrentStep(1);
      // If we already know the max steps for this slide, use it
      if (slideMaxStepsRef.current[currentSlide]) {
        setMaxSteps(slideMaxStepsRef.current[currentSlide]);
      } else {
        setMaxSteps(1); // Reset maxSteps until the new slide registers
      }
    }
    goingBackRef.current = false;
  }, [currentSlide]);

  const nextStep = useCallback(() => {
    if (currentStep < maxSteps) {
      // If we have more steps in the current slide, go to next step
      setCurrentStep(currentStep + 1);
    } else if (currentSlide < totalSlides - 1) {
      // If we're at the last step of the current slide, go to the next slide
      setCurrentSlide(currentSlide + 1);
      // Step will be reset to 1 in the useEffect
    }
  }, [currentStep, maxSteps, currentSlide, totalSlides]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      // If we're not at the first step, go to previous step
      setCurrentStep(currentStep - 1);
    } else if (currentSlide > 0) {
      // If we're at the first step of the current slide, go to the previous slide
      goingBackRef.current = true;
      setCurrentSlide(currentSlide - 1);
      
      // Use the stored max steps for the previous slide
      const prevSlideMaxSteps = slideMaxStepsRef.current[currentSlide - 1] || 1;
      setMaxSteps(prevSlideMaxSteps);
      setCurrentStep(prevSlideMaxSteps);
    }
  }, [currentStep, currentSlide]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      nextStep();
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevStep();
    }
  }, [nextStep, prevStep]);

  // Add global keyboard listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Render the appropriate slide based on currentSlide
  const renderSlide = () => {
    // Pass the registerSlideSteps function and currentStep to each slide component
    const props = { 
      registerSlideSteps,
      currentStep,
      businessName: BUSINESS_NAME,
      businessNameCapitalized: BUSINESS_NAME_CAPITALIZED
    };
    
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
          setCurrentSlide(0);
          setCurrentStep(1);
        }} title="Home">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
          </svg>
        </button>
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
      
      {/* Debug info */}
      <div style={{ position: 'fixed', bottom: '10px', left: '10px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
        Step: {currentStep}/{maxSteps} (Slide: {currentSlide + 1})
      </div>
    </div>
  );
}

export default App;
