import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ProblemSlide() {
  const [currentStep, setCurrentStep] = useState(1); // Start with heading visible
  
  // Define the key problems with titles, descriptions, and icons
  const problemItems = [
    {
      title: "Digital Disconnect",
      description: "Most of today's digital apps are moving us to a superficial world disconnecting us more and more from the real world.",
      icon: "🔌"
    },
    {
      title: "Passive Consumption",
      description: "Algorithmic timelines designed to maximize engagement time can trap us into passive consumption, losing valuable time and reduced protuctivity.",
      icon: "📱"
    },
    {
      title: "Fragmented Histories",
      description: "Personal memories, family narratives, group histories, and even important communications are easily lost, scattered across platforms, leading to a fading of personal and collective memory.",
      icon: "🧩"
    },
    {
      title: "Difficult Group Management",
      description: "Organizing communications within distinct groups (family, friends, work teams, hobby clubs, community etc) is cumbersome leading to losing important real world connections forever.",
      icon: "👥"
    }
  ];

  // Set up keyboard handler to advance steps
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Space or right arrow key advances the slide
      if (e.code === 'Space' || e.code === 'ArrowRight') {
        if (currentStep < problemItems.length + 1) {
          setCurrentStep(currentStep + 1);
          e.preventDefault(); // Prevent default scrolling behavior
        } else {
          // Move to next slide when all elements are revealed
          const nextButton = document.querySelector('.navigation button:last-of-type');
          if (nextButton) {
            nextButton.click();
            e.preventDefault();
          }
        }
      }
      
      // Left arrow key goes back a step
      if (e.code === 'ArrowLeft') {
        if (currentStep > 1) {
          setCurrentStep(currentStep - 1);
          e.preventDefault();
        } else {
          // Move to previous slide when at first step
          const prevButton = document.querySelector('.navigation button:first-of-type');
          if (prevButton) {
            prevButton.click();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentStep, problemItems.length]);

  return (
    <div className="slide problem-slide">
      <AnimatePresence>
        {currentStep >= 1 && (
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ marginBottom: '2rem' }}
          >
            The Problem
          </motion.h2>
        )}
      </AnimatePresence>

      <div
        className="problems-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        {problemItems.map((item, index) => (
          <AnimatePresence key={index}>
            {currentStep >= index + 2 && (
              <motion.div
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
                    backgroundColor: 'rgba(255, 126, 95, 0.2)',
                    borderRadius: '50%'
                  }}>
                    {item.icon}
                  </div>
                  <h3 style={{ 
                    color: 'var(--jiboni-accent)',
                    fontSize: '1.4rem'
                  }}>
                    {item.title}
                  </h3>
                </div>
                <p style={{ 
                  fontSize: '1.1rem',
                  lineHeight: '1.5',
                  flex: 1
                }}>
                  {item.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </div>
  );
}

export default ProblemSlide;
