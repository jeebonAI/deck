import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import StylizedBusinessName from './StylizedBusinessName';

function TitleSlide({ registerSlideSteps, currentStep, businessName }) {
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

  // Words to display with sequential animation and their corresponding icons
  const words = [
    { text: "Communicate", icon: "💬" },
    { text: "Connect", icon: "🔄" },
    { text: "Curate", icon: "📋" },
    { text: "Cherish", icon: "💖" }
  ];
  
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

        {/* Updated tagline with handwriting font and green color */}
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
            margin: '1.5rem 0',
            padding: '0.8rem 2rem',
            fontFamily: "'Caveat', cursive", // Handwriting font
            color: '#4CAF50', // Green color
            alignSelf: 'center'
          }}
        >
          The story of your life
        </motion.div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginTop: '2rem',
          gap: '1.5rem',
          flexWrap: 'wrap'
        }}>
          {words.map((word, index) => (
            <motion.div
              key={word.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 2.8 + (index * 1.0)
              }}
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 2.8 + (index * 1.0) - 0.2,
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
                style={{
                  fontSize: '2.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  width: '4rem',
                  height: '4rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                {word.icon}
              </motion.div>
              <motion.div
                style={{ 
                  color: 'var(--jiboni-light)', 
                  fontSize: '2.2rem',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500
                }}
              >
                {word.text}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default TitleSlide;
