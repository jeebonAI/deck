import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function SolutionSlide() {
  const [currentStep, setCurrentStep] = useState(1); // Start with heading visible
  
  const solutions = [
    {
      title: "Communicate",
      description: "Seamless and secure communication mediums.",
      icon: "💬"
    },
    {
      title: "Connect (Circles)",
      description: "Control over privacy and communication flow",
      icon: "⭕"
    },
    {
      title: "Cherish (Trees)",
      description: "Preserving family legacy through collaborative trees",
      icon: "🌳"
    },
    {
      title: "Curate (Memory & AI)",
      description: "Capture important moments with AI-enabled storage/retrieval that enhances real connections",
      icon: "🧠"
    }
  ];

  // Set up keyboard handler to advance steps
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Space or right arrow key advances the slide
      if (e.code === 'Space' || e.code === 'ArrowRight') {
        if (currentStep < solutions.length + 2) {
          setCurrentStep(currentStep + 1);
          e.preventDefault(); // Prevent default scrolling behavior
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentStep, solutions.length]);

  return (
    <div className="slide solution-slide">
      <AnimatePresence>
        {currentStep >= 1 && (
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '2rem' }}
          >
            Our Solution: Jiboni
          </motion.h2>
        )}
      </AnimatePresence>

      <div
        className="solutions-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        {solutions.map((solution, index) => (
          <AnimatePresence key={index}>
            {currentStep >= index + 2 && (
              <motion.div
                className="solution-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut"
                }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div style={{ 
                    fontSize: '2rem', 
                    marginRight: '1rem',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(69, 104, 220, 0.2)',
                    borderRadius: '50%'
                  }}>
                    {solution.icon}
                  </div>
                  <h3 style={{ 
                    color: 'var(--jiboni-accent)',
                    fontSize: '1.4rem'
                  }}>
                    {solution.title}
                  </h3>
                </div>
                <p style={{ 
                  fontSize: '1.1rem',
                  lineHeight: '1.5',
                  flex: 1
                }}>
                  {solution.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      <AnimatePresence>
        {currentStep >= solutions.length + 2 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              marginTop: '2rem',
              padding: '1rem 2rem',
              background: 'rgba(69, 104, 220, 0.15)',
              borderRadius: '12px',
              textAlign: 'center',
              maxWidth: '80%',
              alignSelf: 'center',
              margin: '2rem auto 0'
            }}
          >
            <p style={{ fontWeight: 'bold' }}>
              A unified platform that enhances real-world connections, not passive scrolling
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SolutionSlide;
