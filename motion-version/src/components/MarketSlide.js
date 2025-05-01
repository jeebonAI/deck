import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function MarketSlide({ registerSlideSteps, currentStep }) {
  const marketSegments = [
    {
      title: "TAM",
      fullTitle: "Total Addressable Market",
      description: "Billions globally facing digital fatigue",
      note: "Growing PKM, journaling, digital legacy markets",
      size: "large",
      delay: 1.0,
      color: "rgba(111, 116, 217, 0.8)"
    },
    {
      title: "SAM",
      fullTitle: "Serviceable Addressable Market",
      description: "Digitally connected individuals needing integration",
      note: "Large diasporas",
      additionalNote: "(Desi >35M)",
      size: "medium",
      delay: 2.5,
      color: "rgba(111, 116, 217, 0.8)"
    },
    {
      title: "SOM",
      fullTitle: "Serviceable Obtainable Market",
      description: "Syed family network",
      note: "The largest family in the world",
      additionalNote: "10,000+ MAU",
      size: "small",
      delay: 4.0,
      color: "rgba(111, 116, 217, 0.8)"
    }
  ];

  // Register the total number of steps for this slide
  useEffect(() => {
    registerSlideSteps(marketSegments.length + 1); // +1 for the heading
  }, [registerSlideSteps, marketSegments.length]);

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

  // Define circle sizes
  const circleSizes = {
    small: { width: "180px", height: "180px" },
    medium: { width: "240px", height: "240px" },
    large: { width: "300px", height: "300px" }
  };

  return (
    <div className="slide market-slide">
      <AnimatePresence>
        {currentStep >= 1 && (
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Market Opportunity
          </motion.h2>
        )}
      </AnimatePresence>

      <div
        className="market-container"
        style={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          alignItems: 'center',
          marginTop: '2rem',
          width: '100%',
          maxWidth: '1000px',
          margin: '2rem auto'
        }}
      >
        {marketSegments.map((segment, index) => (
          <AnimatePresence key={index}>
            {currentStep >= index + 2 && (
              <motion.div
                className="market-segment"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.2
                }}
                style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{ 
                    textAlign: 'center'
                  }}
                >
                  <h3 style={{ 
                    color: 'rgba(186, 104, 200, 1)',
                    fontSize: '2.5rem',
                    margin: 0,
                    marginBottom: '0.2rem'
                  }}>
                    {segment.title}
                  </h3>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.9rem',
                    margin: 0,
                    marginBottom: '0.5rem'
                  }}>
                    {segment.fullTitle}
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.5
                  }}
                  style={{
                    ...circleSizes[segment.size],
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(111, 116, 217, 0.8), rgba(186, 104, 200, 0.8))',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '1rem',
                    textAlign: 'center',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                  }}
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    style={{ 
                      fontSize: segment.size === 'small' ? '0.85rem' : segment.size === 'medium' ? '1.1rem' : '1.2rem',
                      margin: segment.size === 'small' ? '0.2rem' : '0.3rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {segment.description}
                  </motion.p>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    style={{ 
                      fontSize: segment.size === 'small' ? '0.8rem' : segment.size === 'medium' ? '1rem' : '1.1rem',
                      margin: segment.size === 'small' ? '0.2rem' : '0.3rem'
                    }}
                  >
                    {segment.note}
                  </motion.p>
                  
                  {segment.additionalNote && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.3 }}
                      style={{ 
                        fontSize: segment.size === 'small' ? '0.8rem' : segment.size === 'medium' ? '1rem' : '1.1rem',
                        margin: segment.size === 'small' ? '0.2rem' : '0.3rem'
                      }}
                    >
                      {segment.additionalNote}
                    </motion.p>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
}

export default MarketSlide;
