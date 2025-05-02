import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedTitleWithUnderline from './AnimatedTitleWithUnderline';

function SolutionSlide({ registerSlideSteps, currentStep, businessNameCapitalized, businessName }) {
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

  return (
    <div className="slide solution-slide">
      <AnimatePresence>
        {currentStep >= 1 && (
          <>
            <AnimatedTitleWithUnderline title="The Solution" />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                fontSize: '1.1rem',
                lineHeight: '2',
                maxWidth: '1000px',
                margin: '1rem auto 2rem',
                textAlign: 'center',
                color: 'var(--jiboni-light)',
                letterSpacing: '0.02em',
                padding: '0 1.5rem'
              }}
            >
              Jeeboni is a Personal AI Assistant enabling <strong>AI memory management</strong>, <strong>AI connection management</strong> and <strong>AI family history management</strong>, reducing the need for screentime by leveraging AI indexing and interfaces, <strong>freeing upto 40% of time lost</strong> to regain real world engagement.
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SolutionSlide;
