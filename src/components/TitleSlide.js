import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faCircleNodes, faTree, faCamera } from '@fortawesome/free-solid-svg-icons';
import StylizedBusinessName from './StylizedBusinessName';

function TitleSlide({ registerSlideSteps, currentStep, businessName, businessNameCapitalized, totalSlides }) {
  // Register the total number of steps for this slide and reduce animation duration
  useEffect(() => {
    // Register 1 step with a shorter animation duration of 4000ms (down from 7000ms)
    registerSlideSteps(1, 4000);
  }, [registerSlideSteps]);

  const firstTaglineWords = [
    { word: 'Communicate', icon: faComments },
    { word: 'Connect', icon: faCircleNodes },
    { word: 'Cherish', icon: faTree },
    { word: 'Capture', icon: faCamera },
  ];
  const firstTaglineInitialDelay = 1.5; // Base delay for the first word
  const firstTaglineDelayIncrement = 1.3; // Additional delay for each subsequent word/icon
  const firstTaglineWordDuration = 1.8; // Animation duration for each word/icon

  return (
    <div className="slide title-slide">
      {/* No slide number on title slide */}
      
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
        <div
          style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            fontWeight: 400,
            margin: '1.5rem 0 1rem',
            padding: '0.8rem 2rem',
            fontFamily: "'Poppins', sans-serif",
            color: 'var(--jeebon-light)',
            alignSelf: 'center',
          }}
        >
          {firstTaglineWords.map(({ word, icon }, index) => {
            console.log(`Rendering word: ${word}, icon: ${icon.iconName}`);
            return (
              <React.Fragment key={index}>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: firstTaglineWordDuration,
                    delay: firstTaglineInitialDelay + index * firstTaglineDelayIncrement,
                  }}
                  style={{
                    margin: '0 0.3rem',
                    display: 'inline-block',
                  }}
                >
                  {word}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: firstTaglineWordDuration,
                    delay: firstTaglineInitialDelay + (index + 0.5) * firstTaglineDelayIncrement,
                  }}
                  style={{
                    color: index % 2 === 0 ? 'var(--jeebon-primary)' : 'var(--jeebon-secondary)', // Alternate between blue and purple
                    margin: '0 0.3rem',
                    display: 'inline-block',
                    fontSize: '2rem', // Slightly smaller than text
                  }}
                >
                  <FontAwesomeIcon icon={icon} />
                </motion.span>
              </React.Fragment>
            );
          })}
        </div>

        {/* Second tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 6.7 // Matches your updated timing
          }}
          style={{ 
            textAlign: 'center',
            fontSize: '1.8rem',
            fontWeight: 300,
            margin: '0 0 2rem',
            padding: '0.5rem 2rem',
            fontFamily: "'Poppins', sans-serif",
            color: 'var(--jeebon-light)',
            opacity: 0.9,
            alignSelf: 'center'
          }}
        >
          Achieve at least a 40% improvement<br/> in enriching and preserving<br/> your connections, memories and legacy.
        </motion.div>
      </motion.div>
    </div>
  );
}

export default TitleSlide;