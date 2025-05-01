import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

function AskSlide({ registerSlideSteps, businessNameCapitalized }) {
  // Register that this slide has only 1 step
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

  const fundUse = [
    { category: "Core Product & AI Dev", percentage: 35, color: "var(--jiboni-primary)" },
    { category: "Founder Salary & Initial Team", percentage: 35, color: "var(--jiboni-secondary)" },
    { category: "User Acquisition / Marketing", percentage: 20, color: "var(--jiboni-accent)" },
    { category: "Operations / Setup", percentage: 10, color: "#64B5F6" }
  ];

  return (
    <div className="slide ask-slide">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        The Ask
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={{ 
          marginTop: '2rem',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          textAlign: 'center',
          maxWidth: '80%',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        }}
      >
        <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          <span style={{ color: 'var(--jiboni-accent)' }}>$250,000 - $500,000</span>
        </h3>
        <p style={{ fontSize: '1.3rem' }}>Pre-Seed Funding</p>
        <p style={{ marginTop: '1rem', fontSize: '1.1rem', opacity: 0.9 }}>
          (12-18 months runway)
        </p>
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        style={{ marginTop: '2rem', textAlign: 'center' }}
      >
        Use of Funds
      </motion.h3>
      
      <div style={{ 
        marginTop: '1.5rem',
        width: '80%',
        maxWidth: '800px'
      }}>
        {fundUse.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
            style={{ 
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <div style={{ 
              width: '120px',
              fontSize: '1.1rem',
              fontWeight: '500',
              paddingRight: '1rem'
            }}>
              {item.percentage}%
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ 
                height: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 1, delay: 1.5 + index * 0.2 }}
                  style={{ 
                    height: '100%',
                    backgroundColor: item.color,
                    borderRadius: '6px'
                  }}
                />
              </div>
            </div>
            
            <div style={{ 
              width: '250px',
              paddingLeft: '1rem',
              fontSize: '1rem'
            }}>
              {item.category}
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.5 }}
        style={{ 
          marginTop: '2rem', 
          padding: '1rem 2rem',
          background: 'rgba(69, 104, 220, 0.15)',
          borderRadius: '12px',
          textAlign: 'center',
          maxWidth: '80%'
        }}
      >
        <h3>Achieve</h3>
        <p>Launch, 10k MAU, Validate Model, Initiate AI, Prepare for Scale</p>
      </motion.div>
    </div>
  );
}

export default AskSlide;
