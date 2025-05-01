import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import the team member images
// Note: You'll need to save these images to your project's assets folder
// and update the import paths accordingly
import nayeemImage from '../assets/nayeem.png';
import numanImage from '../assets/numan.jpeg';
import eliasImage from '../assets/drelias.jpg';

function TeamSlide({ registerSlideSteps, currentStep }) {
  const team = [
    {
      name: "Nayeem Syed",
      role: "Founder & CEO",
      initial: "NS",
      color: "var(--jiboni-primary)",
      description: "30 yrs tech dev (Fortune 500, startups), AI focus, real estate acumen",
      image: nayeemImage
    },
    {
      name: "Numan Syed",
      role: "Co-Founder",
      initial: "NS",
      color: "var(--jiboni-secondary)",
      description: "Strong technical, operational, management background",
      image: numanImage
    },
    {
      name: "Dr. S M Elias",
      role: "Advisor",
      initial: "SE",
      color: "#64B5F6",
      description: "Renowned author, historian (Syed Family), invaluable access & context",
      image: eliasImage
    },
    {
      name: "You?",
      role: "Join Our Team",
      initial: "?",
      color: "var(--jiboni-accent)",
      description: "Help us build the future of meaningful connection",
      highlight: true,
      isPlaceholder: true
    }
  ];

  // Register the total number of steps for this slide
  useEffect(() => {
    registerSlideSteps(team.length + 2); // +1 for heading, +1 for strengths
  }, [registerSlideSteps, team.length]);

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
    <div className="slide team-slide">
      <AnimatePresence>
        {currentStep >= 1 && (
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Team
          </motion.h2>
        )}
      </AnimatePresence>
      
      <div 
        className="flex-container"
        style={{ 
          marginTop: '2rem', 
          display: 'flex',
          flexWrap: 'wrap', 
          justifyContent: 'center',
          gap: '2rem'
        }}
      >
        {team.map((member, index) => (
          <AnimatePresence key={index}>
            {currentStep >= index + 2 && (
              <motion.div 
                className="card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)" 
                }}
                style={{ 
                  width: '200px',
                  textAlign: 'center',
                  padding: '2rem 1.5rem',
                  border: member.highlight ? `2px dashed ${member.color}` : 'none',
                  background: member.highlight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)'
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: `3px solid ${member.color}`,
                    margin: '0 auto 1rem',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: member.isPlaceholder ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                  }}
                >
                  {member.isPlaceholder ? (
                    <div style={{
                      fontSize: '4rem',
                      fontWeight: 'bold',
                      color: member.color,
                      textAlign: 'center',
                      lineHeight: '1'
                    }}>?</div>
                  ) : (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />
                  )}
                </motion.div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{member.name}</h3>
                <p style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '0.7rem' }}>{member.role}</p>
                <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: '1.4' }}>{member.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
      
      <AnimatePresence>
        {currentStep >= team.length + 2 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ 
              marginTop: '2rem', 
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
              maxWidth: '80%',
              margin: '2rem auto 0'
            }}
          >
            {['Technical Mastery', 'Unique Market Access', 'Passionate Vision'].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20, 
                  delay: 0.1 * index 
                }}
                className="badge"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              >
                {value}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TeamSlide;
