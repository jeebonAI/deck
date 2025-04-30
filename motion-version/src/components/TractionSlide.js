import React from 'react';
import { motion } from 'framer-motion';

function TractionSlide() {
  // This is a placeholder since the short-version.md doesn't provide specific traction details
  // We'll create a visually appealing slide with placeholders
  
  const milestones = [
    {
      title: "Product Development",
      status: "In Progress",
      percentage: 65,
      color: "var(--jiboni-primary)"
    },
    {
      title: "User Testing",
      status: "Starting",
      percentage: 25,
      color: "var(--jiboni-secondary)"
    },
    {
      title: "Partnerships",
      status: "Exploring",
      percentage: 40,
      color: "var(--jiboni-accent)"
    },
    {
      title: "Funding",
      status: "Seeking",
      percentage: 15,
      color: "#64B5F6"
    }
  ];

  return (
    <div className="slide traction-slide">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Traction & Milestones
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{ textAlign: 'center', marginBottom: '2rem' }}
      >
        <p>Our journey so far and what we're working towards</p>
      </motion.div>
      
      <div className="flex-container" style={{ flexDirection: 'column', gap: '1.5rem' }}>
        {milestones.map((milestone, index) => (
          <motion.div 
            key={index}
            className="card"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              padding: '1rem 1.5rem'
            }}
          >
            <div style={{ flex: 1 }}>
              <h3 style={{ color: milestone.color, marginBottom: '0.3rem' }}>{milestone.title}</h3>
              <p style={{ fontSize: '1rem', opacity: 0.9 }}>{milestone.status}</p>
            </div>
            
            <div style={{ flex: 2, position: 'relative' }}>
              <div style={{ 
                width: '100%', 
                height: '10px', 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '5px'
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${milestone.percentage}%` }}
                  transition={{ duration: 1, delay: 1 + index * 0.2 }}
                  style={{ 
                    height: '100%', 
                    backgroundColor: milestone.color,
                    borderRadius: '5px'
                  }}
                />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.5 + index * 0.2 }}
                style={{ 
                  position: 'absolute',
                  right: '10px',
                  top: '-25px',
                  fontWeight: 'bold',
                  color: milestone.color
                }}
              >
                {milestone.percentage}%
              </motion.div>
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
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          textAlign: 'center',
          maxWidth: '80%'
        }}
      >
        <h3>Next Steps</h3>
        <p>Complete MVP development, launch beta with initial user group, and secure seed funding</p>
      </motion.div>
    </div>
  );
}

export default TractionSlide;
