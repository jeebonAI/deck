import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedTitleWithUnderline from './AnimatedTitleWithUnderline';

// Import the team member images
import nayeemImage from '../assets/nayeem.png';
import numanImage from '../assets/numan.jpeg';
import eliasImage from '../assets/drelias.jpg';

function TeamSlide({ registerSlideSteps, currentStep }) {
  // Highlight for Nayeem
  const founderHighlight = "$100M+ in Tech Projects Delivered";
  
  const team = [
    {
      name: "Nayeem Syed",
      role: "Founder & CEO",
      points: [
        "30 yrs tech dev (Govt, Fortune 100 & Startups)",
        "Active AI Engineer since 2003",
        "Built scalable enterprise solutions",
        "Led multiple successful tech initiatives",
        "commercial real estate professional (UK & US)"
      ],
      image: nayeemImage,
      isFounder: true
    },
    {
      name: "Numan Syed",
      role: "Co-Founder & COO",
      points: [
        "United Nations Consultant on Peace Keeping Missions",
        "10+ Years Management Experience across a wide range of industries",
        "Product development specialist for well known international brands"
      ],
      image: numanImage
    },
    {
      name: "Dr. S M Elias",
      role: "Advisor",
      points: [
        "Renowned author, historian (Syed Family)",
        "Invaluable network access & context",
        "Met founder 5+ years ago",
        "National recognition in Bangladesh"
      ],
      image: eliasImage
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
    <div className="slide team-slide">
      <AnimatedTitleWithUnderline title="Team" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          display: 'flex',
          width: '90%',
          margin: '2rem auto',
          gap: '2rem',
          alignItems: 'flex-start'
        }}
      >
        {/* Founder section - Left side, larger */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            flex: '1.5',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Highlight banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{
              background: 'var(--jiboni-primary)',
              color: 'white',
              padding: '0.8rem 1.5rem',
              borderRadius: '30px',
              marginBottom: '1.5rem',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              textAlign: 'center',
              border: '2px solid rgba(255,255,255,0.2)'
            }}
          >
            {founderHighlight}
          </motion.div>
          
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'flex-start'
          }}>
            {/* Founder image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid var(--jiboni-primary)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              <img 
                src={nayeemImage} 
                alt="Nayeem Syed"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </motion.div>
            
            {/* Founder details */}
            <div>
              <h3 style={{ 
                fontSize: '1.8rem', 
                marginBottom: '0.3rem',
                color: 'var(--jiboni-primary)'
              }}>
                Nayeem Syed - Founder & CEO
              </h3>
              
              <ul style={{
                listStyleType: 'disc',
                paddingLeft: '1.5rem',
                marginTop: '1rem'
              }}>
                {team[0].points.map((point, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + (idx * 0.1) }}
                    style={{
                      marginBottom: '0.5rem',
                      fontSize: '1.1rem'
                    }}
                  >
                    {point}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
        
        {/* Other team members - Right side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
          {team.slice(1).map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.2) }}
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '1rem',
                borderRadius: '10px'
              }}
            >
              {/* Team member image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid var(--jiboni-secondary)',
                  flexShrink: 0
                }}
              >
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
              </motion.div>
              
              {/* Team member details */}
              <div>
                <h3 style={{ 
                  fontSize: '1.4rem', 
                  marginBottom: '0.2rem',
                  color: 'var(--jiboni-secondary)'
                }}>
                  {member.name}
                </h3>
                <p style={{ 
                  fontSize: '1rem', 
                  opacity: 0.9, 
                  marginBottom: '0.5rem',
                  fontWeight: 'bold'
                }}>
                  {member.role}
                </p>
                
                <ul style={{
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {member.points.map((point, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + (index * 0.2) + (idx * 0.1) }}
                      style={{
                        marginBottom: '0.3rem',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        lineHeight: '1.2'
                      }}
                    >
                      <span style={{ 
                        marginRight: '0.5rem', 
                        color: 'var(--jiboni-accent)',
                        fontSize: '0.8rem'
                      }}>•</span>
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default TeamSlide;
