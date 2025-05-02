import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedTitleWithUnderline from './AnimatedTitleWithUnderline';

function AskSlide({ registerSlideSteps, currentStep, businessNameCapitalized }) {
  // Register only 1 step for this slide
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
    <div className="slide ask-slide" style={{ justifyContent: 'flex-start', paddingTop: '2rem' }}>
      <AnimatedTitleWithUnderline title="The Ask" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        style={{ 
          marginTop: '0.5rem',
          padding: '1.5rem',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          textAlign: 'center',
          maxWidth: '80%',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        }}
      >
        <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          <span style={{ color: 'rgba(46, 213, 115, 0.9)' }}>$250,000 - $500,000</span>
        </h3>
        <p style={{ fontSize: '1.3rem', margin: '0.5rem 0' }}>Pre-Seed Funding</p>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: '0.5rem 0' }}>
          (12-24 months runway)
        </p>
      </motion.div>
      
      <div style={{ 
        display: 'flex',
        width: '90%',
        maxWidth: '1000px',
        marginTop: '1rem',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div style={{ 
          width: '65%',
          transition: 'width 0.5s ease'
        }}>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '1rem', color: 'var(--jiboni-secondary)' }}
          >
            Use of Funds
          </motion.h3>
          
          {fundUse.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.2 + (index * 0.2) // Shorter delays for quicker appearance
              }}
              style={{ 
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <div style={{ 
                width: '60px',
                fontSize: '1.1rem',
                fontWeight: '500',
                paddingRight: '0.5rem'
              }}>
                {item.percentage}%
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ 
                  height: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '5px',
                  overflow: 'hidden'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ 
                      duration: 1,
                      delay: 0.3 + (index * 0.2) // Shorter delays
                    }}
                    style={{ 
                      height: '100%',
                      backgroundColor: item.color,
                      borderRadius: '5px'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ 
                width: '200px',
                paddingLeft: '0.5rem',
                fontSize: '1rem'
              }}>
                {item.category}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ 
            width: '30%',
            padding: '1.5rem',
            background: 'rgba(46, 213, 115, 0.15)', // Light green background
            borderRadius: '12px',
            textAlign: 'center',
            marginLeft: '1rem',
            alignSelf: 'center',
            boxShadow: '0 4px 15px rgba(46, 213, 115, 0.1)' // Subtle green glow
          }}
        >
          <motion.h4
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ 
              margin: '0.25rem 0 0.75rem', 
              fontSize: '1.2rem',
              color: 'rgba(46, 213, 115, 0.9)' // Green tint to heading
            }}
          >
            Achieve
          </motion.h4>
          <div style={{ 
            margin: '0.5rem 0', 
            padding: 0,
            fontSize: '0.95rem', 
            lineHeight: '1.8',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {[
              "Launch",
              "10k MAU",
              "Validate Model",
              "Initiate AI",
              "Prepare for Scale"
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.3 + (index * 0.15) // Shorter delays
                }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default AskSlide;
