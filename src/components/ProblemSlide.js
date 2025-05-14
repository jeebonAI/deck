import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedTitleWithUnderline from './AnimatedTitleWithUnderline';
import SmallLogo from './SmallLogo';

function ProblemSlide({ registerSlideSteps, currentStep, totalSlides, showSlideNumber, businessName }) {
  // Add the overall problem statement with bold elements
  const problemStatement = (
    <>
      Over <strong>5 billion internet users</strong> worldwide spend an average of <strong>7 hours daily</strong> on digital applications, leading to a <strong>growing disconnect</strong> from meaningful real-world relationships, <strong>fragmented</strong> personal and family histories, and challenges in maintaining <strong>cohesive social connections</strong>. This <strong>excessive screen time</strong> fosters passive content consumption, <strong>dilutes the preservation of life moments</strong> and <strong>complicates managing interactions</strong> across life spheres, contributing to a <strong>sense of isolation</strong> and an estimated <strong>annual productivity loss of $86.3 billion</strong> in the US alone.*
      <br/>
      <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
        * "The Impact of Unmanaged excessive screen time in the United States", American Optometric Association 2024
      </span>
    </>
  );

  // Register just one step for this slide
  useEffect(() => {
    registerSlideSteps(1);
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

  // Calculate slide number (Problem is slide 2 in the deck)
  const slideNumber = 2;
  const slideNumberText = `${slideNumber}/${totalSlides}`;

  return (
    <div className="slide problem-slide" style={{ position: 'relative' }}>
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
            <AnimatedTitleWithUnderline title="The Problem" />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                fontSize: '1.5rem',
                lineHeight: '2',
                maxWidth: '1000px',
                margin: '1rem auto 2rem',
                textAlign: 'center',  // Keep this centered as in the image
                color: 'var(--jeebon-light)',
                letterSpacing: '0.02em',
                padding: '0 1.5rem'
              }}
            >
              {problemStatement}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProblemSlide;
