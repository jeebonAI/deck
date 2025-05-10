import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedTitleWithUnderline from './AnimatedTitleWithUnderline';

function BusinessModelSlide({ registerSlideSteps, currentStep, businessNameCapitalized, totalSlides, showSlideNumber }) {
  // Calculate slide number (Business Model is slide 6 in the deck)
  const slideNumber = 6;
  const slideNumberText = `${slideNumber}/${totalSlides}`;

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
      delay: 0.3
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
      footerColor: "var(--jeebon-secondary)",
      background: "rgba(69, 104, 220, 0.1)",
      delay: 0.6
    }
  ];

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

  return (
    <div className="slide business-model-slide" style={{ position: 'relative' }}>
      {/* Slide number indicator - only show if showSlideNumber is true */}
      {showSlideNumber && (
        <div className="slide-number">
          {slideNumberText}
        </div>
      )}
      
      {currentStep >= 1 && (
        <>
          <AnimatedTitleWithUnderline title="Business Model: Freemium" />
          
          <div className="flex-container" style={{ marginTop: '2rem', alignItems: 'stretch' }}>
            {tiers.map((tier, index) => (
              <motion.div
                key={index}
                className="card"
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: tier.delay }}
                style={{ 
                  flex: 1,
                  background: tier.background,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <h3>{tier.title}</h3>
                
                <ul style={{ paddingLeft: '1.5rem', marginTop: '1rem', flex: 1 }}>
                  {tier.items.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: tier.delay + 0.1 + i * 0.1 }}
                      style={{ marginBottom: '0.8rem' }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: tier.delay + 0.5 }}
                  style={{ 
                    marginTop: 'auto',
                    padding: '0.8rem',
                    background: index === 0 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(69, 104, 220, 0.2)',
                    borderRadius: '0 0 8px 8px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: tier.footerColor
                  }}
                >
                  {tier.footer}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default BusinessModelSlide;
