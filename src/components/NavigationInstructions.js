import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function NavigationInstructions({ currentSlide, animationInProgress, onPrev, onNext }) {
  const [visible, setVisible] = useState(false);
  
  // Show instructions when animations complete
  useEffect(() => {
    if (animationInProgress) {
      setVisible(false);
    } else {
      // Show navigation immediately when animation is complete
      setVisible(true);
    }
  }, [animationInProgress]);

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
            left: '50%',
            transform: 'translateX(-50%)', // Center horizontally
            display: 'flex',
            gap: '15px',
            padding: '8px 15px',
            background: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '30px',
            fontSize: '0.9rem',
            color: 'white',
            zIndex: 100,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
          }}
        >
          {/* Previous button */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>&lt;</span>
            <span>Previous</span>
          </motion.button>

          {/* Next button */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              border: 'none',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            <span>Next</span>
            <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>Space / &gt;</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NavigationInstructions;
