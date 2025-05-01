import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function BusinessModelSlide({ registerSlideSteps, currentStep, businessNameCapitalized }) {
  const tiers = [
    {
      title: "Free Core",
      items: [
        "Essential Communication",
        "Circles",
        "AI/Memory features",
        "Trees / Legacy Building"
      ],
      footer: "FREE FOREVER",
      background: "rgba(255, 255, 255, 0.05)",
      delay: 1.0
    },
    {
      title: "Premium Tiers (Year 2+)",
      items: [
        "Enhanced Storage",
        "Advanced AI Features",
        "Advanced Circle/Tree Tools",
        "Premium Support"
      ],
      footer: "Target ARPPU ~$60/yr",
      footerColor: "var(--jiboni-secondary)",
      background: "rgba(69, 104, 220, 0.1)",
      delay: 3.0
    }
  ];

  // Register the total number of steps for this slide
  useEffect(() => {
    registerSlideSteps(3); // 1 for heading, 1 for each tier
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
    <div className="slide business-model-slide">
      <AnimatePresence>
        {currentStep >= 1 && (
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Business Model: Freemium
          </motion.h2>
        )}
      </AnimatePresence>
      
      <div className="flex-container" style={{ marginTop: '2rem', alignItems: 'stretch' }}>
        <AnimatePresence>
          {currentStep >= 2 && (
            <motion.div
              className="card"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              style={{ 
                flex: 1,
                background: tiers[0].background,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <h3>{tiers[0].title}</h3>
              
              <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', flex: 1 }}>
                {tiers[0].items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    style={{ marginBottom: '0.8rem' }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                style={{ 
                  marginTop: 'auto',
                  padding: '0.8rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '0 0 8px 8px',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}
              >
                {tiers[0].footer}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {currentStep >= 3 && (
            <motion.div
              className="card"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              style={{ 
                flex: 1,
                background: tiers[1].background,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <h3>{tiers[1].title}</h3>
              
              <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', flex: 1 }}>
                {tiers[1].items.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    style={{ marginBottom: '0.8rem' }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                style={{ 
                  marginTop: 'auto',
                  padding: '0.8rem',
                  background: 'rgba(69, 104, 220, 0.2)',
                  borderRadius: '0 0 8px 8px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: tiers[1].footerColor
                }}
              >
                {tiers[1].footer}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default BusinessModelSlide;
