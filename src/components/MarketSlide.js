import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedTitleWithUnderline from './AnimatedTitleWithUnderline';

function MarketSlide({ registerSlideSteps, currentStep, totalSlides, showSlideNumber }) {
  // Calculate slide number (Market is slide 4 in the deck)
  const slideNumber = 4;
  const slideNumberText = `${slideNumber}/${totalSlides}`;

  // Market summary statement
  const marketSummary = (
    <>
      Our <strong>total market is over 450 million from disconnected social media users</strong>. <br/>The initial focus is on users already looking to reconnect with their circles and families, 
      <br/>representing a <strong>$4.2 million/year opportunity</strong>.
    </>
  );

  const marketSegments = [
    {
      title: "TAM",
      fullTitle: "Total Addressable Market",
      value: "$450M",
      description: "5% of 5 billion social media users at 3% conversion to premium",
      delay: 0.5
    },
    {
      title: "SAM",
      fullTitle: "Serviceable Addressable Market",
      value: "$4.2M",
      description: "20% of 35M diaspora converting at 3% to premium",
      delay: 0.8
    },
    {
      title: "SOM",
      fullTitle: "Serviceable Obtainable Market",
      value: "$60K",
      description: "Syed family members 100,000 signups converting at 3% to premium",
      delay: 1.1
    }
  ];

  // Register the total number of steps for this slide - now just 1 step
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
    <div className="slide market-slide" style={{ position: 'relative' }}>
      {/* Slide number indicator - only show if showSlideNumber is true */}
      {showSlideNumber && (
        <div className="slide-number">
          {slideNumberText}
        </div>
      )}
      
      <AnimatedTitleWithUnderline title="Market" />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          maxWidth: '900px',
          margin: '0.5rem auto 2rem',
          textAlign: 'center',
          color: 'var(--jiboni-light)',
          letterSpacing: '0.02em',
          padding: '0 1.5rem'
        }}
      >
        {marketSummary}
      </motion.div>

      <div
        className="market-container"
        style={{ 
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '900px',
          margin: '1rem auto',
          padding: '0 2rem'
        }}
      >
        {marketSegments.map((segment, index) => (
          <motion.div
            key={index}
            className="market-segment-row"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: segment.delay
            }}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2rem',
              borderBottom: index < marketSegments.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
              paddingBottom: '1rem'
            }}
          >
            <motion.div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '180px',
                flexShrink: 0
              }}
            >
              <div style={{
                fontSize: '2.2rem',
                fontWeight: 'bold',
                color: 'var(--jiboni-light)'
              }}>
                {segment.title}
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--jiboni-light)',
                opacity: 0.8,
                marginTop: '-5px'
              }}>
                {segment.fullTitle}
              </div>
            </motion.div>
            
            <motion.div
              style={{
                fontSize: '2.2rem',
                fontWeight: 'bold',
                margin: '0 1rem',
                color: 'var(--jiboni-light)',
                opacity: 0.8
              }}
            >
              =
            </motion.div>
            
            <motion.div
              style={{
                fontSize: '2.2rem',
                fontWeight: 'bold',
                color: 'var(--jiboni-secondary)',
                marginRight: '1.5rem',
                flexShrink: 0
              }}
            >
              {segment.value}
            </motion.div>
            
            <motion.div
              style={{
                fontSize: '1.1rem',
                color: 'var(--jiboni-light)',
                opacity: 0.8,
                lineHeight: '1.4'
              }}
            >
              {segment.description}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default MarketSlide;
