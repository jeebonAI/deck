import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedTitleWithUnderline from './AnimatedTitleWithUnderline';
import SmallLogo from './SmallLogo';

function ContactSlide({ registerSlideSteps, currentStep, totalSlides, showSlideNumber, businessName }) {
  // Calculate slide number (Contact is slide 13 in the deck)
  const slideNumber = 13;
  const slideNumberText = `${slideNumber}/${totalSlides}`;

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

  // Inside the ContactSlide component, ensure all animations have shorter delays in PDF mode
  useEffect(() => {
    // Check if we're in PDF mode
    const isPdfMode = document.body.classList.contains('pdf-mode');
    
    // If in PDF mode, force all animations to complete immediately
    if (isPdfMode) {
      // Find all motion divs and force them to their final state
      const motionDivs = document.querySelectorAll('motion.div');
      motionDivs.forEach(div => {
        if (div.style) {
          div.style.opacity = '1';
          div.style.transform = 'none';
        }
      });
    }
  }, []);

  const contactInfo = [
    {
      icon: "✉",
      value: "contact@jeebon.ai",
      delay: 2.5
    },
    {
      icon: "📱",
      value: "+44 (747) 6911-731",
      delay: 3.5
    },
    {
      icon: "🌐",
      value: "www.jeebon.ai",
      delay: 4.5
    }
  ];

  const socialPlatforms = ['LinkedIn', 'Twitter', 'Instagram'];

  return (
    <div className="slide contact-slide" style={{ position: 'relative' }}>
      {/* Small logo in top right */}
      <SmallLogo businessName={businessName} />
      
      {/* Slide number indicator - only show if showSlideNumber is true */}
      {showSlideNumber && (
        <div className="slide-number">
          {slideNumberText}
        </div>
      )}
      
      <div className="gradient-background" style={{ opacity: 0.15 }} />
      
      {/* Add AnimatedTitleWithUnderline at the top left */}
      <AnimatedTitleWithUnderline title="Contact" />
      
      <div className="content" style={{ 
        textAlign: 'center', 
        zIndex: 1,
        marginTop: '1rem' // Add some margin to separate from title
      }}>
        <motion.h3
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 1.0
          }}
          style={{ color: 'var(--jeebon-light)', marginBottom: '2rem' }}
        >
          Build the future of meaningful connection, together.
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 1.5
          }}
          style={{ marginTop: '2rem' }}
        >
          <h3 style={{ color: 'var(--jeebon-light)', marginBottom: '1rem' }}>Nayeem Syed</h3>

          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: info.delay
              }}
              style={{ marginBottom: '0.8rem' }}
            >
              <span style={{
                display: 'inline-block',
                marginRight: '10px',
                color: 'var(--jeebon-secondary)'
              }}>{info.icon}</span>
              {info.value}
            </motion.div>
          ))}
        </motion.div>

        <div
          style={{
            marginTop: '3rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '20px'
          }}
        >
          {socialPlatforms.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 5.5 + (index * 0.5)
              }}
              whileHover={{ y: -5, scale: 1.05 }}
              style={{
                padding: '0.5rem 1rem',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                fontSize: '0.9rem',
                cursor: 'pointer'
              }}
            >
              {platform}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactSlide;
