import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedTitleWithUnderline from './AnimatedTitleWithUnderline';
import SmallLogo from './SmallLogo';

function CompetitorsSlide({ registerSlideSteps, currentStep, totalSlides, showSlideNumber, businessName }) {
  // Calculate slide number (Competitors is slide 8 in the deck)
  const slideNumber = 8;
  const slideNumberText = `${slideNumber}/${totalSlides}`;

  const competitors = [
    {
      name: "WhatsApp",
      description: "Communication-focused, lacks organization & legacy features",
      features: {
        communication: true,
        circles: true, // Updated: WhatsApp has groups
        memories: false,
        legacy: false,
        ai: false
      },
      color: "#25D366",
      shortDescription: "Fragment general tool, not an integrated solution"
    },
    {
      name: "Ancestry",
      description: "Family tree focus, limited communication & memory tools",
      features: {
        communication: false,
        circles: false,
        memories: false,
        legacy: true,
        ai: false
      },
      color: "#6DBDFA",
      shortDescription: "Focused on family trees, limited in other areas"
    },
    {
      name: "Notion",
      description: "Knowledge management, weak on communication & connections",
      features: {
        communication: false,
        circles: false,
        memories: true,
        legacy: false,
        ai: true
      },
      color: "#FFFFFF",
      shortDescription: "Knowledge-fixated. Ignores broader connection needs"
    },
    {
      name: businessName || "Jeebon",
      description: "Complete integrated platform for meaningful connections",
      features: {
        communication: true,
        circles: true,
        memories: true,
        legacy: true,
        ai: true
      },
      color: "#2ED573", // Green color
      isHighlighted: true
    }
  ];

  const featureLabels = {
    communication: "Communication",
    circles: "Circles/Groups",
    memories: "Memory/Notes",
    legacy: "Family Tree/Legacy",
    ai: "AI Integration"
  };

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
    <div className="slide competitors-slide" style={{ position: 'relative' }}>
      {/* Small logo in top right */}
      <SmallLogo businessName={businessName} />
      
      {/* Slide number indicator - only show if showSlideNumber is true */}
      {showSlideNumber && (
        <div className="slide-number">
          {slideNumberText}
        </div>
      )}
      
      <AnimatePresence>
        {currentStep >= 1 && (
          <>
            <AnimatedTitleWithUnderline title="Competitive Landscape" />
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                marginTop: '1rem',
                marginBottom: '1.5rem',
                padding: '1rem 2rem',
                background: 'var(--jeebon-primary)',
                borderRadius: '30px',
                fontSize: '1.2rem',
                maxWidth: '90%',
                textAlign: 'left',
                lineHeight: '1.4'
              }}
            >
              <span style={{ fontWeight: 'normal', opacity: 0.9 }}>
                Jeebon is addressing the <strong style={{ fontSize: '1.3rem' }}>73% of people</strong> who find <strong>digital life too fragmented</strong><br/> with an integrated AI solution, not another app.
              </span>
            </motion.div>
            
            {/* Competitor short descriptions - similar to screenshot */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginBottom: '1.5rem',
                maxWidth: '90%',
                alignSelf: 'flex-start',
                marginLeft: '5%'
              }}
            >
              {competitors.slice(0, 3).map((competitor, index) => (
                <motion.div
                  key={competitor.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: competitor.color,
                    minWidth: '100px'
                  }}>
                    {competitor.name}:
                  </span>
                  <span style={{ 
                    fontSize: '0.9rem', 
                    opacity: 0.9 
                  }}>
                    {competitor.shortDescription}
                  </span>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr repeat(5, 1fr)',
                gap: '1px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                overflow: 'hidden',
                maxWidth: '90%',
                margin: '0 auto',
                height: '200px' // Reduced height since we're removing Jeeboni row
              }}
            >
              {/* Header row */}
              <div style={{ 
                padding: '0.7rem', 
                background: 'rgba(0, 0, 0, 0.3)',
                fontWeight: 'bold'
              }}>
                Platform
              </div>
              
              {Object.keys(featureLabels).map((feature, index) => (
                <div 
                  key={feature}
                  style={{ 
                    padding: '0.7rem', 
                    background: 'rgba(0, 0, 0, 0.3)',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '0.9rem'
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 1.0 + (index * 0.1) }}
                  >
                    {featureLabels[feature]}
                  </motion.div>
                </div>
              ))}
              
              {/* Only show the first 3 competitors (exclude Jeeboni) */}
              {competitors.slice(0, 3).map((competitor, compIndex) => (
                <React.Fragment key={competitor.name}>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + (compIndex * 0.1) }}
                    style={{ 
                      padding: '0.7rem',
                      background: 'rgba(0, 0, 0, 0.2)',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{ 
                      fontWeight: 'bold',
                      color: competitor.color
                    }}>
                      {competitor.name}
                    </div>
                  </motion.div>
                  
                  {Object.keys(featureLabels).map((feature, featureIndex) => (
                    <motion.div
                      key={`${competitor.name}-${feature}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: 1.4 + (compIndex * 0.1) + (featureIndex * 0.1)
                      }}
                      style={{ 
                        padding: '0.7rem',
                        background: 'rgba(0, 0, 0, 0.2)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      {competitor.features[feature] ? (
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: '#2ED573', // All checkmarks are green now
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          color: '#000',
                          fontWeight: 'bold',
                          fontSize: '0.8rem'
                        }}>
                          ✓
                        </div>
                      ) : (
                        <div style={{
                          width: '20px',
                          height: '2px',
                          background: 'rgba(255, 255, 255, 0.2)'
                        }} />
                      )}
                    </motion.div>
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
            
            {/* Add Jeeboni summary at the bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              style={{
                marginTop: '1.5rem',
                padding: '0.8rem 1.5rem',
                background: 'rgba(46, 213, 115, 0.15)',
                borderRadius: '10px',
                fontSize: '1.1rem',
                maxWidth: '90%',
                textAlign: 'center',
                border: '2px solid #2ED573'
              }}
            >
              <span style={{ fontWeight: 'bold', color: '#2ED573' }}>Jeebon</span> is the only platform that offers <span style={{ fontWeight: 'bold' }}>all five key features</span> in one integrated platform.
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CompetitorsSlide;
