import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedTitleWithUnderline from './AnimatedTitleWithUnderline';

function GoToMarketSlide({ registerSlideSteps, currentStep, totalSlides, showSlideNumber }) {
  // Register just one step for this slide
  useEffect(() => {
    registerSlideSteps(1);
  }, [registerSlideSteps]);

  // Calculate slide number
  const slideNumber = 9; // Assuming this is slide 9
  const slideNumberText = `${slideNumber}/${totalSlides}`;

  const phases = [
    {
      year: "Year 1",
      title: "Develop & Validate",
      color: "#4568dc",
      circleColor: "#4568dc",
      points: [
        "Build core product, achieve maturity",
        "Seed initial networks for feedback & validation",
        "Goal: 10k MAU",
        "Manage initial growth for stability"
      ],
      delay: 0.3
    },
    {
      year: "Year 2",
      title: "Monetize & Expand",
      color: "#b06ab3",
      circleColor: "#b06ab3",
      points: [
        "Launch/refine premium tiers",
        "Expand outreach to diaspora hubs & communities",
        "Focus on validating monetization model"
      ],
      delay: 0.5
    },
    {
      year: "Year 3+",
      title: "Scale Globally",
      color: "#FF7E5F",
      circleColor: "#FF7E5F",
      points: [
        "Unleash network effects",
        "Scale marketing & partnerships",
        "Drive hyper-growth"
      ],
      delay: 0.7
    }
  ];

  return (
    <div className="slide go-to-market-slide" style={{ position: 'relative' }}>
      {/* Slide number indicator */}
      {showSlideNumber && (
        <div className="slide-number">
          {slideNumberText}
        </div>
      )}
      
      <AnimatedTitleWithUnderline title="Go-To-Market" />
      
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ 
          fontSize: '2rem', 
          marginTop: '0.5rem', 
          marginBottom: '1rem' // Reduced from 2rem to 1rem
        }}
      >
        Go-to-Market Strategy - Phased
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ 
          background: 'rgba(46, 213, 115, 0.2)', 
          padding: '0.8rem 1rem', // Reduced padding
          borderRadius: '8px',
          maxWidth: '90%',
          marginBottom: '1rem', // Reduced from 2rem to 1rem
          textAlign: 'center'
        }}
      >
        Secured first Partnership with the historian of the Syed Family to offer it to the whole Syed Family Network who are regular buyers of the family history book of the past 6 editions.
      </motion.div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        width: '100%',
        gap: '1rem',
        height: 'auto', // Changed from fixed height to auto
        maxHeight: '45%' // Added max height to prevent overflow
      }}>
        {phases.map((phase, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: phase.delay }}
            style={{ 
              flex: 1,
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '1rem', // Reduced padding
              border: `1px solid ${phase.color}`,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ 
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              background: phase.circleColor,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {index + 1}
            </div>
            
            <h3 style={{ color: phase.color }}>{phase.year}</h3>
            <h4 style={{ marginBottom: '0.5rem' }}>{phase.title}</h4> {/* Reduced margin */}
            
            <ul style={{ 
              paddingLeft: '1.2rem', // Reduced padding
              marginBottom: '0.5rem', // Added bottom margin
              fontSize: '0.9rem' // Reduced font size
            }}>
              {phase.points.map((point, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.2 + i * 0.1 }}
                  style={{ marginBottom: '0.5rem' }} // Reduced from 0.8rem to 0.5rem
                >
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
        style={{ 
          marginTop: '1rem', // Reduced from 2rem to 1rem
          width: '80%',
          height: '4px',
          background: 'var(--jiboni-gradient)',
          borderRadius: '2px',
          transformOrigin: 'left'
        }}
      />
    </div>
  );
}

export default GoToMarketSlide;
