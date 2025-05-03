import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedTitleWithUnderline from './AnimatedTitleWithUnderline';

// Import the team member images
import nayeemImage from '../assets/nayeem.png';
import numanImage from '../assets/numan.jpeg';
import eliasImage from '../assets/drelias.jpg';
// You'll need to add Mark's image - for now using a placeholder
import markImage from '../assets/placeholder.jpg'; // Replace with actual image when available

function TeamSlide({ registerSlideSteps, currentStep, totalSlides, showSlideNumber }) {
  // Calculate slide number (Team is slide 10 in the deck)
  const slideNumber = 10;
  const slideNumberText = `${slideNumber}/${totalSlides}`;

  // Add the founder highlight text
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
      name: "Mark Armstrong",
      role: "VP of Finance",
      points: [
        "20+ years M&A Consultant",
        "Expertise in startup funding and growth strategies",
        "Private Investor",
        "Strong background in investor relations"
      ],
      image: markImage
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
    <div className="slide team-slide" style={{ position: 'relative' }}>
      {/* Slide number indicator - only show if showSlideNumber is true */}
      {showSlideNumber && (
        <div className="slide-number">
          {slideNumberText}
        </div>
      )}
      
      <AnimatedTitleWithUnderline title="Team" />
      
      {/* Top row: Nayeem (left) and Numan (right) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          display: 'flex',
          width: '90%',
          margin: '1.5rem auto 0.5rem auto', // Reduced bottom margin from 1rem to 0.5rem
          gap: '1.5rem',
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
              padding: '0.7rem 1.5rem',
              borderRadius: '30px',
              marginBottom: '1.2rem',
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
            gap: '1.2rem',
            alignItems: 'flex-start'
          }}>
            {/* Founder image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                width: '110px',
                height: '110px',
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
                fontSize: '1.7rem',
                marginBottom: '0.3rem',
                color: 'var(--jiboni-primary)'
              }}>
                Nayeem Syed - Founder & CEO
              </h3>
              
              <ul style={{
                listStyleType: 'disc',
                paddingLeft: '1.5rem',
                marginTop: '0.8rem'
              }}>
                {team[0].points.map((point, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + (idx * 0.1) }}
                    style={{
                      marginBottom: '0.4rem',
                      fontSize: '1rem'
                    }}
                  >
                    {point}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
        
        {/* Numan - Right side top */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            paddingTop: '7rem' // Added padding to push Numan's box down
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              display: 'flex',
              gap: '0.8rem',
              alignItems: 'flex-start',
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '0.8rem',
              borderRadius: '10px'
            }}
          >
            {/* Numan image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--jiboni-secondary)',
                flexShrink: 0
              }}
            >
              <img 
                src={numanImage} 
                alt={team[1].name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </motion.div>
            
            {/* Numan details */}
            <div>
              <h3 style={{ 
                fontSize: '1.3rem',
                marginBottom: '0.2rem',
                color: 'var(--jiboni-secondary)'
              }}>
                {team[1].name}
              </h3>
              <p style={{ 
                fontSize: '0.9rem',
                opacity: 0.9, 
                marginBottom: '0.4rem',
                fontWeight: 'bold'
              }}>
                {team[1].role}
              </p>
              
              <ul style={{
                listStyleType: 'none',
                padding: 0,
                margin: 0
              }}>
                {team[1].points.map((point, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + (idx * 0.1) }}
                    style={{
                      marginBottom: '0.2rem',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      lineHeight: '1.1'
                    }}
                  >
                    <span style={{ 
                      marginRight: '0.4rem',
                      color: 'var(--jiboni-accent)',
                      fontSize: '0.7rem'
                    }}>•</span>
                    {point}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Bottom row: Armstrong (left) and Dr. Elias (right) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          display: 'flex',
          width: '90%',
          margin: '0.5rem auto',
          gap: '1.5rem',
          alignItems: 'flex-start'
        }}
      >
        {/* Armstrong - Left side bottom */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              display: 'flex',
              gap: '0.8rem',
              alignItems: 'flex-start',
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '0.8rem',
              borderRadius: '10px'
            }}
          >
            {/* Armstrong image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--jiboni-secondary)',
                flexShrink: 0
              }}
            >
              <img 
                src={markImage} 
                alt={team[2].name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </motion.div>
            
            {/* Armstrong details */}
            <div>
              <h3 style={{ 
                fontSize: '1.3rem',
                marginBottom: '0.2rem',
                color: 'var(--jiboni-secondary)'
              }}>
                {team[2].name}
              </h3>
              <p style={{ 
                fontSize: '0.9rem',
                opacity: 0.9, 
                marginBottom: '0.4rem',
                fontWeight: 'bold'
              }}>
                {team[2].role}
              </p>
              
              <ul style={{
                listStyleType: 'none',
                padding: 0,
                margin: 0
              }}>
                {team[2].points.map((point, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + (idx * 0.1) }}
                    style={{
                      marginBottom: '0.2rem',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      lineHeight: '1.1'
                    }}
                  >
                    <span style={{ 
                      marginRight: '0.4rem',
                      color: 'var(--jiboni-accent)',
                      fontSize: '0.7rem'
                    }}>•</span>
                    {point}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Dr. Elias - Right side bottom */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{
              display: 'flex',
              gap: '0.8rem',
              alignItems: 'flex-start',
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '0.8rem',
              borderRadius: '10px'
            }}
          >
            {/* Dr. Elias image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--jiboni-secondary)',
                flexShrink: 0
              }}
            >
              <img 
                src={eliasImage} 
                alt={team[3].name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </motion.div>
            
            {/* Dr. Elias details */}
            <div>
              <h3 style={{ 
                fontSize: '1.3rem',
                marginBottom: '0.2rem',
                color: 'var(--jiboni-secondary)'
              }}>
                {team[3].name}
              </h3>
              <p style={{ 
                fontSize: '0.9rem',
                opacity: 0.9, 
                marginBottom: '0.4rem',
                fontWeight: 'bold'
              }}>
                {team[3].role}
              </p>
              
              <ul style={{
                listStyleType: 'none',
                padding: 0,
                margin: 0
              }}>
                {team[3].points.map((point, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 + (idx * 0.1) }}
                    style={{
                      marginBottom: '0.2rem',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      lineHeight: '1.1'
                    }}
                  >
                    <span style={{ 
                      marginRight: '0.4rem',
                      color: 'var(--jiboni-accent)',
                      fontSize: '0.7rem'
                    }}>•</span>
                    {point}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default TeamSlide;
