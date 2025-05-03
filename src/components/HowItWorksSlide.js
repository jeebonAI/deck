import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedTitleWithUnderline from './AnimatedTitleWithUnderline';

function HowItWorksSlide({ registerSlideSteps, currentStep, totalSlides, showSlideNumber }) {
  // Register just one step for this slide
  useEffect(() => {
    registerSlideSteps(1);
  }, [registerSlideSteps]);

  // Calculate slide number (How It Works is slide 5 in the deck)
  const slideNumber = 5;
  const slideNumberText = `${slideNumber}/${totalSlides}`;

  const workflowSteps = [
    {
      number: 1,
      title: "Manage communications",
      description: "secure messaging, calls, video",
      delay: 0.3,
      icon: "💬"
    },
    {
      number: 2,
      title: "Manage Circles",
      description: "friends, families, work etc",
      delay: 0.6,
      icon: "⚪⚪"
    },
    {
      number: 3,
      title: "Manage memories",
      description: "notes, photos, videos",
      delay: 0.9,
      icon: "📝 📸 🎥"
    },
    {
      number: 4,
      title: "Manage family tree connections",
      description: "connected tree with the rest of the family",
      delay: 1.2,
      icon: "🌳"
    },
    {
      number: 5,
      title: "Unified AI interface",
      description: "to navigate through them all",
      delay: 1.5,
      icon: "🤖"
    }
  ];

  return (
    <div className="slide how-it-works-slide" style={{ 
      position: 'relative',
      paddingTop: '1rem' // Reduced top padding to move everything up
    }}>
      {/* Slide number indicator - only show if showSlideNumber is true */}
      {showSlideNumber && (
        <div className="slide-number">
          {slideNumberText}
        </div>
      )}
      
      <AnimatedTitleWithUnderline title="How It Works" />
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        width: '100%',
        height: 'calc(100% - 80px)', // Reduced height to move everything up
        marginTop: '0.5rem', // Reduced top margin
        padding: '0 1rem'
      }}>
        {/* Left side - workflow steps */}
        <div style={{ 
          width: '55%', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'flex-start' // Changed to flex-start to move content up
        }}>
          {/* Intro text */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ 
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '0.8rem 1.2rem', // Reduced padding
              borderRadius: '12px',
              marginBottom: '0.8rem', // Reduced bottom margin
              fontSize: '1rem', // Slightly reduced font size
              lineHeight: '1.4' // Reduced line height
            }}
          >
            We are developing <strong>a proprietary productivity AI Agent for users</strong> to prompt the most needed information of their connections, memories and legacies through an intuitive interface.
          </motion.div>
          
          {/* Workflow steps */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '1.2rem', // Increased gap between steps for better spacing
            flex: 1,
            marginBottom: '0' // Remove bottom margin
          }}>
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: step.delay }}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '0.8rem' // Reduced gap
                }}
              >
                <div style={{ 
                  width: '36px', // Reduced size
                  height: '36px', // Reduced size
                  borderRadius: '50%', 
                  backgroundColor: 'var(--jiboni-primary)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.1rem', // Reduced font size
                  flexShrink: 0
                }}>
                  {step.number}
                </div>
                <div>
                  <div style={{ 
                    fontWeight: 'bold', 
                    fontSize: '1rem', // Reduced font size
                    marginBottom: '0.1rem' // Reduced margin
                  }}>
                    {step.title} <span style={{ marginLeft: '0.5rem' }}>{step.icon}</span>
                  </div>
                  <div style={{ 
                    fontSize: '0.85rem', // Reduced font size
                    opacity: 0.8
                  }}>
                    {step.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Bottom text - moved further up */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            style={{ 
              marginTop: '-2.5rem', // Increased negative margin to move it further UP (from -1rem to -2.5rem)
              marginBottom: '3em', // Remove bottom margin
              fontSize: '1.2rem', // Maintain font size
              fontWeight: '500',
              color: '#2ED573', // Green color
              textAlign: 'center',
              padding: '0 1rem',
              whiteSpace: 'nowrap', // Prevent text from wrapping
              width: '100%' // Ensure it takes full width
            }}
          >
            User saves time on an optimized productivity stack.
          </motion.div>
        </div>
        
        {/* Right side - phone mockup - moved UP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ 
            width: '40%', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginTop: '-2rem' // Negative margin to move it UP
          }}
        >
          {/* Phone mockup - made thinner */}
          <div style={{ 
            width: '260px', // Width remains unchanged
            height: '540px', // Height remains unchanged
            background: 'white',
            borderRadius: '36px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
            border: '8px solid #333', // Reduced border thickness
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* App header */}
            <div style={{ 
              padding: '10px 12px',
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #eee',
              backgroundColor: 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Logo - concentric circles */}
                <div style={{ 
                  width: '24px',
                  height: '24px',
                  marginRight: '8px',
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {/* Outer circle */}
                  <div style={{
                    position: 'absolute',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    border: '2px solid #000',
                  }}></div>
                  {/* Middle circle */}
                  <div style={{
                    position: 'absolute',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    border: '2px solid #000',
                  }}></div>
                  {/* Inner circle/dot */}
                  <div style={{
                    position: 'absolute',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#000',
                  }}></div>
                </div>
                {/* Text "Jiboni" */}
                <div style={{ 
                  fontWeight: 'bold', 
                  fontSize: '16px',
                  color: '#000'
                }}>Jeebon</div>
              </div>
              <div style={{ 
                width: '20px',
                height: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '4px 0'
              }}>
                <div style={{ height: '2px', background: '#333', width: '100%' }}></div>
                <div style={{ height: '2px', background: '#333', width: '100%' }}></div>
                <div style={{ height: '2px', background: '#333', width: '100%' }}></div>
              </div>
            </div>
            
            {/* App content */}
            <div style={{ flex: 1, padding: '15px', display: 'flex', flexDirection: 'column' }}>
              {/* Top row */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-around', 
                marginBottom: '30px',
                marginTop: '20px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    background: '#f0f0f0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 auto 8px'
                  }}>
                    <div style={{ color: '#6c5ce7', fontSize: '20px' }}>👤</div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6c5ce7' }}>Profile</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    background: '#f0f0f0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 auto 8px'
                  }}>
                    <div style={{ color: '#6c5ce7', fontSize: '20px' }}>💬</div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6c5ce7' }}>Comms</div>
                </div>
              </div>
              
              {/* Bottom row */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-around',
                marginBottom: '30px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    background: '#f0f0f0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 auto 8px'
                  }}>
                    <div style={{ color: '#6c5ce7', fontSize: '20px' }}>👥</div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6c5ce7' }}>Circles</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    background: '#f0f0f0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0 auto 8px'
                  }}>
                    <div style={{ color: '#6c5ce7', fontSize: '20px' }}>🌳</div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#6c5ce7' }}>Trees</div>
                </div>
              </div>
            </div>
            
            {/* Bottom navigation */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-around',
              padding: '10px 0',
              borderTop: '1px solid #eee',
              background: '#f9f9f9'
            }}>
              <div style={{ fontSize: '18px' }}>👤</div>
              <div style={{ fontSize: '18px' }}>💬</div>
              <div style={{ fontSize: '18px' }}>👥</div>
              <div style={{ fontSize: '18px' }}>🌳</div>
              <div style={{ fontSize: '18px' }}>⚙️</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HowItWorksSlide;
