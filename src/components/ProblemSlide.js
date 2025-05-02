import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ProblemSlide({ registerSlideSteps, currentStep }) {
  // Add the overall problem statement with bold elements
  const problemStatement = (
    <>
      Over <strong>5 billion internet users</strong> worldwide spend an average of <strong>7 hours per day</strong> on digital applications, leading to widespread <strong>digital disconnect</strong> from real-world experiences, <strong>passive consumption</strong> of content, <strong>fragmentation of personal histories</strong>, and <strong>difficulties in managing social connections</strong>. This excessive screen time results in significant <strong>productivity losses</strong>, with the US alone experiencing an annual <strong>cost of $86.3 billion</strong>, highlighting the global economic and social impact of these issues.*
      <br /><br /><br /><br />
      <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
        * The Impact of Unmanaged excessive screen time in the United States, American Optometric Association 2024
      </span>
    </>
  );

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
    <div className="slide problem-slide">
      <AnimatePresence>
        {currentStep >= 1 && (
          <>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              The Problem
            </motion.h2>

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
              {problemStatement}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProblemSlide;
