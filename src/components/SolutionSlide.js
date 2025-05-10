import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedTitleWithUnderline from './AnimatedTitleWithUnderline';
import SmallLogo from './SmallLogo';

function SolutionSlide({ registerSlideSteps, currentStep, businessNameCapitalized, businessName, totalSlides, showSlideNumber }) {
  // Register the total number of steps for this slide
  useEffect(() => {
    registerSlideSteps(1); // Combined into a single step
  }, [registerSlideSteps]);

  // Handle keyboard events
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Any slide-specific keyboard actions
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Calculate slide number (Solution is slide 3 in the deck)
  const slideNumber = 3;
  const slideNumberText = `${slideNumber}/${totalSlides}`;

  return (
    <div className="slide solution-slide" style={{ position: 'relative' }}>
      {/* Small logo in top right */}
      <SmallLogo businessName={businessName} />
      
      {/* Slide number indicator - only show if showSlideNumber is true */}
      {showSlideNumber && (
        <div className="slide-number">
          {slideNumberText}
        </div>
      )}
      
      <AnimatePresence>
        {currentStep >= 1 && (
          <>
            <AnimatedTitleWithUnderline title="The Solution" />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                fontSize: '2rem', // Increased from 1.1rem to 1.3rem
                lineHeight: '2',
                maxWidth: '1000px',
                margin: '1rem auto 2rem',
                textAlign: 'center',
                color: 'var(--jeebon-light)',
                letterSpacing: '0.02em',
                padding: '0 1.5rem'
              }}
            >
              Jeebon is a Personal AI Agent enabling <strong>AI memory management</strong>, <strong>AI connection management</strong> and <strong>AI family tree management</strong>, reducing the need for screentime by leveraging AI indexing and interfaces, <strong>freeing upto 40% of time lost</strong> to regain real world engagement.
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SolutionSlide;
