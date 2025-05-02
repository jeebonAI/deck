import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import StylizedBusinessName from './StylizedBusinessName';

function TitleSlide({ registerSlideSteps, currentStep, businessName, businessNameCapitalized }) {
  // Register the total number of steps for this slide and custom animation duration
  useEffect(() => {
    // Register 1 step with a custom animation duration of 7000ms
    registerSlideSteps(1, 7000);
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
    <div className="slide title-slide">
      <motion.div
        className="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}
      >
        <div style={{ textAlign: 'center' }}>
          <StylizedBusinessName 
            businessName={businessName} 
            size="large" 
            delay={0.3}
          />
        </div>

        {/* First tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 1.5
          }}
          style={{ 
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: 400,
            margin: '1.5rem 0 1rem',
            padding: '0.8rem 2rem',
            fontFamily: "'Poppins', sans-serif",
            color: 'var(--jiboni-light)',
            alignSelf: 'center'
          }}
        >
          The Personal AI Assistant for productivity
        </motion.div>

        {/* Second tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 2.1
          }}
          style={{ 
            textAlign: 'center',
            fontSize: '1.8rem',
            fontWeight: 300,
            margin: '0 0 2rem',
            padding: '0.5rem 2rem',
            fontFamily: "'Poppins', sans-serif",
            color: 'var(--jiboni-light)',
            opacity: 0.9,
            alignSelf: 'center'
          }}
        >
          Helping individuals unlock <strong>40%</strong> of their time for real-world engagement.
        </motion.div>
      </motion.div>
    </div>
  );
}

export default TitleSlide;
