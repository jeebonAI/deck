import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
import NavigationInstructions from './components/NavigationInstructions';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [maxSteps, setMaxSteps] = useState(1);
  const [animationInProgress, setAnimationInProgress] = useState(true);
  const totalSlides = 11; // Based on short-version.md
  
  // Flag to track if we're going back to previous slide
  const goingBackRef = useRef(false);
  // Store max steps for each slide
  const slideMaxStepsRef = useRef({});

  // Animation timers for different slides - wrapped in useMemo to avoid recreating on every render
  const animationTimers = useMemo(() => ({
    0: 7000, // Title slide (longer animations)
    1: 3000, // Problem slide
    2: 3000, // Solution slide
    default: 2000 // Default for other slides
  }), []);

  // Method for slides to register their max steps and animation duration
  const registerSlideSteps = (steps, animationDuration) => {
    setMaxSteps(steps);
    // Store the max steps for this slide
    slideMaxStepsRef.current[currentSlide] = steps;
    
    // If a custom animation duration is provided, use it
    if (animationDuration) {
      // Update animation timer for this slide
      setAnimationInProgress(true);
      const timer = setTimeout(() => {
        setAnimationInProgress(false);
      }, animationDuration);
      
      return () => clearTimeout(timer);
    }
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
    
    // Set animation in progress when slide changes
    setAnimationInProgress(true);
    
    // Clear animation in progress after slide-specific delay
    const animationDelay = animationTimers[currentSlide] || animationTimers.default;
    
    const timer = setTimeout(() => {
      setAnimationInProgress(false);
    }, animationDelay);
    
    return () => clearTimeout(timer);
  }, [currentSlide, animationTimers]);

  // Set animation in progress when step changes within a slide
  useEffect(() => {
    if (currentStep > 1) {
      setAnimationInProgress(true);
      const timer = setTimeout(() => {
        setAnimationInProgress(false);
      }, 1000); // Default 1 second for step animations
      
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

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

  // Add goHome function to return to the first slide
  const goHome = useCallback(() => {
    setCurrentSlide(0);
    setCurrentStep(1);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      nextStep();
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevStep();
    }
    if (e.key === 'Home') {
      e.preventDefault();
      goHome();
    }
  }, [nextStep, prevStep, goHome]);

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
      
      {/* Home button at bottom left, aligned with slide edge */}
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(69, 104, 220, 0.9)' }}
        whileTap={{ scale: 0.95 }}
        onClick={goHome}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '5%', // Position at 5% from left edge to align with slide
          backgroundColor: 'rgba(69, 104, 220, 0.7)',
          color: 'white',
          border: 'none',
          padding: '8px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          zIndex: 100
        }}
        title="Home"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
          <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
        </svg>
      </motion.button>
      
      {/* Navigation instructions component with clickable buttons */}
      <NavigationInstructions 
        currentSlide={currentSlide} 
        animationInProgress={animationInProgress}
        onPrev={prevStep}
        onNext={nextStep}
      />
      
      {/* Debug info - moved to align with home button */}
      <div style={{ position: 'fixed', bottom: '20px', left: 'calc(5% + 50px)', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
        Step: {currentStep}/{maxSteps} (Slide: {currentSlide + 1})
      </div>
    </div>
  );
}

export default App;
