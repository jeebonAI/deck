import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationButton from './NavigationButton';

function NavigationInstructions({ currentSlide, animationInProgress, onPrev, onNext }) {
  const [visible, setVisible] = useState(false);
  const totalSlides = 11; // Match the totalSlides from App.js
  
  // Show instructions when animations complete
  useEffect(() => {
    if (animationInProgress) {
      setVisible(false);
    } else {
      // Show navigation immediately when animation is complete
      setVisible(true);
    }
  }, [animationInProgress]);

  const isFirstSlide = currentSlide === 0;
  const isLastSlide = currentSlide === totalSlides - 1;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '45%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '15px',
            padding: '8px 15px',
            background: 'var(--jiboni-gradient)',
            borderRadius: '30px',
            fontSize: '0.9rem',
            color: 'white',
            zIndex: 100,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
          }}
        >
          {/* Previous button - hidden on first slide */}
          {!isFirstSlide && (
            <NavigationButton 
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              title="Previous"
            >
              <span style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1.2rem' }}>&lt;</span>
            </NavigationButton>
          )}

          {/* Next button - hidden on last slide */}
          {!isLastSlide && (
            <NavigationButton
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              title="Next (Space)"
            >
              <span style={{ fontSize: '0.9rem', marginRight: '8px' }}>Space</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1.2rem' }}>&gt;</span>
            </NavigationButton>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NavigationInstructions;
