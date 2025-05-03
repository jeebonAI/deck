import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedTitleWithUnderline from './AnimatedTitleWithUnderline';

function TractionSlide({ registerSlideSteps, currentStep, totalSlides, showSlideNumber }) {
  // Register just one step for this slide
  useEffect(() => {
    registerSlideSteps(1); // Show everything at once
  }, [registerSlideSteps]);

  // Handle keyboard events
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Calculate slide number (Traction is slide 9 in the deck)
  const slideNumber = 9;
  const slideNumberText = `${slideNumber}/${totalSlides}`;

  const mainPoints = [
    {
      title: "Demo Launched",
      subtitle: "Apr 24th 2025, Available for Android, IOS and Web",
      delay: 0.3
    },
    {
      title: "100+ Users waiting list and growing",
      subtitle: "Since demo Launch Apr 24th 2025",
      delay: 0.6
    }
  ];

  const additionalPoints = [
    {
      title: "Strategic Partnerships - Syed Family Network",
      subtitle: "",
      delay: 0.7
    },    {
      title: "Strategic Partnerships - UK Bangladeshi Expat Community",
      subtitle: "",
      delay: 0.3
    },
    {
      title: "Strategic Partnerships - US Bangladeshi Expat Community",
      subtitle: "",
      delay: 0.5
    }

  ];

  return (
    <div className="slide traction-slide" style={{ position: 'relative', padding: '2rem 3rem' }}>
      {/* Slide number indicator - only show if showSlideNumber is true */}
      {showSlideNumber && (
        <div className="slide-number">
          {slideNumberText}
        </div>
      )}
      
      <AnimatePresence>
        {currentStep >= 1 && (
          <>
            <AnimatedTitleWithUnderline title="Traction" />
            
            {/* Main headline */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ 
                fontSize: '1.8rem',
                marginBottom: '2.5rem',
                textAlign: 'center',
                position: 'relative',
                color: 'white'
              }}
            >
              Demo of Product Launched within the 1st 2 weeks of development!
              
            </motion.h3>
            
            {/* Main metrics with timeline */}
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '3rem'
            }}>
              <div style={{ 
                position: 'relative',
                paddingLeft: '2rem',
                borderLeft: '2px solid rgba(255, 255, 255, 0.3)',
                maxWidth: '500px'
              }}>
                {mainPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: point.delay }}
                    style={{
                      position: 'relative',
                      marginBottom: '2rem'
                    }}
                  >
                    <motion.div
                      style={{
                        position: 'absolute',
                        left: '-2.5rem',
                        top: '0.8rem',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: '#FF9800',
                        border: '2px solid rgba(255, 255, 255, 0.8)'
                      }}
                    />
                    <h4 style={{ 
                      fontSize: '1.5rem', 
                      marginBottom: '0.4rem',
                      color: 'white'
                    }}>
                      {point.title}
                    </h4>
                    <p style={{ 
                      fontSize: '1.1rem', 
                      opacity: 0.7,
                      margin: 0
                    }}>
                      {point.subtitle}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Additional bullet points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
                maxWidth: '800px',
                margin: '0 auto'
              }}
            >
              {additionalPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: point.delay }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem'
                  }}
                >
                  <div style={{
                    minWidth: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#FF9800',
                    marginTop: '8px'
                  }} />
                  <div>
                    <span style={{ 
                      fontWeight: 'bold', 
                      fontSize: '1.2rem',
                      color: 'white'
                    }}>
                      {point.title}
                    </span>
                    {point.subtitle && (
                      <span style={{ 
                        opacity: 0.8,
                        marginLeft: '8px',
                        fontSize: '1.1rem'
                      }}> 
                        - {point.subtitle}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TractionSlide;
