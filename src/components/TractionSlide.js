import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function TractionSlide({ registerSlideSteps, currentStep }) {
  const milestones = [
    {
      title: "Product Development",
      status: "In Progress",
      percentage: 15,
      color: "var(--jiboni-primary)"
    },
    {
      title: "User Testing",
      status: "Starting",
      percentage: 5,
      color: "var(--jiboni-secondary)"
    },
    {
      title: "Partnerships",
      status: "Exploring",
      percentage: 20,
      color: "var(--jiboni-accent)"
    },
    {
      title: "Funding",
      status: "Seeking",
      percentage: 15,
      color: "#64B5F6"
    }
  ];

  // Register the total number of steps for this slide
  useEffect(() => {
    registerSlideSteps(milestones.length + 2); // +1 for heading, +1 for next steps
  }, [registerSlideSteps, milestones.length]);

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

  return (
    <div className="slide traction-slide">
      <AnimatePresence>
        {currentStep >= 1 && (
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '0.3rem', textAlign: 'center' }}
          >
            Traction & Milestones
          </motion.h2>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {currentStep >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ textAlign: 'center', marginBottom: '2rem' }}
          >
            <p style={{ fontSize: '0.9rem', opacity: 0.8, margin: 0 }}>Our journey so far and what we're working towards</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.5rem',
        width: '90%',
        maxWidth: '900px',
        margin: '0 auto 2.5rem'
      }}>
        {milestones.map((milestone, index) => (
          <AnimatePresence key={index}>
            {currentStep >= index + 2 && (
              <motion.div 
                className="milestone-item"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                style={{ 
                  backgroundColor: 'rgba(30, 41, 59, 0.4)',
                  borderRadius: '8px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <h3 style={{ 
                    color: milestone.color, 
                    margin: 0, 
                    fontSize: '1.2rem',
                    fontWeight: '600'
                  }}>
                    {milestone.title}
                  </h3>
                  
                  <span style={{ 
                    fontWeight: 'bold',
                    color: milestone.color,
                    fontSize: '1rem'
                  }}>
                    {milestone.percentage}%
                  </span>
                </div>
                
                <div style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: '0.4rem'
                }}>
                  {milestone.status}
                </div>
                
                <div style={{ 
                  width: '100%', 
                  height: '6px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '3px'
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${milestone.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ 
                      height: '100%', 
                      backgroundColor: milestone.color,
                      borderRadius: '3px'
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
      
      <AnimatePresence>
        {currentStep >= milestones.length + 2 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ 
              padding: '1.2rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              textAlign: 'center',
              maxWidth: '60%',
              margin: '0 auto'
            }}
          >
            <h3 style={{ marginBottom: '0.8rem', fontSize: '1.1rem', color: '#b388ff' }}>Next Steps</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                "Complete MVP development",
                "Launch beta with initial user group",
                "Secure seed funding"
              ].map((step, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.5 + (index * 1.2) // Much longer delay between items (1.2s)
                  }}
                  style={{ 
                    margin: 0, 
                    fontSize: '0.9rem', 
                    lineHeight: '1.4'
                  }}
                >
                  {step}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TractionSlide;
