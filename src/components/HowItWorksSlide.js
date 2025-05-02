import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedTitleWithUnderline from './AnimatedTitleWithUnderline';

function HowItWorksSlide({ registerSlideSteps, currentStep }) {
  // Register the total number of steps for this slide
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
    <div className="slide how-it-works-slide">
      <AnimatedTitleWithUnderline title="How It Works" />

      <div style={{ 
        display: 'flex', 
        width: '100%', 
        maxWidth: '1100px',
        margin: '0 auto',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        {/* Left side - Workflow steps */}
        <div className="workflow-container" style={{ 
          display: 'flex',
          flexDirection: 'column',
          width: '55%',
          padding: '0 1rem'
        }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: '1.1rem',
              lineHeight: '1.6',
              maxWidth: '100%',
              margin: '0 auto 1.5rem',
              textAlign: 'left',
              color: 'var(--jiboni-light)',
              letterSpacing: '0.02em',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '1rem 1.5rem'
            }}
          >
            We are developing <strong>proprietary productivity app to users</strong> to prompt the most needed information of their connections, memories and legacies through an intuitive AI interface.
          </motion.div>
          
          {workflowSteps.map((step, index) => (
            <motion.div
              key={index}
              className="workflow-step"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: step.delay
              }}
              style={{ 
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '0.9rem'
              }}
            >
              <motion.div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--jiboni-primary)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '1rem',
                  flexShrink: 0,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: 'white',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
                }}
              >
                {step.number}
              </motion.div>
              
              <div style={{ flex: 1 }}>
                <motion.div
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 'bold',
                    color: 'var(--jiboni-light)',
                    marginBottom: '0.2rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {step.title} 
                  <span style={{ marginLeft: '10px', fontSize: '1.3rem' }}>{step.icon}</span>
                </motion.div>
                
                <motion.div
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--jiboni-light)',
                    opacity: 0.8,
                    lineHeight: '1.3'
                  }}
                >
                  {step.description}
                </motion.div>
              </div>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            style={{
              marginBottom: '2rem', 
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '500',
              color: 'var(--jiboni-light)',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            User saves time on an optimized productivity stack.
          </motion.div>
        </div>

        {/* Right side - App interface mockup */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.8 }}
          style={{
            width: '40%',
            maxWidth: '320px',
            background: 'white',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
            color: '#333',
            height: '520px',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '1rem'
          }}
        >
          {/* App header */}
          <div style={{ 
            padding: '12px 15px', 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #eee'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: '28px', 
                height: '28px', 
                borderRadius: '50%', 
                background: '#333',
                marginRight: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>J</div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Jeeboni</div>
            </div>
            <div style={{ 
              width: '25px', 
              height: '25px', 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '5px 0'
            }}>
              <div style={{ height: '2px', background: '#333', width: '100%' }}></div>
              <div style={{ height: '2px', background: '#333', width: '100%' }}></div>
              <div style={{ height: '2px', background: '#333', width: '100%' }}></div>
            </div>
          </div>

          {/* App content - Grid of features */}
          <div style={{ 
            padding: '20px', 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
              marginBottom: '20px'
            }}>
              {/* Profile */}
              <div style={{ 
                border: '1px solid #eee', 
                borderRadius: '10px',
                padding: '25px 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ 
                  color: '#673ab7',
                  fontSize: '24px',
                  marginBottom: '10px'
                }}>👤</div>
                <div style={{ 
                  color: '#673ab7', 
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>Profile</div>
              </div>

              {/* Comms */}
              <div style={{ 
                border: '1px solid #eee', 
                borderRadius: '10px',
                padding: '25px 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ 
                  color: '#673ab7',
                  fontSize: '24px',
                  marginBottom: '10px'
                }}>💬</div>
                <div style={{ 
                  color: '#673ab7', 
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>Comms</div>
              </div>

              {/* Circles */}
              <div style={{ 
                border: '1px solid #eee', 
                borderRadius: '10px',
                padding: '25px 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ 
                  color: '#673ab7',
                  fontSize: '24px',
                  marginBottom: '10px'
                }}>👥</div>
                <div style={{ 
                  color: '#673ab7', 
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>Circles</div>
              </div>

              {/* Trees */}
              <div style={{ 
                border: '1px solid #eee', 
                borderRadius: '10px',
                padding: '25px 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ 
                  color: '#673ab7',
                  fontSize: '24px',
                  marginBottom: '10px'
                }}>🌳</div>
                <div style={{ 
                  color: '#673ab7', 
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}>Trees</div>
              </div>
            </div>
          </div>

          {/* App footer navigation */}
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-around',
            padding: '10px 0',
            borderTop: '1px solid #eee',
            background: '#f9f9f9'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '18px', marginBottom: '3px', color: '#673ab7' }}>👤</div>
              <div style={{ fontSize: '11px', color: '#673ab7' }}>Profile</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '18px', marginBottom: '3px', color: '#673ab7' }}>💬</div>
              <div style={{ fontSize: '11px', color: '#673ab7' }}>Comms</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '18px', marginBottom: '3px', color: '#673ab7' }}>👥</div>
              <div style={{ fontSize: '11px', color: '#673ab7' }}>Circles</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '18px', marginBottom: '3px', color: '#673ab7' }}>🌳</div>
              <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#673ab7' }}>Trees</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '18px', marginBottom: '3px', color: '#999' }}>⚙️</div>
              <div style={{ fontSize: '11px', color: '#999' }}>Settings</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HowItWorksSlide;
