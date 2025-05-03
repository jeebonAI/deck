import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import './pdf-mode.css';
import { BUSINESS_NAME, BUSINESS_NAME_CAPITALIZED, APP_VERSION } from './constants';

// Import slide components
import TitleSlide from './components/TitleSlide';
import ProblemSlide from './components/ProblemSlide';
import SolutionSlide from './components/SolutionSlide';
import MarketSlide from './components/MarketSlide';
import HowItWorksSlide from './components/HowItWorksSlide';
import BusinessModelSlide from './components/BusinessModelSlide';
import CompetitorsSlide from './components/CompetitorsSlide';
import GoToMarketSlide from './components/GoToMarketSlide';
import TractionSlide from './components/TractionSlide';
import TeamSlide from './components/TeamSlide';
import FinancialsSlide from './components/FinancialsSlide';
import AskSlide from './components/AskSlide';
import ContactSlide from './components/ContactSlide';
import NavigationInstructions from './components/NavigationInstructions';
import NavigationButton from './components/NavigationButton';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [maxSteps, setMaxSteps] = useState(1);
  const [animationInProgress, setAnimationInProgress] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false); // Changed from true to false - autoplay off by default
  const autoPlayTimerRef = useRef(null); // Ref to store the timer
  const totalSlides = 13; // Updated from 12 to 13 to include ContactSlide
  
  // Flag to track if we're going back to previous slide
  const goingBackRef = useRef(false);
  // Store max steps for each slide
  const slideMaxStepsRef = useRef({});

  // Define nextStep function first to avoid circular dependency
  const nextStep = useCallback(() => {
    console.log(`nextStep called: currentStep=${currentStep}, maxSteps=${maxSteps}, currentSlide=${currentSlide}, totalSlides=${totalSlides}`);
    
    if (currentStep < maxSteps) {
      // If we have more steps in the current slide, go to next step
      setCurrentStep(currentStep + 1);
      console.log(`Advancing to next step: ${currentStep + 1}`);
    } else if (currentSlide < totalSlides - 1) {
      // If we're at the last step of the current slide, go to the next slide
      console.log(`Advancing to next slide: ${currentSlide + 1}`);
      setCurrentSlide(currentSlide + 1);
      // Step will be reset to 1 in the useEffect
    }
    // If we're at the last step of the last slide, do nothing (stop auto-play)
    else if (autoPlay) {
      console.log('At last slide and step, turning off autoplay');
      setAutoPlay(false); // Turn off auto-play at the end
    }
  }, [currentStep, maxSteps, currentSlide, totalSlides, autoPlay]);

  // Toggle auto-play function
  const toggleAutoPlay = useCallback(() => {
    setAutoPlay(prev => !prev);
  }, []);

  const prevStep = useCallback(() => {
    // If auto-play is on, turn it off when manually navigating
    if (autoPlay) {
      setAutoPlay(false);
    }
    
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
  }, [currentStep, currentSlide, autoPlay]);

  // Add goHome function to return to the first slide
  const goHome = useCallback(() => {
    // If auto-play is on, turn it off when manually navigating
    if (autoPlay) {
      setAutoPlay(false);
    }
    
    setCurrentSlide(0);
    setCurrentStep(1);
  }, [autoPlay]);

  // Set document title on mount
  useEffect(() => {
    document.title = `${BUSINESS_NAME_CAPITALIZED} Pitch Deck ${APP_VERSION}`;
  }, []);

  // Check for debug mode in URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const debug = urlParams.get('debug');
    setDebugMode(debug === '1');
  }, []);

  // Animation timers for different slides - wrapped in useMemo to avoid recreating on every render
  const animationTimers = useMemo(() => ({
    0: 4000, // Title slide (reduced from 7000ms to 4000ms)
    1: 3000, // Problem slide
    2: 3000, // Solution slide
    default: 2000 // Default for other slides
  }), []);

  // Auto-play timing for each slide
  const autoPlayTimers = useMemo(() => ({
    0: 5000,  // Title slide (reduced from 10000)
    1: 6000,  // Problem slide (reduced from 15000)
    2: 6000,  // Solution slide (reduced from 15000)
    default: 4000  // Default for other slides (reduced from 12000)
  }), []);

  // Auto-play functionality
  useEffect(() => {
    // Clear any existing timer
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }

    // If auto-play is enabled and animation is not in progress
    if (autoPlay && !animationInProgress) {
      let delay;
      
      // Use longer delay when on the last step of a slide
      if (currentStep === maxSteps) {
        // Add 2000ms (2 seconds) extra pause for the last step of each slide
        delay = (autoPlayTimers[currentSlide] || autoPlayTimers.default) + 2000;
      } else {
        delay = autoPlayTimers[currentSlide] || autoPlayTimers.default;
      }
      
      autoPlayTimerRef.current = setTimeout(() => {
        // Simply use the existing nextStep function
        nextStep();
      }, delay);
    }

    // Clean up timer on unmount or when dependencies change
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [autoPlay, animationInProgress, currentSlide, currentStep, maxSteps, nextStep, autoPlayTimers]);

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
    console.log(`Animation started for slide ${currentSlide}`);
    
    // Clear animation in progress after slide-specific delay
    const animationDelay = animationTimers[currentSlide] || animationTimers.default;
    
    const timer = setTimeout(() => {
      setAnimationInProgress(false);
      console.log(`Animation completed for slide ${currentSlide} after ${animationDelay}ms`);
    }, animationDelay);
    
    return () => clearTimeout(timer);
  }, [currentSlide, animationTimers]);

  // Set animation in progress when step changes within a slide
  useEffect(() => {
    if (currentStep > 1) {
      setAnimationInProgress(true);
      
      // Use a shorter animation time for step 1 to step 2 transition
      // but only if the slide has more than 1 step total
      const stepAnimationTime = (currentStep === 2 && maxSteps > 1) ? 500 : 1000;
      
      const timer = setTimeout(() => {
        setAnimationInProgress(false);
      }, stepAnimationTime);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, maxSteps]);

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
    // Add 'a' key to toggle auto-play
    if (e.key === 'a') {
      e.preventDefault();
      toggleAutoPlay();
    }
  }, [nextStep, prevStep, goHome, toggleAutoPlay]);

  // Add global keyboard listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Add this effect to listen for the PDF generation event
  useEffect(() => {
    const handleSetSlideForPDF = (event) => {
      const { slide } = event.detail;
      setCurrentSlide(slide);
      setCurrentStep(1); // Reset to first step
    };
    
    document.addEventListener('setSlideForPDF', handleSetSlideForPDF);
    
    return () => {
      document.removeEventListener('setSlideForPDF', handleSetSlideForPDF);
    };
  }, []);

  // Add this useEffect to handle PDF mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isPdfMode = urlParams.get('pdf') === 'true';
    const initialSlide = urlParams.get('slide');
    
    if (isPdfMode) {
      // Add PDF mode class to body
      document.body.classList.add('pdf-mode');
      
      // Hide navigation elements
      const navigationElements = document.querySelectorAll('.navigation-button, .navigation-instructions');
      navigationElements.forEach(el => {
        if (el) el.style.display = 'none';
      });
      
      // Set initial slide if specified in URL
      if (initialSlide !== null) {
        const slideIndex = parseInt(initialSlide, 10);
        if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < totalSlides) {
          setCurrentSlide(slideIndex);
          setCurrentStep(1); // Reset to first step
        }
      }
      
      // Expose a function to set the slide for PDF generation
      window.setSlideForPDF = (slideIndex) => {
        setCurrentSlide(slideIndex);
        setCurrentStep(1);
      };
      
      // Listen for setSlideForPDF events
      const handleSetSlideForPDF = (event) => {
        const { slide } = event.detail;
        setCurrentSlide(slide);
        setCurrentStep(1); // Reset to first step
      };
      
      document.addEventListener('setSlideForPDF', handleSetSlideForPDF);
      
      return () => {
        document.removeEventListener('setSlideForPDF', handleSetSlideForPDF);
        document.body.classList.remove('pdf-mode');
        delete window.setSlideForPDF;
      };
    }
  }, [totalSlides]);

  // Render the appropriate slide based on currentSlide
  const renderSlide = () => {
    // Pass the registerSlideSteps function, currentStep, and totalSlides to each slide component
    const props = { 
      registerSlideSteps,
      currentStep,
      businessName: BUSINESS_NAME,
      businessNameCapitalized: BUSINESS_NAME_CAPITALIZED,
      totalSlides, // Add totalSlides to props
      showSlideNumber: currentSlide > 0 // Only show slide number if not on title slide
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
        return <HowItWorksSlide {...props} />;
      case 5:
        return <BusinessModelSlide {...props} />;
      case 6:
        return <GoToMarketSlide {...props} />;
      case 7:
        return <CompetitorsSlide {...props} />;
      case 8:
        return <TractionSlide {...props} />;
      case 9:
        return <TeamSlide {...props} />;
      case 10:
        return <FinancialsSlide {...props} />;
      case 11:
        return <AskSlide {...props} />;
      case 12:
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
      
      {/* Navigation Instructions */}
      <NavigationInstructions 
        currentSlide={currentSlide}
        animationInProgress={animationInProgress}
        onPrev={prevStep}
        onNext={nextStep}
      />
      
      {/* Home button at bottom left */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '10%',
          zIndex: 100,
          display: 'flex',
          gap: '8px'
        }}
      >
        <div
          style={{
            background: 'var(--jiboni-gradient)',
            borderRadius: '20px',
            padding: '4px 8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
          }}
        >
          <NavigationButton
            onClick={goHome}
            title="Home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
              <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
            </svg>
          </NavigationButton>
        </div>
        
        {/* Auto-play toggle button */}
        <div
          style={{
            background: 'var(--jiboni-gradient)',
            borderRadius: '20px',
            padding: '4px 8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
          }}
        >
          <NavigationButton
            onClick={toggleAutoPlay}
            title={autoPlay ? "Pause auto-play (A)" : "Start auto-play (A)"}
          >
            {autoPlay ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
              </svg>
            )}
          </NavigationButton>
        </div>
      </div>
      
      {/* Debug info - only shown when debug mode is enabled */}
      {debugMode && (
        <div style={{ 
          position: 'fixed', 
          bottom: '20px', 
          right: '20px',
          fontSize: '12px', 
          color: 'rgba(255,255,255,0.5)',
          background: 'var(--jiboni-dark)',
          padding: '4px 8px',
          borderRadius: '4px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
        }}>
          Step: {currentStep}/{maxSteps} (Slide: {currentSlide + 1}) {autoPlay ? "| Auto" : "| Manual"}
        </div>
      )}
    </div>
  );
}

export default App;
